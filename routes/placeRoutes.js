const express = require('express')
const router = express.Router()
const placeController = require('../controllers/placeController')
const verifyJWT = require("../middleware/verifyJWT")


router.route('/')
    .post(verifyJWT,placeController.addNewPlace)
    .get(placeController.getNearbyPlacesByType)
router.route('/general')
    .post(placeController.getNearbyPlaces)
router.route('/:id')
    .get(placeController.getPlaceById)
    .delete(verifyJWT,placeController.deletePlaceById)
    .put(verifyJWT,placeController.updatePlace)
    
module.exports = router