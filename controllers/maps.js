const { Client } = require("@googlemaps/google-maps-services-js");
const util = require("@googlemaps/google-maps-services-js/dist/util");

const client = new Client({});

const geocode = async (address) => {
  console.log(address);
  const args = {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      address: address,
    }
  };
  const coords = []
  try{
    coords = await client.geocode(args).then(res => { return res.data.results[0]?.geometry.location })
  }
  catch{
    console.log("an error acurred while using google api")
  }
  return coords;
}

const geocodeAddress = async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ message: 'Address is required' })
  }
  try{
    return res.status(200).json(await geocode(address));
  }
  catch{
    return res.status(503).json({  });
  }
}

const reverseGeocode = async (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ message: 'Address is required' })
  }
  const request = {
    params: {
      latlng: [lat, lng],
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  }
  const result = []
  try{
    result = await client.reverseGeocode(request);
  }
  catch{
    return res.status(503).json({  });
  }
  console.log(result);
  return res.status(200).json(result.data);
}


const distancematrix = async (origin, dests) => {
  const request = {
    params: {
      origins: [origin],
      destinations: dests,
      language: 'english',
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  }
  const durations = []
  try{
    durations = await client.distancematrix(request).then(res => { return res.data.rows[0].elements });
  }
  catch{
    return res.status(503).json({  });
  }
  return durations;
}

const placeAutocomplete = async (req, res) => {
  const { text } = req.body
  if (!text) { return res.status(400).json({ message: 'Text to search is required' }) }
  const request = {
    params: {
      input: text,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  }
  try{
      var suggestions = await client.placeAutocomplete(request).then(res => { return res.data })
      suggestions = suggestions.predictions.map(e => e.description)
      return res.status(200).json(suggestions);
  }
  catch{
        return res.status(500).json({message: "internal server error"});
  }
}
const direction = async (req, res) => {
  const { source_lat, source_lng, dest_lat, dest_lng } = req.body;
  if (!source_lat || !source_lng || !dest_lat || !dest_lng) {
    return res.status(400).json({ message: 'Source and destinations are required' })
  }
  const requestOptions = {
    params: {
      origin: [source_lat, source_lng],
      destination: [dest_lat, dest_lng],
      mode: "driving",
      departure_time: "now",
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  }
  const directionRes = []
  try{
    directionRes = await client.directions(requestOptions);
  }
  catch{
    return res.status(503).json({  });
  }
  directionRes.data.routes.forEach(route => {
    route.bounds = {
      south: route.bounds.southwest.lat,
      west: route.bounds.southwest.lng,
      north: route.bounds.northeast.lat,
      east: route.bounds.northeast.lng
    };
    route.legs.forEach(leg => {
      leg.steps.forEach(step => {
        step.path = util.decodePath(step.polyline.points);
      });
    });
  });
  const request = {
    "origin": { "lat": source_lat, "lng": source_lng },
    "destination": { "lat": dest_lat, "lng": dest_lng },
    "travelMode": "DRIVING"
  }
  return res.status(200).json({ ...directionRes.data, request });
}


module.exports = {
  geocode,
  distancematrix,
  placeAutocomplete,
  geocodeAddress,
  direction,
  reverseGeocode
}
