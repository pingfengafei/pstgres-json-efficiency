const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const pool = []

for (let i = 0; i < 1000; i++) {
  const shouldWrapperLine = ((i % 10) === 0)
  pool.push('\'' + uuidv4().substring(0, 8) + '\'' + (shouldWrapperLine ? '\n' : ''))
}

const pool_to_arr = `const pool = [${pool.join(', ')}]; \n module.exports = pool;`

fs.writeFile('./idPool.js', pool_to_arr, () => {
  console.log('write 1000 ids')
})
