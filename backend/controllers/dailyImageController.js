const { API_KEY } = require("../config");
const dailyImageURL = "https://api.nasa.gov/planetary/apod?api_key=";
/*REST endpoint which returns the daily nasa image
    Returns:
        image_url
        image_title
        image_description
        image_author
*/
async function getDailyImage(req, res) {
  console.log("Fetching daily image...");
  try {
    const nasaResponse = await fetch(`${dailyImageURL}${API_KEY}`);

    if (!nasaResponse.ok) {
      //have a backup here
      throw new Error(`NASA daily image API error: ${nasaResponse.status}`);
    }
    const data = await nasaResponse.json();
    res.json({
      image_url: data.url,
      image_title: data.title,
      image_description: data.explanation,
      image_author: data.copyright || "Unknown",
    });
  } catch (error) {
    console.error("Error fetching daily images:", error);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to fetch daily images" });
  }
}

module.exports = { getDailyImage };
