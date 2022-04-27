const {successHandle, errorHandle} = require('../../handler/index')
const errorMsgHandler = require('../../utils/errorMsgHandler')
const Post = require('../../models/post')

// PATCH (modified part of data)
const PATCH = async (req, res, body) => {
  const splitUrl = req.url.split('/').splice(2)
  const ID = splitUrl[0]
  const isRouteError = splitUrl.length > 1

  try {
    if (isRouteError) {
      // catch '/posts/as123as4/XXXX' or ''/posts//XXXX''
      errorHandle(res, {data: `PATCH route error.`}, 404)
    }

    if (ID) {
      const data = await JSON.parse(body)
      const posts = await Post.findByIdAndUpdate(
        ID,
        {...data},
        {
          returnDocument: 'after',
        }
      )
      if (posts) {
        successHandle(res, {data: posts})
      } else {
        // ID.length === 24 & not exsit in DB
        errorHandle(res, {data: `ID: '${ID}' is not exsit.`})
      }
    }
  } catch (error) {
    if (error?.errors) {
      // catch update error
      errorHandle(res, {data: errorMsgHandler(error)})
    } else {
      // other error (// ID.length !== 24)
      errorHandle(res, {data: `ID: '${ID}' is not exsit.`})
    }
  }
}
module.exports = PATCH
