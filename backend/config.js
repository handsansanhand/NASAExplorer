const API_KEY = process.env.NASA_API_KEY;
const PORT = 3000;
const base_earth_url = "https://api.nasa.gov/planetary/earth/imagery"
module.exports = {
  API_KEY,
  PORT,
  base_earth_url
};