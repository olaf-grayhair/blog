require('dotenv').config()
const Post = require('../models/Post');
const User = require('../models/User');


class PostController {
    async create(req, res) {
        try {
            let url = ''
            if (req.file === undefined) {
                url = ''
            } else {
                url = `/uploads/${req.file.originalname}`
            }

            const file = {
                ...req.body,
                imageUrl: url, user: req.user.id
            }

            const ifPost = await Post.findOne({ title: req.body.title })

            if (ifPost) {
                return res.status(404).json({ message: 'article already exist!' })
            }

            const post = await Post.create(file)

            const postId = await Post.findOne({ title: req.body.title })
            console.log(postId._id);

            await User.findOneAndUpdate({ _id: req.user.id }, { $push: { "posts": postId._id } })
            ////need to OPTIMIZED ??

            return res.json({ post })

        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            const post = await Post.findOneAndDelete({ _id: req.params.id })
            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }

            return res.json('post deleted')

        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            // const findPost = await Post.findOne({_id:req.params.id})
            ///NEED URL FROM req.file !!!!
            const file = req.body
            console.log(req, 'UPDATAE');
            const post = await Post.findOneAndUpdate({ _id: req.params.id }, file)

            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }

            res.json({ post })
        } catch (error) {
            console.log(error);
        }
    }

    async findOne(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id })

            const user = await User.findOne({ _id: post.user})
            // console.log(user);
            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }

            res.json({ post, user })
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Post.find()
            const postsLength = await Post.countDocuments()

            const users = await Promise.all(
                posts.map((el) => {
                    return User.findById(el.user, "firstName surName avatarUrl").exec()
                }),
            )
            console.log(users);

            res.json({ posts, postsLength, users })
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось получить статьи',
            });
        }
    }

    // async getPostUser(req, res) {
    //     try {
    //         const post = await Post.findById(req.params.id)
    //         // console.log(post.comments);
    //         const list = await Promise.all(
    //             post.comments.map((user) => {
    //                 return User.findById(user)
    //             }),
    //         )

    //         res.json(list)
    //     } catch (error) {
    //         res.json({ message: 'No comments' })
    //     }
    // }
}

module.exports = new PostController()