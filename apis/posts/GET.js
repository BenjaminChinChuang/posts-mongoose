const {successHandle, errorHandle} = require('../../handler/index')
const Post = require('../../models/post')

const GET = async res => {
  try {
    const posts = await Post.find()
    successHandle(res, {data: posts})
  } catch (error) {
    errorHandle(res, {data: error})
  }
}
module.exports = GET
