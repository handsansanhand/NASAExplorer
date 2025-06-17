/* Main API file, which configures them all and launches them */
const { PORT } = require('./config')
const express = require('express');
const cors = require('cors');
const dailyImageRoutes = require('./routes/dailyImage');
const eventsRoutes = require('./routes/events');
const earthRoutes = require('./routes/earth');

const app = express()

app.use(
    cors(
        {origin : ['http://localhost:5173'],
        })
);

app.use('/dailyImage', dailyImageRoutes);
app.use('/events', eventsRoutes);
app.use('/earth', earthRoutes)

app.listen(PORT, () => {
    console.log("App is listening on port ", PORT);
})
