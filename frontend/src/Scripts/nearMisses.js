
/* Helper scripts which contact the /nearMiss endpoint 
    /nearMiss parameters:
        -> start_date
        -> end_date
*/

//should recieve a json filter declaring both the start date + end date
export async function retrieveNearMisses(filter = {}) {

     let url = '/api/nearMiss';  //default

    if (filter && Object.keys(filter).length > 0) {
      //build query string from filter keys/values
      const query = Object.entries(filter)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      
        url = `${url}?${query}`
      //make the get request
      const response = await fetch(url)
      if(!response.ok) {
        throw new Error(`Error retrieving near misses. CODE:${response.status}`)
      }
      const data = await response.json();
      return data;
    }
    else {
        return new Error(`Filter is invalid for retrieving near misses.`)
    }
}

export async function retrieveNearMissInformation (id) {

}