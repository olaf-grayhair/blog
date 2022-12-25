const Router = require('express')
const router = new Router()
const { RegisterValidation, mistakes, TextValidation } = require('../validations');
const authMiddleware = require('../middleware/authMiddleware');
const PostController = require('../controllers/PostController');
const { upload } = require('../utils/multe');

const CommentController = require('../controllers/CommentController');




router.get('/user_posts', authMiddleware, PostController.userPost);
router.get('/user_saved', authMiddleware, PostController.userSavedPost);
router.get('/all_posts', PostController.getPosts);
router.get('/search', PostController.seacrchByTags);
router.get('/:id', PostController.findOne);

router.post('/:id/likes', authMiddleware, PostController.likesAndDislikes);
router.post('/:id/readingList', authMiddleware, PostController.savePost);
router.post('/:id/comment', TextValidation, mistakes, authMiddleware, CommentController.create);
router.post('/add', authMiddleware, upload.single('image'), PostController.create);

router.post('/upload', authMiddleware, upload.single('image'),PostController.upload
);

router.put('/:id', authMiddleware, upload.single('image'), PostController.update);
router.delete('/:id/comment/delete/:id', authMiddleware, CommentController.delete);
router.delete('/delete/:id', authMiddleware, PostController.delete);

module.exports = router