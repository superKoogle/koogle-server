const express = require('express')
const router = express.Router()
const mapController = require('../controllers/maps.js')
const verifyJWT = require("../middleware/verifyJWT")
//router.use(verifyJWT)

router.route('/address')
    .post(mapController.placeAutocomplete)
router.route('/geocode')
    .post(mapController.geocodeAddress)
// router.route('/geocode')
//     .post(mapController.geocode)
module.exports = router