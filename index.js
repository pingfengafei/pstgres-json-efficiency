const { Client } = require('pg')

const clientConfig = {
  host: '127.0.0.1',
  port: 5432,
  user: 'luof',
  password: '123456'
}

const client = new Client(clientConfig)

client.connect()

client.query('SELECT NOW()', async (err, res) => {
  if(err) throw err;

  

})
