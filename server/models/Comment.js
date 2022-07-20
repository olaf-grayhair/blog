const { default: mongoose } = require("mongoose")


const CommentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    date: {type: Date,default: Date.now},
    post: {type: mongoose.Schema.Types.ObjectId,ref: 'Post'},
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
    })

module.exports = mongoose.model('Comment', CommentSchema)
