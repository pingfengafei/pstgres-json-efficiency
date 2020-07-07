const { Client } = require('pg')
const timer = require('./timer')
const record = require('./record')
const clientConfig = require('./clientConfig')

const client = new Client(clientConfig)

client.connect()

const run = async () => {
  await client.query('TRUNCATE test_json')
  client.end()
}

run();

