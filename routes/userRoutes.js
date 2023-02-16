const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/')
    .get(userController.SignIn)
    .post(userController.SignUp)
    .put(userController.updateUserById)

module.exports = router