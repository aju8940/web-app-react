// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
const { protect } = require('../Middleware/authMiddleware')
const uploadProfilePic = require('../Middleware/multer')

router.get('/', protect, userController.getUser);


router.route('/login')
    .post(userController.postLogin)

router.route('/signup')
    .post(userController.postSignup)

router.put('/edit-user/:id', userController.editUser)

router.post('/upload-image/:id',uploadProfilePic,userController.uploadImage)


module.exports = router;
