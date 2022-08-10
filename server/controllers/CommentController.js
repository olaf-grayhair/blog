const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

class CommentController {
    async create(req, res) {
        try {
            console.log(req.body);
            const file = {
                ...req.body,
                user: req.user.id,
                post: req.params.id
            }
            const comment = await Comment.create(file)
            
            const postId = await Comment.findOne({text:req.body.text})

            comment.user = await User.findById(comment.user, "firstName surName avatarUrl")

            await Post.findOneAndUpdate({_id:req.params.id}, { $push: { "comments": postId._id } })

            await User.findOneAndUpdate({_id:req.user.id}, { $push: { "comments": postId._id } })

            return res.json(comment)
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id
            const comment = await Comment.findOne({_id: req.params.id})
            console.log(comment.user.toString(),  userId);
            if(comment.user.toString() === userId) {
                await Comment.findOneAndDelete({_id: comment})

                await Post.findOneAndUpdate({_id: comment.post}, { $pull: { "comments": comment._id } })

                await User.findOneAndUpdate({_id: req.user.id}, { $pull: { "comments": comment._id } })

                // return res.json(comment)
            }else {
                return res.json('cannot delete comment, you are not owner')
            }
            // if(!comment) {
            //     return res.status(404).json({message: 'comment not found'})
            // }
            return res.json(comment)
            // return res.json('comment was deleted')
            
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