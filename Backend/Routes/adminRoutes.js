const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController')

router.get('/home',adminController.adminHome)
router.post('/login',adminController.postLogin)

router.delete('/delete-user/:id',adminController.deleteUser)
router.put('/edit-user/:id',adminController.editUser)

module.exports = router