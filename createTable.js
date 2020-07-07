const { Client } = require('pg')
const clientConfig = require('./clientConfig')

const client = new Client(clientConfig)
client.connect()
const createTableSql = `
  CREATE TABLE test_json(
    id SERIAL PRIMARY KEY,
    uuid character,
    data json,
    data_meta character
  )
`
client.query(createTableSql, async (err, res) => {
  if(err) throw err;
  console.log('create table success');
  client.end();
})
