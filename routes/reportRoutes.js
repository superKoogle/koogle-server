const express = require('express')
const router = express.Router()
const reportController = require('../controllers/reportController')
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
//הכל

router.route('/')
    .get(reportController.getAllReports)
    .post(reportController.createNewReport)
    .delete(reportController.deleteReport)

module.exports = router