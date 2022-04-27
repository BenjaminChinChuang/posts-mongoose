const {successHandle, errorHandle} = require('../../handler/index')
const Post = require('../../models/post')

const DELETE = requestUrl => requestUrl.split('/').filter(e => e).length === 1

// DELETE
const deleteRooms = async (req, res) => {
  const splitUrl = req.url.split('/').splice(2)
  const ID = splitUrl[0]
  const isRouteError = splitUrl.length > 1

  try {
    if (isDeleteAll(req.url)) {
      // delete all
      await Post.deleteMany({})
      successHandle(res, {data: []})
    } else {
      // delete one
      if (isRouteError) {
        // catch '/post/as123as4/XXXX' or ''/post//XXXX''
        errorHandle(res, {data: `DELETE route error.`}, 404)
      }

      if (ID) {
        const posts = await Post.findByIdAndDelete(ID)
        if (posts) {
          successHandle(res, {data: `${ID} is deleted successfully.`})
        } else {
          // ID.length === 24 & not exsit in DB
          errorHandle(res, {data: `ID: '${ID}' is not exsit.`})
        }
      }
    }
  } catch (error) {
    // other error (// ID.length !== 24)
    errorHandle(res, {data: `ID: '${ID}' is not exsit.`})
  }
}
module.exports = DELETE
