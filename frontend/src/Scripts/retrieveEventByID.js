
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