const {successHandle, errorHandle} = require('../../handler/index')
const errorMsgHandler = require('../../utils/errorMsgHandler')
const Post = require('../../models/post')

// POST
const postRooms = async (req, res, body) => {
  try {
    const data = await JSON.parse(body)
    const newPost = await Post.create(data)

    successHandle(res, {data: newPost})
  } catch (error) {
    if (!body) {
      errorHandle(res, {data: '[post] cannot be empty.'})
    } else {
      errorHandle(res, {data: errorMsgHandler(error)})
    }
  }
}
module.exports = postRooms
