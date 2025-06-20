const { API_KEY } = require('../config')
const { baseNearEarthURL } = require('../config')

const nearEarthFeedURL = baseNearEarthURL + 'feed';
const asteroidLookupURL = baseNearEarthURL + 'neo/'
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

//retrieves all near miss objects given optional path variables: start_date, end_date
async function getNearMissObjects (req, res) {
    try {
        const {start_date, end_date} = req.query;
        
        let begin_date = '';
        let final_date = '';
        //no date specified, go use a fallback of one day
        if(!start_date || !end_date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        begin_date = today.toISOString().split('T')[0];
        final_date = yesterday.toISOString().split('T')[0];      
       
        }
       //date specified
        else {
            begin_date = start_date;
            final_date = end_date;
        }
        const format = `start_date=${begin_date}&end_date=${final_date}&api_key=${API_KEY}`;
        const queryString = `${nearEarthFeedURL}?${format}`;
      //  console.log(`query : ${queryString}`)
        const request = await fetch(queryString)

        if(!request.ok) {
            const errorText = await request.json();
            console.log(errorText);
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

//we need to extract all the information mentioned above and return it in json form
function extractData(nearEarthObjects) {
    const returnJSON = {};
    for(const date in nearEarthObjects) {
        const objectsOnDate = nearEarthObjects[date];

         objectsOnDate.forEach(asteroid => {
            const close_approach_data = extractCloseApproachData(asteroid.close_approach_data);
            //deal with the numerical data
            const speed = close_approach_data.speed;
            const miss_distance = close_approach_data.miss_distance;

            const speedFixed = Number(speed).toFixed(2);
            const missDistanceFixed = Number(miss_distance).toFixed(2);
            const asteroidInfo = {
                Name: asteroid.name,
                //'Nasa JPL URL': asteroid.nasa_jpl_url,
                'Average Estimated Diameter (Meters)': calculateSize(asteroid.estimated_diameter),
                'Speed (KM/H)' : speedFixed,
                'Miss Distance (Kilometers)' : missDistanceFixed,
                Hazardous: asteroid.is_potentially_hazardous_asteroid,
                Date : close_approach_data.date,
                Time : close_approach_data.time,
            };
          
        returnJSON[asteroid.id] = asteroidInfo;
        });
    }
    return returnJSON;
}

//helper function for dealing with close approach data, which itself is a nested json
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
    return ((meters.estimated_diameter_min + meters.estimated_diameter_max) / 2).toFixed(2);
}

/* We need to also be able to look up a specific asteroid given an id using the asteroidLookupURL
    Returns:
        A json containing information about the asteroid and close_approach_data
        This close_approach_data is crucial for returning the history of the asteroid
        close_approach_data:    
            array of json objects with information about the history of the asteroids near misses:
                close_approach_date
                relative_velocity -> json object
                miss_distanec -> json object
                orbiting_body -> string of planet it missed
*/
async function getTimelineOfAsteroid (req, res) { console.log(`Retrieving timeline of asteroid...`)
    try {
       
        const { id } = req.params;
    const queryString = (`${asteroidLookupURL}${id}?api_key=${API_KEY}`);
    const request = await fetch(queryString);
    if(!request.ok) {
         const errorText = await request.json();
        console.error(`There was a server side problem when retrieving asteroid timeline.`)
        res.status(500).json(
            {status: request.status,
             message : errorText   
            }
        )
        return;
    }
    const data = await request.json();
    const closeApproachData = data.close_approach_data;

    res.status(200).json(
        closeApproachData
    );
    return;
    } catch (error) {
        console.error(`There was some error in retrieving the asteroid timeline.`)
        res.status(500).json(
            {error : error.message}
        )
    }
    

}
module.exports = { getNearMissObjects, getTimelineOfAsteroid };