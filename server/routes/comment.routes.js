const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const CommentController = require('../controllers/CommentController');




// router.post('/add', authMiddleware, CommentController.create);
router.post('/post/:id/comment', authMiddleware, CommentController.create);

router.delete('/delete/:id', authMiddleware, CommentController.delete);

module.exports = router