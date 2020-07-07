const { Client } = require('pg')
const uuid = require('uuid')
const idPool = require('./idPool')
const timer = require('./timer')
const record = require('./record');
const clientConfig = require('./clientConfig');

const client = new Client(clientConfig)

client.connect()

const getRandomId = () => idPool[Math.floor(Math.random() * 1000)]

const insertSql = `
  CREATE TABLE test_json(
    id SERIAL PRIMARY KEY,
    uuid character,
    data jsonb,
    data_meta character
  )
`
const getData = () => {
  const data = {
    candidates: {
      users: [{ oxygenId: getRandomId() }, { oxygenId: getRandomId() }, { oxygenId: getRandomId() }]
    }
  }

  // Only save the first oxygenId as metaData for compare sql efficiency by json
  const metaData = data.candidates.users[0].oxygenId

  return {
    data,
    metaData
  }
}

const genInsertSql = (rowCount) => {
  const values = Array.from({ length: rowCount }).map((index) => {
    const { data, metaData } = getData()
    return `('${uuid.v4()}', '${JSON.stringify(data)}', '${metaData}')`
  })

  return `
    INSERT INTO test_json(uuid, data, data_meta) VALUES
    ${values.join(',')};
  `
}

const insert = async (count) => {
  try {
    timer.start()
    let sql = genInsertSql(count)
  await client.query(sql)
    record(`[insert]---> ${count} rows, use ${timer.use()}ms`)
  } catch (err) {
    if (err) throw err
  }
  client.end()
}

insert(1000000)
