const {successHandle, errorHandle} = require('../../handler/index')
const errorMsgHandler = require('../../utils/errorMsgHandler')
const Post = require('../../models/post')

// post error handler
const checkPostData = data => {
  const requiredColumns = ['name', 'tags', 'type', 'content']
  const errorMsg = {}

  requiredColumns.forEach(column => {
    const item = data[column]

    switch (column) {
      case 'name':
      case 'content':
        if (!item) {
          errorMsg[column] = `[${column}] is required.`
        }
        break
      case 'tags':
        if (!Array.isArray(item) || !item.length) {
          errorMsg[column] = `[${column}] is required.`
        } else {
          if (item.filter(i => i).length <= 0) {
            errorMsg[column] = `[${column}] should not be an empty array.`
          }
        }
        break
      case 'type':
        const types = ['group', 'person']
        if (!item) {
          errorMsg[column] = `[${column}] is required.`
        } else {
          if (!types.includes(item)) {
            errorMsg[
              column
            ] = `[${column}] should be either 'group' or 'person'.`
          }
        }
        break
      default:
        break
    }
  })

  if (Object.keys(errorMsg).length === 0) {
    return null
  } else {
    return errorMsg
  }
}

// POST
const POST = async (req, res, body) => {
  try {
    const data = await JSON.parse(body)
    const errorMsg = checkPostData(data)
    if (!errorMsg) {
      const newPost = await Post.create(data)
      successHandle(res, {data: newPost})
    } else {
      errorHandle(res, {data: errorMsg})
    }
  } catch (error) {
    if (!body) {
      errorHandle(res, {data: '[post] cannot be empty.'})
    } else {
      errorHandle(res, {data: errorMsgHandler(error)})
    }
  }
}
module.exports = POST
