const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

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

    async getPostComments(req, res) {
        try {
            const post = await Post.findById(req.params.id)
            // console.log(post.comments);
            const comments = await Promise.all(
                post.comments.map((comment) => {
                    return Comment.findById(comment)
                }),
            )

            const users = await Promise.all(
                comments.map((el) => {
                    return User.findById(el.user, "firstName surName avatarUrl").exec()
                }),
            )

            let arr1 = [...comments]
            let arr2 = [...users]

            let arr = arr1.map(comm => ({...comm, user: arr2.map(el => el)}))
            
            // const result = videos.map(v => ({ ...v, ...storeProducts.find(sp => sp.product_id === v.product_id) }));

            console.log(typeof(comments));
            res.json({comments, users})
            // res.json({comments, users})
        } catch (error) {
            res.json({ message: 'No comments' })
        }
    }
}

module.exports = new CommentController()