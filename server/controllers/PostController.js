require('dotenv').config()
const Likes = require('../models/Likes');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs')

class PostController {
    async create(req, res) {
        try {
            console.log(req.body.tags)
            const file = {
                ...req.body,
                user: req.user.id,
            }
            
            const ifPost = await Post.findOne({ title: req.body.title })
            
            if (ifPost) {
                return res.status(404).json({ message: 'Post with this title already exist!' })
            }
            // console.log(file);
            const post = await Post.create(file)
            console.log(post);

            const postId = await Post.findOne({ title: req.body.title })

            await User.findOneAndUpdate({ _id: req.user.id }, 
                { 
                    $push: { "posts": postId._id,} 
                })
            ////need to OPTIMIZED ??
            return res.json({ post })

        } catch (error) {
            console.log(error);
            res.json({ message: 'Что-то пошло не так.' })
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id
            const postId = req.params.id
            const post = await Post.findById({ _id: postId})
            console.log(req.user.id === post.user.toString());
            if(post.imageUrl) {
                const path = post.imageUrl.split('http://localhost:5000/').pop()
                fs.unlinkSync(path)
                ///${process.env.SERVER_URL} REPAIR
            }

            if(userId === post.user.toString()) {
                await Post.findOneAndDelete({ _id: postId})
                await Comment.deleteMany({ post: postId})
                await Likes.deleteMany({ post: postId})
                await User.findOneAndUpdate({_id:userId}, { $pull: { "posts": postId } })
            }else {
                return res.json('cannot delete post, you are not owner')
            }

            return res.json(post)
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
            .populate('user', 'firstName avatarUrl surName').populate({path: 'comments', populate: {path: 'user', "select": 'firstName avatarUrl surName'}}).exec();

            // console.log(post);
            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }
            res.json({ post })
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(req, res) {
        try {
            const {sort} = req.query
            let posts
            switch (sort) {
                case 'date':
                    posts = await Post.find().populate('user').sort({timestamps:-1}).exec()
                    break
                case 'comments':
                    posts = await Post.find().populate('user').sort({comments:1}).exec()
                    break
                case 'likes':
                    posts = await Post.find().populate('user').sort({likes:1}).exec()
                    break
                default:
                    posts = await Post.find().populate('user').exec()
            }  
            const postsLength = await Post.countDocuments()

            res.json({ posts, postsLength })
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось получить статьи',
            });
        }
    }

    async upload(req, res) {
        try {
            const url = `${process.env.SERVER_URL}uploads/${req.file.filename}`
            res.json(url)
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось загрузить изображение',
            });
        }
    }

    async seacrchPost(req, res) {
        try {
            const searchName = req.query.title
            let posts = await Post.find().populate('user').exec();

            posts = posts.filter(post => post.title.toLowerCase().includes(searchName))
            const postsLength = await Post.countDocuments()

            return res.json({posts, postsLength})

        } catch (e) {
            return res.status(400).json({message: 'search error'})
        }
    }

    async seacrchByTags(req, res) {
        try {
            const searchName = req.query.tags
            console.log(searchName);
            let posts = await Post.find().populate('user').exec();

            posts = posts.filter(post => post.tags.toLowerCase().includes(searchName))

            return res.json({posts})

        } catch (e) {
            return res.status(400).json({message: 'search error'})
        }
    }

    async userPost(req, res) {
        try {
            const userId = req.user.id
            const posts = await Post.find({ user: userId})
            .populate('user', 'firstName avatarUrl surName').populate({path: 'comments', populate: {path: 'user', "select": 'firstName avatarUrl surName'}}).exec();

            if (!posts) {
                return res.status(404).json({ message: 'You does nor have posts' })
            }
            const postsLength = posts.length

            return res.json({posts, postsLength})
        } catch (error) {
            console.log(error);
        }
    }

    async likesAndDislikes(req, res) {
        try {
            let userId = req.user.id
            let postId = req.params.id
            const likeItem = await Likes.findOne({"post": postId, "user": userId})

            if(!likeItem) {
                let likeDoc = new Likes({"post": postId, "user": userId})
                let likeData = await likeDoc.save()

                await Post.findByIdAndUpdate({_id: postId}, {
                    $push: {"likes": likeData._id},
                })
                return res.status(200).send({category: 'like', result: 'create'})
            }else{
                await Likes.deleteOne({_id: likeItem._id})
                await Post.findByIdAndUpdate({_id: postId}, {
                    $pull: {"likes": likeItem._id},
                })
                return res.status(200).send({category: 'like', result: 'remove'})
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PostController()