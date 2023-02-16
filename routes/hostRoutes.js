const express = require('express')
const router = express.Router()
const hostController = require('../controllers/hostController.js')
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
//הכל

router.route('/')
    .get(hostController.getHostsByUserId)
    .post(hostController.addNewHost)
router.route('/:id')
    .delete(hostController.deleteHost)
    .get(hostController.getHostById)
module.exports = router