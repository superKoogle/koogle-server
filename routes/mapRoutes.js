const express = require('express')
const router = express.Router()
const mapController = require('../controllers/maps.js')
const verifyJWT = require("../middleware/verifyJWT")
//router.use(verifyJWT)


router.route('/address')
    .post(mapController.placeAutocomplete)
router.route('/geocode')
    .post(mapController.geocodeAddress)
router.route('/direction')
    .post(mapController.direction)
router.route('/reverseGeocode')
    .post(mapController.reverseGeocode)
module.exports = router