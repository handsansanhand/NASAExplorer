const express = require('express');
const cors = require('cors');


const app = express()
const PORT = 3000;
const API_KEY = process.env.NASA_API_KEY;
const dailyImageURL = "https://api.nasa.gov/planetary/apod?api_key="

app.use(
    cors(
        {origin : ['http://localhost:5173'],
        })
);

app.get("/", (req, res) => {
    res.send("Welcome to my first node js api")
    console.log("req query ", req.query)
    console.log("req bosy = ", req.body)
    console.log("req params = ", req.params)
    console.log("req header = ", req.headers)

});

app.get("/hello", (req, res) => {
    res.json({message: "Hello from the api"})
})

app.listen(PORT, () => {
    console.log("App is listening on port ", PORT);
})

/*REST endpoint which returns the daily nasa image
    Returns:
        image_url
        image_title
        image_description
        image_author
*/
app.get("/dailyImage", async (req, res) => {
    console.log('Fetching daily image...')
    try {
        const nasaResponse = await fetch(`${dailyImageURL}${API_KEY}`)

        if(!nasaResponse.ok) {
        //have a backup here
        throw new Error(`NASA daily image API error: ${nasaResponse.status}`)
    }
    const data = await nasaResponse.json();
    res.json(
        {
            image_url : data.url,
            image_title : data.title,
            image_description : data.explanation,
            image_author : data.copyright || "Unknown"
        }
    )
    } catch (error) {
        console.error("Error fetching daily images:", error);
        res.status(500).json({ error: "Failed to fetch daily images" });
    }
})