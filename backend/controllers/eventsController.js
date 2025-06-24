/* Events Controller
Events are represented by:
id , title, description (optional), 
link -> a link to the api endpoint with more information about the event
categories -> id (of event), title (what the event is called e.g: Severe Storms)
sources -> who reported it, url and id
goemetries -> an array of geographic points or polygons with associated timestamps representing the events locations over time.
              each geometry has: date, 
                                 type:
                                    Point = long and lat
                                    Polygon = areas
*/
const { API_KEY } = require("../config");
const { baseEventsURL, baseCategoriesURL } = require("../config");

/* Returns all detailed events from the past 3 months
    Returns the ID + latest geometry (last place it was seen)
*/
async function getAllEvents(req, res) {
  console.log(`Fetching events...`);
  try {
    const response = await fetch(`${baseEventsURL}?days=91`);
    if (!response.ok) {
      throw new Error(
        `Error retrieving information from events api, CODE:${response.status}`
      );
    }
    const data = await response.json();

    const newData = await returnLatestGeometry(data);
    res.json(newData);
  } catch (error) {
    console.error("Error parsing event data.", error);
    res.status(500).json({ error: "Failed to fetch daily images" });
  }
}

/* Filtered function, takes in a JSON with specified user filters */
async function getEvents(req, res) {
  const { category, source, status, days, limit } = req.query;
  /*the call is structured using path variables, joined by &
    go through the request, each non-empty parameter provided, append it to the initially blank query string
    */
  //if category exists, it has to instead call the categories api : baseCategoriesURL + /{category}/rest of filter
  let query = [];
  const baseURL =
    category !== undefined ? `${baseCategoriesURL}/${category}` : baseEventsURL;
  if (category !== undefined) {
    query.push(`${baseCategoriesURL}/${category}`);
  } else {
    query.push(baseEventsURL);
  }

  if (source) query.push(`source=${source}`);
  if (status) query.push(`status=${status}`);
  if (days) query.push(`days=${days}`);
  if (limit) query.push(`limit=${limit}`);

  //now append all the queries together
  const queryString = query.length ? `?${query.join("&")}` : "";
  const finalRequestString = `${baseURL}${queryString}`;
  //make the api request
  const response = await fetch(`${finalRequestString}`);
  if (!response.ok) {
    console.error("Error fetching event by ID", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
  const responseJSON = await response.json();
  const newData = await returnLatestGeometry(responseJSON);
  res.json(newData);
}

async function getEventByID(req, res) {
  const { id } = req.params;

  try {
    const response = await fetch(`${baseEventsURL}/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error retrieving event with ID ${id}, CODE:${response.status}`
      );
    }
    const eventData = await response.json();
    res.json(eventData);
  } catch (error) {
    console.error("Error fetching event by ID", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
}

//helper function which, for each entry in the json, adds a new value which is their latest geometry (latest location of the event)
function returnLatestGeometry(data) {
  const updatedData = data.events.map((event) => {
    //if there is no geometries, or the geometries are empty
    if (!event.geometries || event.geometries.length === 0) {
      return {
        ...event,
        latestGeometry: null,
      };
    }
    //there are geometries, go through them and find the closest date
    const latestGeometry = event.geometries.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
    //and return the event including the latest geometry
    return {
      id: event.id,
      title: event.title,
      latestGeometry,
    };
  });
  return updatedData;
}

module.exports = { getAllEvents, getEvents, getEventByID };
