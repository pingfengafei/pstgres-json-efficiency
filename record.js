const fs = require('fs');

const record = (log)=> {
  fs.appendFile('./log', log + '\n', (err)=> {
    if (err) throw err;
  })
}

const newline = () => record('\n')

module.exports = record;
module.exports.newline = newline;
