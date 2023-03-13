const maps = require('./maps')
const db = require('../model/index')
const Place = db.place
const synagogue = require('./synagogueController')
const habad = require('./habadController')
const supermarket = require('./supermarketController')
const restaurant = require('./restaurantController')
const place = require('../model/place')

//api/places/routes/placeRoutes/addNewPlace

const addNewPlace = async (req, res) => {
    const { place_name, place_address, place_hours, place_img, place_type } = req.body
    const place_info_by = req.user.user_id
    if (!place_address || !place_type) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const coords = await maps.geocode(place_address);
    const lat = coords.lat;
    const lng = coords.lng;
    const place = await Place.create({ place_name, place_address, place_lat: lat, place_lng: lng, place_hours, place_img, place_info_by, place_type })
    if (!place) {
        return res.status(400).json({ message: 'Invalid place data received' })
    }
    const add = place_type == 1 ? synagogue.addSynagogue :
                place_type == 2 ? habad.addHabad :
                place_type == 3 ? supermarket.addSupermarket :
                place_type == 4 ? restaurant.addRestaurant : null;
    const result = await add(place.dataValues.place_id, req.body)
    if (result != null) {
        return res.status(201).json({ message: 'New place created' })
    } else {
        await Place.destroy({
            where: {
                place_id: place.dataValues.place_id
            }
        });
        return res.status(400).json({ message: 'Invalid place data received' })
    }
}

const getPlaceById = async (req, res) => {
    const { id } = req.body;
    if (!id) { return res.status(400).json({ message: 'Place ID required' }) }
    const place = await Place.findOne({ where: { place_id: id } })
    if (!place) { return res.status(400).json({ message: 'Place not found' }) }
    const place_type = place.dataValues.place_type;
    const getOne = place_type == 1 ? synagogue.getOneSynagogue :
                   place_type == 2 ? habad.getOneHabad :
                   place_type == 3 ? supermarket.getOneSupermarket :
                   place_type == 4 ? restaurant.getOneRestaurant : null;
    const place2 = await getOne(id);
    if (!place2) { return res.status(400).json({ message: 'Place not found' }) }
    const result = { ...place.dataValues, ...place2.dataValues }
    res.json(result)
}

const deletePlaceById = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'Place ID required' })
    }
    const place = await Place.findOne({ where: { place_id: id } })
    if (!place) { return res.status(400).json({ message: 'Place not found' }) }
    const place_type = place.dataValues.place_type;
    const deletePlace = place_type == 1 ? synagogue.deleteSynagogue :
                        place_type == 2 ? habad.deleteHabad :
                        place_type == 3 ? supermarket.deleteSupermarket :
                        place_type == 4 ? restaurant.deleteRestaurant : null;
    await deletePlace(id);
    await Place.destroy({ where: { place_id: id } });
    res.json(`Place with ID ${id} deleted`)
}

const updatePlace = async (req, res) => {
    const { place_name, place_address, place_lat, place_lng, place_hours, place_img, place_info_by, place_type } = req.body
    if (!req.params.id) {
        return res.status(400).json({ message: 'Place ID required' })
    }
    const updatedPlace = await Place.update({ place_name, place_address, place_lat, place_lng, place_hours, place_img, place_info_by, place_type }, { where: { place_id: req.params.id } })
    if (!updatedPlace) {
        return res.status(400).json({ message: 'place not found' })
    }
    const update = place_type == 1 ? synagogue.updateSynagogue :
                   place_type == 2 ? habad.updateHabad :
                   place_type == 3 ? supermarket.updateSupermarket :
                   place_type == 4 ? restaurant.updateRestaurant : null;
    const updated = await update(req.body);
    res.json({ ...updatedPlace, ...updated });
}

const getNearbyPlacesByType = async (req, res) => {
    const { lat, lng, place_type, maxDistance } = req.body;
    if (!lat || !lng || !place_type) { return res.status(400).json({ message: 'All fields are required' }) }
    //if (!maxDistance) { maxDistance = 300000; }
    var places = await Place.findAll({ where: { place_type: place_type }});
    places = places.map(place => place.dataValues);
    const dests = places.map(place => { return { lat: place.place_lat, lng: place.place_lng } })
    const distances = await maps.distancematrix({ lat, lng }, dests);
    places = places.filter((_, i) =>  distances[i].distance.value <= maxDistance )
    if (!places?.length) { return res.status(400).json({ message: 'No places found' }) }
    const places_ids = places.map(place => place.place_id);
    const getAll = place_type == 1 ? synagogue.getAllSynagoguesByID :
                    place_type == 2 ? habad.getAllHabadsByID :
                    place_type == 3 ? supermarket.getAllSupermarketsByID :
                    place_type == 4 ? restaurant.getAllRestaurantsByID : null;
    var subPlaces = await getAll(places_ids);
    subPlaces = subPlaces.map(place => place.dataValues);
    const result = places.map((place, i) => { return { ...place, ...subPlaces[i] } })
    res.json(result);
}

const getNearbyPlaces = async(req, res)=>{
    var { lat, lng, maxDistance, address } = req.body;
    if (!((lat && lng) || address) || !maxDistance) { return res.status(400).json({ message: 'All fields are required' }) }
    if(!(lat && lng)){
        const coords = await maps.geocode(address);
        if(!coords)return res.status(400).json({ message: 'No places found' });
        lat = coords.lat;
        lng = coords.lng;
    }
    var places = await Place.findAll();
    const dests = places.map(place => { return { lat: place.dataValues.place_lat, lng: place.dataValues.place_lng } })
    const distances = await maps.distancematrix({ lat, lng }, dests);
    places = places.filter((_, i) =>  distances[i].distance?.value <= maxDistance )
    if (!places?.length) { return res.status(400).json({ message: 'No places found' }) }
    res.json(places);
}

module.exports = {
    addNewPlace, //Insert one
    getPlaceById, //Get one
    deletePlaceById, //Delete one
    updatePlace, //Update one
    getNearbyPlacesByType,
    getNearbyPlaces
}
