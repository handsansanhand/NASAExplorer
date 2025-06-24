/*helper script for the main homepage which fetches the daily image
    url: http://localhost:3000/dailyImage
*/
export async function fetchDailyImage() {
  try {
    console.log(`fetching daily image`);
    const fullURL = `${baseURL}/dailyImage`;

    console.log(`Fetching daily image from: ${fullURL}`);
    const imageDataResponse = await fetch("/api/dailyImage");
    if (!imageDataResponse.ok) {
      throw new Error(
        "HTTP Error fetching daily image. ERROR:",
        imageDataResponse.status
      );
    }
    const imageJSON = await imageDataResponse.json();

    if (!imageJSON || !imageJSON.image_url) {
      //fallback to a default image just in case
      return {
        url: "backup_space_pic.jpg",
        title: "Error Finding Image",
        description:
          "There was a problem retrieving the image, good thing theres a backup!",
        author: "N/A",
      };
    }
    return {
      url: imageJSON.image_url,
      title: imageJSON.image_title,
      description: imageJSON.image_description,
      author: imageJSON.image_author,
    };
  } catch (error) {
    console.log("Error with image data ", error);
    return {
      url: "backup_space_pic.jpg",
      title: "Error Finding Image",
      description:
        "There was a problem retrieving the image, good thing theres a backup!",
      author: "N/A",
    };
  }
}
