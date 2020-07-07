const { Client } = require('pg')
const timer = require('./timer')
const record = require('./record')
const clientConfig = require('./clientConfig')

const client = new Client(clientConfig)

client.connect()

// type: one of ['raw', 'json']
const query = async (sql, type) => {
  try {
    timer.start()
    await client.query(sql)
    const usedTime = timer.use()
    const countQuery = await client.query('SELECT COUNT(id) FROM test_json')
    const count = countQuery.rows[0].count

   record(`[query]---> total ${count} rows, type ${type} use ${usedTime}ms, query by ${sql}`)
  } catch (err) {
    if (err) throw err
  }
}

const run = async () => {
  for (let i = 0; i < 10; i++) {
    await query(`SELECT * FROM test_json WHERE data_meta = 'c836c4c3';`, 'raw')
    await query(`SELECT * FROM test_json WHERE data #>>'{candidates,users,0,oxygenId}' = 'c836c4c3'`, 'json')
    await query(`SELECT * FROM test_json WHERE data::text SIMILAR TO '%(c836c4c3)%'`, 'json_to_string')
  }
  client.end()
}

run();

