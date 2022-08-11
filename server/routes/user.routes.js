const Router = require('express')
const router = new Router()
const {RegisterValidation, mistakes} = require('../validations');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { upload } = require('../utils/multe');



router.post('/registration', RegisterValidation, mistakes, UserController.registration);
router.get('/all', UserController.getUsers)

router.post('/login', UserController.login)
router.post('/auth',authMiddleware, UserController.authentication)
router.post('/upload_avatar', authMiddleware, upload.single('image'),UserController.uploadAvatar);

// router.get('/all', roleMiddleware(['ADMIN']), UserController.getUsers)

router.put('/update', authMiddleware,  UserController.update);

module.exports = router