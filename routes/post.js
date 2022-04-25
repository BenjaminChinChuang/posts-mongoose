const routeWrapper = require('./common/routeWrapper')
const $posts = require('../apis/posts/index')

const routhPath = 'post'
const roomsRoute = async (req, res) => {
  let body = ''
  req.on('data', dataChunks => {
    body += dataChunks
  })

  const METHOD = req.method
  switch (METHOD) {
    case 'GET':
      $posts.GET(res)
      break
    case 'POST':
      req.on('end', () => {
        $posts.POST(req, res, body)
      })
      break
    case 'DELETE':
      $posts.DELETE(req, res)
      break
    case 'PATCH':
      req.on('end', () => {
        $posts.PATCH(req, res, body)
      })
      break
    case 'OPTIONS':
      $posts.OPTIONS(res)
      break
    default:
      break
  }
}

module.exports = routeWrapper(routhPath, roomsRoute)
