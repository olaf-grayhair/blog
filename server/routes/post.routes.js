const Router = require('express')
const router = new Router()
const {RegisterValidation, mistakes} = require('../validations');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const PostController = require('../controllers/PostController');
const {upload} = require('../utils/multe');

const CommentController = require('../controllers/CommentController');



router.post('/add', authMiddleware, upload.single('image'),PostController.create);
router.get('/all_posts', PostController.getPosts);
router.get('/:id', PostController.findOne);
// router.get('/:id', PostController.getPostUser);

router.post('/:id/comment', authMiddleware, CommentController.create);
router.get('/comments/:id', CommentController.getPostComments);
router.post('/:id/comment/delete/:id', authMiddleware, CommentController.delete);

router.put('/:id', authMiddleware, upload.single('image'), PostController.update);
router.delete('/delete/:id', roleMiddleware(['ADMIN']), PostController.delete);

module.exports = router