require('dotenv').config()
const Likes = require('../models/Likes');
const Post = require('../models/Post');
const User = require('../models/User');

class PostController {
    async create(req, res) {
        try {
            // let url = ''
            // if (req.file === undefined) {
            //     url = ''
            // } else {
            //     url = `/uploads/${req.file.originalname}`
            // }

            const like = await Likes.create({"likes": 0})
            const file = {
                ...req.body,
                // imageUrl: url, 
                user: req.user.id,
                // likes: like
            }

            const ifPost = await Post.findOne({ title: req.body.title })

            if (ifPost) {
                return res.status(404).json({ message: 'article already exist!' })
            }
            const post = await Post.create(file)

            const postId = await Post.findOne({ title: req.body.title })
            console.log(like);

            await User.findOneAndUpdate({ _id: req.user.id }, 
                { 
                    $push: { "posts": postId._id,} 
                })
            ////need to OPTIMIZED ??

            return res.json({ post })

        } catch (error) {
            res.json({ message: 'Что-то пошло не так.' })
        }
    }

    async delete(req, res) {
        try {
            console.log('req.user');
            // const post = await Post.findOneAndDelete({ _id: req.params.id })
            const userId = req.user.id
            const postId = req.params.id
            const post = await Post.findById({ _id: postId})
            console.log(req.user.id === post.user.toString());

            if(userId === post.user.toString()) {
                await Post.findOneAndDelete({ _id: postId})
                await User.findOneAndUpdate({_id:userId}, { $pull: { "posts": postId } })
            }else {
                return res.json('cannot delete post, you are not owner')
            }

            // if (!post) {
            //     return res.status(404).json({ message: 'article not found' })
            // }

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

            const user = await User.findById(post.user, "firstName surName avatarUrl").exec()
            // console.log(user);
            if (!post) {
                return res.status(404).json({ message: 'article not found' })
            }

            post.user = user

            res.json({ post })
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(req, res) {
        try {
            console.log(req.query);
            const {sort} = req.query
            let postsArray
            switch (sort) {
                case 'date':
                    postsArray = await Post.find().sort({timestamps:1}).lean()
                    break
                case 'comments':
                    postsArray = await Post.find().sort({comments:-1}).lean()
                    break
                case 'likes':
                    postsArray = await Post.find().sort({likes:-1}).lean()
                    break
                default:
                    postsArray = await Post.find().lean()
            }  
            // const postsArray = await Post.find().lean()
            const postsLength = await Post.countDocuments()

            const users = await Promise.all(
                postsArray.map((el) => {
                    return User.findById(el.user, "firstName surName avatarUrl").exec()
                }),
            )
            let posts = postsArray.map(post => ({...post, user: users.find(el => post.user.toString() === el._id.toString())}))

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


            let name = {"user": userId}

            console.log(req.body);
            switch(likeStatus) {
                case 1 :
                    like = await Likes.findOneAndUpdate(name, {
                        $inc: { likes: 1 },
                        $push: {"user": userId}
                    })
                    post = await Post.findByIdAndUpdate({_id: postId}, {
                        $push: {"likes": like},
                    })
                    break
                case -1 :
                    like = await Likes.findOneAndUpdate(name, {
                        $inc: { likes: -1 },
                        $push: {"user": userId}
                    })
                    post = await Post.findByIdAndUpdate({_id: postId}, {
                        $push: {"likes": like},
                    })
                    break
                case 0:
                    like = await Likes.findOneAndUpdate(name, {
                        $inc: { likes: -1 },
                        $pull: {"user": userId}
                    })
                    post = await Post.findByIdAndUpdate({_id: postId}, {
                        $pull: {"likes": like},
                    })
                    break
            }

            console.log(like, post);
            res.json({ like, post })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PostController()