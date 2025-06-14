const express = require('express');
const app = express()
const cors = require('cors');
const PORT = 3000;

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