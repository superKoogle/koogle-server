const express = require('express')
const router = express.Router()
const userController = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT')


router.post('/SignUp', userController.SignUp)
router.post('/SignIn', userController.SignIn)

router.put('/', userController.updateUserById)

router.route('/:id')
    .put(verifyJWT, userController.changeUserPermission)

module.exports = router