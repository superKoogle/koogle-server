const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const geocode = async (address) => {
  const args = {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      address: address,
    }
  };
  const coords = await client.geocode(args).then(res => { return res.data.results[0].geometry.location })
  return coords;
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
  const durations = await client.distancematrix(request).then(res => { return res.data.rows[0].elements });
  // console.log(durations);
  return durations;
}

const placeAutocomplete = async (req, res)=>{
  const {text} = req.body
  if(!text){return res.status(400).json({ message: 'Text to search is required' })}
  const request={
    params:{
      input:text,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  }
  var suggestions = await client.placeAutocomplete(request).then(res => {return res.data})
  suggestions = suggestions.predictions.map(e => e.description)
  return res.status(200).json(suggestions);
}


module.exports = {
  geocode,
  distancematrix,
  placeAutocomplete,
}