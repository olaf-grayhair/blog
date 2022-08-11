require('dotenv').config()
const Likes = require('../models/Likes');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs')

class PostController {
    async create(req, res) {
        try {
            const file = {
                ...req.body,
                tags: req.body.tags.split(','),
                user: req.user.id,
            }
            console.log(file)

            const ifPost = await Post.findOne({ title: req.body.title })

            if (ifPost) {
                return res.status(404).json({ message: 'Post with this title already exist!' })
            }
            const post = await Post.create(file)
            
            const postId = await Post.findOne({ title: req.body.title }).populate('user', 'firstName avatarUrl surName').exec();
            console.log(post, '|||', postId);
            
            await User.findOneAndUpdate({ _id: req.user.id },
                {
                    $push: { "posts": postId._id, }
                })

            return res.json({ post: postId })

        } catch (error) {
            console.log(error);
            res.json({ message: 'Что-то пошло не так.' })
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id
            const postId = req.params.id
            const post = await Post.findById({ _id: postId })
            console.log(req.user.id === post.user.toString());
            if (post.imageUrl) {
                const path = post.imageUrl.split('http://localhost:5000/').pop()
                fs.unlinkSync(path)
                ///${process.env.SERVER_URL} REPAIR
            }

            if (userId === post.user.toString()) {
                await Post.findOneAndDelete({ _id: postId })
                await Comment.deleteMany({ post: postId })
                await Likes.deleteMany({ post: postId })
                await User.findOneAndUpdate({ _id: userId }, { $pull: { "posts": postId } })
            } else {
                return res.json('cannot delete post, you are not owner')
            }

            return res.json(post)
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const file = {
                ...req.body,
                tags: req.body.tags.split(','),
                user: req.user.id,
            }

            const post = await Post.findOneAndUpdate({ _id: req.params.id }, file)

            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }

            const updatePost = await Post.findById({ _id: req.params.id })

            res.json({ post: updatePost })
        } catch (error) {
            console.log(error);
        }
    }

    async findOne(req, res) {
        try {
            const post = await Post.findOne({ _id: req.params.id })
                .populate('user', 'firstName avatarUrl surName').populate({ path: 'comments', populate: { path: 'user', "select": 'firstName avatarUrl surName' } }).exec();

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
            const { sort } = req.query
            let posts
            switch (sort) {
                case 'date':
                    posts = await Post.find().populate('user').sort({ timestamps: -1 }).exec()
                    break
                case 'comments':
                    posts = await Post.find().populate('user').sort({ comments: 1 }).exec()
                    break
                case 'likes':
                    posts = await Post.find().populate('user').sort({ likes: 1 }).exec()
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
            
            console.log(req.body.id, 'post');
            if(req.body.id === '') {
                res.json(url)
            }

            const post = await Post.findById({_id: req.body.id })

            if(post.imageUrl !== '') {
                let img = post.imageUrl.split('http://localhost:5000/')[1]
                try {
                    fs.unlinkSync(img)
                    console.log("Successfully deleted the file.")
                  } catch(err) {
                      console.log(err);
                    await Post.findOneAndUpdate({_id: req.body.id}, {imageUrl: ""})
                    throw err
                  }
            }
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
            let posts = await Post.find().populate('user', 'firstName avatarUrl surName').exec();

            posts = posts.filter(post => post.title.toLowerCase().includes(searchName))
            const postsLength = posts.length

            return res.json({ posts, postsLength })

        } catch (e) {
            return res.status(400).json({ message: 'search error' })
        }
    }

    async seacrchByTags(req, res) {
        try {
            const key = Object.keys(req.query).toString()
            const value = Object.values(req.query).toString()

            let posts
            if(key === 'tags') {
                posts = await Post.find(
                    { tags: value }).populate('user', 'firstName avatarUrl surName').exec();
            }
            if(key === 'title'){
                posts = await Post.find(
                    { "title": {$regex : value, "$options" : "i"} }).populate('user', 'firstName avatarUrl surName').exec();
            }

            const postsLength = posts.length
            return res.json({ posts, postsLength })

        } catch (e) {
            return res.status(400).json({ message: 'search error' })
        }
    }

    async userPost(req, res) {
        try {
            const userId = req.user.id
            const posts = await Post.find({ user: userId })
                .populate('user', 'firstName avatarUrl surName').populate({ path: 'comments', populate: { path: 'user', "select": 'firstName avatarUrl surName' } }).exec();

            if (!posts) {
                return res.status(404).json({ message: 'You does nor have posts' })
            }
            const postsLength = posts.length

            return res.json({ posts, postsLength })
        } catch (error) {
            console.log(error);
        }
    }

    async userSavedPost(req, res) {
        try {
            const user = await User.findOne({_id:
                req.user.id})

            const posts = await Post.find({ _id:user. readingList }).populate('user', 'firstName avatarUrl surName').populate({ path: 'comments', populate: { path: 'user', "select": 'firstName avatarUrl surName' } }).exec();

            if (!posts) {
                return res.status(404).json({ message: 'Your reading list is clear' })
            }
            const postsLength = posts.length

            return res.json({ posts, postsLength })
        } catch (error) {
            console.log(error);
        }
    }

    async likesAndDislikes(req, res) {
        try {
            let userId = req.user.id
            let postId = req.params.id
            const likeItem = await Likes.findOne({ "post": postId, "user": userId })

            if (!likeItem) {
                let likeDoc = new Likes({ "post": postId, "user": userId })
                let likeData = await likeDoc.save()

                await Post.findByIdAndUpdate({ _id: postId }, {
                    $push: { "likes": likeData._id },
                })
                return res.status(200).send({ category: 'like', result: 'create' })
            } else {
                await Likes.deleteOne({ _id: likeItem._id })
                await Post.findByIdAndUpdate({ _id: postId }, {
                    $pull: { "likes": likeItem._id },
                })
                return res.status(200).send({ category: 'like', result: 'remove' })
            }

        } catch (error) {
            console.log(error);
        }
    }

    async savePost(req, res) {
        try {
            let userId = req.user.id
            let postId = req.params.id
            const postList = await User.find({_id: userId, readingList: postId})

            // console.log(postList, 'postList');

            if(postList.length !== 0) {
                await User.findByIdAndUpdate({_id: userId}, {
                    $pull: { "readingList": postId },
                })

                const user =  await User.findById({_id: userId})
                console.log(user.readingList, 'if');
                return res.status(200).send({ category: 'readingList', result: 'remove', readingList: user.readingList})
            }else{
                await User.findByIdAndUpdate({_id: userId}, {
                    $push: { "readingList": postId },
                })
                
                const user =  await User.findById({_id: userId})
                console.log(user.readingList, 'else');
                return res.status(200).send({ category: 'readingList', result: 'save', readingList: user.readingList })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PostController()