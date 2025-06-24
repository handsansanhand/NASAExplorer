import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import "./Map.css";
import MapPopup from "./MapPopup/MapPopup";
import CustomSlider from "./Slider/CustomSlider";
import "ldrs/react/Infinity.css";
import { retrieveEvents } from "../../Scripts/events";
import MapLegend from "./MapLegend/MapLegend";
import { Button } from "react-bootstrap";
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import MapLegendDrawer from "./MapLegend/MapLegendDrawer/MapLegendDrawer";
//map component, contains a filter, stores markers which are fetched from the api when filter is changed, and a mechanism for selecting an event
function Map() {
  const [markers, setMarkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState({ days: 90 });
  const [loading, setLoading] = useState(false);

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
  //every time this page is refreshed (the filter is changed), repopulate the instances (markers on the map)
  useEffect(() => {
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
      {loading && <LoadingPopup text={"Loading Events..."} />}{" "}
      <div className="map-wrapper">
        <MapLegend updateFilter={updateFilter} />
        <MapLegendDrawer updateFilter={updateFilter} />
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
                  <Button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowModal(true);
                    }}
                  >
                    Show More
                  </Button>
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
        </div>
      </div>
    </>
  );
}
export default Map;
