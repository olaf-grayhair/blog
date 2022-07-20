const Comment = require('../models/Comment');
const Post = require('../models/Post');

class CommentController {
    async create(req, res) {
        try {
            const file = {
                ...req.body,
                user: req.user.id,
                post: req.params.id
            }
            const comment = await Comment.create(file)

            const postId = await Comment.findOne({text:req.body.text})

            await Post.findOneAndUpdate({_id:req.params.id}, { $push: { "comments": postId._id } })

            return res.json(comment)
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            console.log(req.params.id);
            const comment = await Comment.findOneAndDelete({_id: req.params.id})
            if(!comment) {
                return res.status(404).json({message: 'comment not found'})
            }

            return res.json('comment was deleted')
            
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const file = req.body
            const comment = await Comment.findOneAndUpdate({_id:req.params.id}, file)

            if(!comment) {
                return res.status(404).json({message: 'comment not found'})
            }

            res.json({comment})
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CommentController()