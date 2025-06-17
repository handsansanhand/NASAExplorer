const { base_earth_url } = require('../config');
const { API_KEY } = require('../config')
console.log(base_earth_url);

//retrieves a satelite image of the lat and lon parameters
async function getImage(req, res) {
    const { lat }= req.query;
    const { lon }= req.query;
    if (!lat || !lon) {
          res.status(500).json({ error: "Cannot retrieve image, both latitude and longitude are required." });
        }
    try {
    let query = []

    query.push(`lat=${lat}`);
    query.push(`lon=${lon}`);
    query.push(`api_key=${API_KEY}`)
    const queryString = query.length ? `?${query.join('&')}` : '';
    const finalQuery = (`${base_earth_url}${queryString}`)
    console.log(`final queryu ${finalQuery}`)

    const response = await fetch(finalQuery)
    if(!response.ok) {
        return new Error(`Error retrieving the image. CODE:${response.status}`)
    }

    const data = await response.json();
    res.json(data);

    } catch(error) {
         res.status(500).json({ error: "Failed to fetch event" });
        return new Error(`Couldn't return an image, something went wrong. ${error.message}`)
       
    }
   
}

module.exports = { getImage };