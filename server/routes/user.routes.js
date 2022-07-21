const Router = require('express')
const router = new Router()
const {RegisterValidation, mistakes} = require('../validations');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { upload } = require('../utils/multe');



router.post('/registration', RegisterValidation, mistakes, UserController.registration);

router.post('/login', UserController.login)
router.post('/auth',authMiddleware, UserController.authentication)
router.get('/all', UserController.getUsers)
// router.get('/all', roleMiddleware(['ADMIN']), UserController.getUsers)

router.post('/upload', authMiddleware, upload.single('image'), UserController.avatar);

module.exports = router