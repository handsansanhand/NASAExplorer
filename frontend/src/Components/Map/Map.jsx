import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./Map.css";
import MapPopup from "./MapPopup/MapPopup";
import CustomSlider from "./Slider/CustomSlider";
import { Infinity } from "ldrs/react";
import "ldrs/react/Infinity.css";
import { retrieveEvents } from "../../Scripts/events";
import MapLegend from "./MapLegend/MapLegend";
import InfoButton from "./InfoButton/InfoButton";
import InfoModalEvents from "./InfoButton/InfoModalEvents/InfoModalEvents";

function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState({ days: 90 });
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => setShowInfoModal(true);
  const handleCloseInfoModal = () => setShowInfoModal(false);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  const updateFilter = (newFilter) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };
  //every time this page is refreshed, repopulate the instances
  useEffect(() => {
    console.log("Filter changed:", JSON.stringify(filter, null, 2));
    const fetchMarkers = async () => {
      setLoading(true);
      const events = await retrieveEvents(filter);
      setMarkers(events);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchMarkers();
  }, [filter]);

  const handleSliderCommit = async (value) => {
    setFilter((prev) => ({
      ...prev,
      days: value,
    }));
  };
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <p>Loading Events...</p>
          <Infinity size="120" stroke="5" speed="1.5" color="	#fc3c23" />
        </div>
      )}{" "}
      <InfoButton onClick={handleShowInfoModal}></InfoButton>
      {showInfoModal && <InfoModalEvents onClose={handleCloseInfoModal} />}
      <div className="map-wrapper">
        <MapLegend updateFilter={updateFilter} />
        <MapContainer
          center={[0, 0]}
          zoom={2}
          minZoom={3}
          maxZoom={10}
          scrollWheelZoom={true}
          worldCopyJump={false}
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
          maxBoundsViscosity={1.0}
          className="leaflet-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {markers.map((event) => {
            const geometry = event.latestGeometry;
            if (!geometry || !geometry.coordinates) return null;

            const [lon, lat] = geometry.coordinates;
            return (
              <Marker key={event.id} position={[lat, lon]}>
                <Popup className="custom-popup">
                  <strong className="popup-title">{event.title}</strong>
                  <CustomButton
                    text={`Show More`}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowModal(true);
                    }}
                  ></CustomButton>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <MapPopup
          show={showModal}
          onHide={() => setShowModal(false)}
          eventData={selectedEvent}
        ></MapPopup>
        <div className="map-slider-container">
          <CustomSlider onValueCommit={handleSliderCommit} />
          <h2>Filter Events by Date Range</h2>
        </div>
      </div>
    </>
  );
}
export default Map;
