const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
//   userInfo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
// },
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [String],
    default: []
  }
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema)
