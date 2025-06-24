const { base_earth_url } = require("../config");
const { API_KEY } = require("../config");

//retrieves a satelite image of the lat and lon parameters
async function getImage(req, res) {
  console.log(`Fetching satellite image...`);
  const { lat } = req.query;
  const { lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(500)
      .json({
        error:
          "Cannot retrieve image, both latitude and longitude are required.",
      });
  }
  try {
    let query = [];

    query.push(`lat=${lat}`);
    query.push(`lon=${lon}`);
    query.push(`dim=0.1`);
    query.push(`api_key=${API_KEY}`);
    const queryString = query.length ? `?${query.join("&")}` : "";
    const finalQuery = `${base_earth_url}${queryString}`;
    const controller = new AbortController();
    //sometimes, this api gets stuch in an infinite loop so we need to include a timeout
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(finalQuery, { signal: controller.signal });
  
    clearTimeout(timeout);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`There was an error recieving the satellite image.`);
      return res.status(response.status).json({
        error: `NASA API responded with status ${response.status}`,
        details: errorText,
      });
    }
    //it has to be returned as an image
    const imageBuffer = await response.arrayBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch image from NASA API",
      message: error.message,
    });
  }
}

module.exports = { getImage };
