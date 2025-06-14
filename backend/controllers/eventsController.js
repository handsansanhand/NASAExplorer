const { API_KEY } = require('../config')
const baseEventsURL = "https://eonet.gsfc.nasa.gov/api/v2.1/events";

/* Returns all detailed events from the past 3 months*/
async function getAllEvents(req, res) {
    try {
        const response = await fetch(`${baseEventsURL}?days=91`);
        if(!response.ok) {
            throw new Error(`Error retrieving information from events api, CODE:${response.status}`)
        }
        const data = await response.json()
        res.json(data);
        
    } catch (error) {
         console.error("Error parsing event data.", error);
        res.status(500).json({ error: "Failed to fetch daily images" });
    }
}


module.exports = { getAllEvents };