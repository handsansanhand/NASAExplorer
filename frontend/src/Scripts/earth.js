const baseURL = import.meta.env.VITE_BACKEND_URL;
//contacts the satellite api
export async function retrieveSatelliteImage(coordinates) {
  if (!coordinates || coordinates.length < 2) {
    throw new Error("Invalid coordinates provided.");
  }

  const [lon, lat] = coordinates;

  const imageUrl = `${baseURL}/earth?lon=${lon}&lat=${lat}`;
  console.log("Satellite image URL:", imageUrl);

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch satellite image: ${response.status}`);
  }

  const imageBlob = await response.blob();
  return imageBlob;
}
