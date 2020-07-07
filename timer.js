let begin
let end

const start = () => begin = + new Date()

const use = () => {
  end = + new Date()
  return end - begin
}

module.exports = {
  start,
  use
}
