const { API_KEY } = require('../config')
const { baseNearEarthURL } = require('../config')

/* Controller which contacts the NEOW api
for this projects sake, needs to extract:
    name
    Average estimated diameter (estimated diameter min + estimated diameter max / 2) in meters
    is_potentially_hazardous (true or false)
    close_approach data: 
        close_approach_date_full (date & time)
        relative_velocity (km/h)
        miss_distance (km)
*/

async function getNearMissObjects (req, res) {
    try {
        const {start_date, end_date} = req.query;
        //no date specified, go with the standard
        let begin_date = '';
        let final_date = '';
        if(start_date || end_date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        begin_date = today.toISOString().split('T')[0];
        final_date = yesterday.toISOString().split('T')[0];      
       
        }
        else {
            res.status(500).json({error: `The request body was not valid for this API call : ${req.message}`});
            return;
        }
        const format = `start_date=${begin_date}&end_date=${final_date}&api_key=${API_KEY}`;
        const queryString = `${baseNearEarthURL}?${format}`;
        console.log(`query : ${queryString}`)
        const request = await fetch(queryString)

        if(!request.ok) {
            const errorText = await request.json();
            res.status(500).json(
                {error: `There was an error returning the near miss objects.`,
                code: request.status,
                message: errorText
                }          
            );
            return;
        }

        const data = await request.json();
        const extractedObjects = extractData(data.near_earth_objects);
        res.json(extractedObjects);
    } 
    
    catch (error) {
        console.log(`There was an error. ${error.message}`)
        res.status(500).json(
            {error : error.message}
        )
    }
}

function extractData(nearEarthObjects) {
    const returnJSON = {};
    for(const date in nearEarthObjects) {
        const objectsOnDate = nearEarthObjects[date];

         objectsOnDate.forEach(asteroid => {
            const close_approach_data = extractCloseApproachData(asteroid.close_approach_data);
            const asteroidInfo = {
                Name: asteroid.name,
                'Nasa JPL URL': asteroid.nasa_jpl_url,
                Size: calculateSize(asteroid.estimated_diameter),
                Hazardous: asteroid.is_potentially_hazardous_asteroid,
                Date : close_approach_data.date,
                Time : close_approach_data.time,
                Speed : close_approach_data.speed,
                'Miss Distance' : close_approach_data.miss_distance,
            };
          
        returnJSON[asteroid.id] = asteroidInfo;
        });
    }
    return returnJSON;
}

function extractCloseApproachData(close_approach_data) {
    const approach = close_approach_data[0];

    const date = approach.close_approach_date;
    const time = approach.close_approach_date_full.split(' ')[1]; 
    const speed = approach.relative_velocity.kilometers_per_hour;
    const miss_distance = approach.miss_distance.kilometers;

    return {
        date,
        time,
        speed,
        miss_distance
}
}

//return the average estimated size
function calculateSize(estimated_diameter) {
    const meters = estimated_diameter.meters;
    return (meters.estimated_diameter_min + meters.estimated_diameter_max) / 2;
}

module.exports = { getNearMissObjects };