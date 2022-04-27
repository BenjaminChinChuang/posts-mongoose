const getHeader = require('../../utils/getHeader')

const OPTIONS = res => {
  res.writeHead(200, getHeader())
  res.end()
}

module.exports = OPTIONS
