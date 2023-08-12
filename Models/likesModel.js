const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
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
    likes: {
        types: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model('likes', likesSchema)