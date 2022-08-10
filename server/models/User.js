const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    surName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatarUrl: {type: String, default: ''},
    timestamps: {type: Date, default: Date.now()},
    roles: [{type: String, ref: 'Role'}],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
    readingList: {type: Array, default: []},
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
})

module.exports = mongoose.model('User', UserSchema)
// export default mongoose.model('User', UserSchema)