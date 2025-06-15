
//this should return all events through the api, each event will have their own id, and latest geometry
export async function retrieveAllEvents() {
try {
    const events = await fetch('/api/events')
    if(!events.ok) {
        throw new Error(`Error fetching events, CODE:${events.status}`)
    }
    const eventsJSON = await events.json();
    console.log(eventsJSON);
    return eventsJSON;
} catch (error) {
    throw new Error(`There was an issue when retrieving events.`)
}
}