
//this should return all events through the api, each event will have their own id, and latest geometry
export async function retrieveAllEvents() {
try {
    const events = await fetch('/api/events')
    if(!events.ok) {
        throw new Error(`Error fetching events, CODE:${events.status}`)
    }
    const eventsJSON = await events.json();
   // console.log(eventsJSON);
    return eventsJSON;
} catch (error) {
    throw new Error(`There was an issue when retrieving events. Please try again, or check if the API is running.`)
}
}

//go through the filter that is been passed in by map, and build the query string
export async function retrieveEvents (filter = {}) {
    try {
    let url = '/api/events';  //default

    if (filter && Object.keys(filter).length > 0) {
      //build query string from filter keys/values
      const query = Object.entries(filter)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      
      if (query.length > 0) {
        url = `/api/events/filterEvents?${query}`;
      }
    }

    console.log(`doing call to ${url}`);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching events: ${response.status}`);

    const data = await response.json();

    // Return events array from response, try to be flexible with data format
    if (Array.isArray(data)) return data;
    if (data.events && Array.isArray(data.events)) return data.events;

    // fallback
    return [];

  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function retrieveEventByID(id) {
try {

    const response = await fetch(`/api/events/${id}`)
    if(!response.ok) {
        throw new Error(`Error retrieving event with ID:${id}, CODE:${response.status}`)
    }
    console.log(`${response.body}`)
    const eventData = await response.json();
    console.log(`Event data: ${eventData}`)
    if(!eventData) {
        return {
            title: `Error Retrieving Event`,
            description: `There was an unexpected error when retrieving this event.`
        }
    }
    return eventData;
} catch (error) {
    throw new Error(`Error retrieving event with ID:${id} ERROR: ${error.message}`);
}

}