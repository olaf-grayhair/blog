const { default: mongoose } = require("mongoose")


const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
  //   tags: { 
  //     type: 'array',
  //     items: { type: 'string', uniqueItems: true }
  //  },
    tags: [{type: String, unique: false }],
  //   tags:{
  //     type:[String],
  //     required: true
  //  },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    imageUrl: {type: String, default: ''},
    timestamps: {type: Date, default: Date.now()},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Likes'
    }],
})

module.exports = mongoose.model('Post', PostSchema)
