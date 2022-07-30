const mongoose = require('mongoose');


const LikesSchema = new mongoose.Schema({
  // likes: { type: Number, default: 0 },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
})

module.exports = mongoose.model('Likes', LikesSchema)
