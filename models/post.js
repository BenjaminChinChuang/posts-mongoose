const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '[name] is required.'],
    },
    tags: {
      type: [String],
      required: true,
      validate: [value => value.length > 0, '[tags] is required.'],
    },
    type: {
      type: String,
      enum: ['group', 'person'],
      required: [true, '[type] is required.'],
    },
    image: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, '[content] is required.'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    collection: 'Posts',
    timestamps: true,
  }
)

module.exports = mongoose.model('Posts', PostSchema)
