const baseURL = import.meta.env.VITE_BACKEND_URL;
//go through the filter that is been passed in by map, and build the query string
export async function retrieveEvents(filter = {}) {
  try {
    let url = `${baseURL}/events`; //default

    if (filter && Object.keys(filter).length > 0) {
      //build query string from filter keys/values
      const query = Object.entries(filter)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      if (query.length > 0) {
        url = `${baseURL}/events/filterEvents?${query}`;
      }
    }
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Error fetching events: ${response.status}`);

    const data = await response.json();

    //return events array from response
    if (Array.isArray(data)) return data;
    if (data.events && Array.isArray(data.events)) return data.events;

    // fallback
    return [];
  } catch (error) {
    throw new Error(
      `There was an issue when retrieving events. Please try again, or check if the API is running.`
    );
    return [];
  }
}

export async function retrieveEventByID(id) {
  try {
    const response = await fetch(`${baseURL}/events/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error retrieving event with ID:${id}, CODE:${response.status}`
      );
    }
    const eventData = await response.json();
    if (!eventData) {
      return {
        title: `Error Retrieving Event`,
        description: `There was an unexpected error when retrieving this event.`,
      };
    }
    return eventData;
  } catch (error) {
    throw new Error(
      `Error retrieving event with ID:${id} ERROR: ${error.message}`
    );
  }
}
