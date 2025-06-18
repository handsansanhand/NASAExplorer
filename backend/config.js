const API_KEY = process.env.NASA_API_KEY;
const PORT = 3000;
const base_earth_url = "https://api.nasa.gov/planetary/earth/imagery";
const baseEventsURL = "https://eonet.gsfc.nasa.gov/api/v2.1/events";
const baseCategoriesURL = "https://eonet.gsfc.nasa.gov/api/v2.1/categories";
const baseNearEarthURL = "https://api.nasa.gov/neo/rest/v1/feed";
module.exports = {
  API_KEY,
  PORT,
  base_earth_url,
  baseEventsURL,
  baseCategoriesURL,
  baseNearEarthURL
};