/*helper script for the main homepage which fetches the daily image
    url: http://localhost:3000/dailyImage
*/
export async function fetchDailyImage () {
    try {
        const imageDataResponse = await fetch('/api/dailyImage')
        if(!imageDataResponse.ok) {
            throw new Error("HTTP Error fetching daily image. ERROR:", imageDataResponse.status)
        }
        const imageData = await imageDataResponse.json()
        console.log(imageData)
        console.log(imageData.image_url)
    } catch (error) {
        console.log("Error with image data " , error)
    }
}

