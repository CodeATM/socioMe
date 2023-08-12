const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentBody: {
        type: String,
        required: true,
    },
    likes: {
        types: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)