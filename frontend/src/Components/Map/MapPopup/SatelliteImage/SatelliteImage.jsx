import React, { useEffect, useState } from "react";
import { retrieveSatelliteImage } from "../../../../Scripts/earth";
import "./SatelliteImage.css";
import { Infinity } from "ldrs/react";
import LoadingPopup from "../../../LoadingPopup/LoadingPopup";
function SatelliteImage({ coordinates }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  useEffect(() => {
    if (coordinates && coordinates.length === 2) {
      fetchImg();
    }
  }, [coordinates]);
  async function fetchImg() {
    setImageLoading(true);
    try {
      const blob = await retrieveSatelliteImage(coordinates);
      const url = URL.createObjectURL(blob);
      console.log(`retrieved url ${url}`);
      setImageUrl(url);
    } catch (error) {
      console.error("Error retrieving satellite image:", error);
      setImageUrl(null);
    }
    setImageLoading(false);
  }
  if (!coordinates || coordinates.length !== 2)
    return <p>No location data available.</p>;

  return (
    <div className="satellite-container">
      {imageLoading && (
        <LoadingPopup text={"Loading Satellite Image..."}/>
      )}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Satellite View"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      ) : (
        !imageLoading && <p>Unable to load satellite image.</p>
      )}
    </div>
  );
}
export default SatelliteImage;
