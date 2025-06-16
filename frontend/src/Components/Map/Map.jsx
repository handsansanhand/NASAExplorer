
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './Map.css'
import MapPopup from './MapPopup/MapPopup';
import CustomSlider from './Slider/CustomSlider';
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'
import { retrieveEvents } from '../../Scripts/events';


function Map() {
    const [markers, setMarkers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(false);

        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        });
    //every time this page is refreshed, repopulate the instances
    useEffect(() => {
        const fetchMarkers = async () => {
            setLoading(true);
            const events = await retrieveEvents(filter);
            setMarkers(events);
            setLoading(false);
        }
        fetchMarkers();
    }, [filter])

    const handleSliderCommit = async (value) => {
      console.log(`Slider value recieved ${value} doing a get request for all events in this time`);
      setFilter((prev) => ({
        ...prev,
        days: value
      }));
    }
    return (
        <>
         
        <div className='map-wrapper'>  
            {loading && (
    <div className="loading-overlay">
      <p>Loading Events...</p>
      <Infinity size="120" stroke="5" speed="1.5" color="#3498db" />
    </div>
  )}

          <MapContainer center={[0, 0]} 
         zoom={2} 
         minZoom={3} 
         maxZoom={10}  
         scrollWheelZoom={true}
         worldCopyJump={false}
         maxBounds={[[-90, -180], [90, 180]]}
         maxBoundsViscosity={1.0}
         className="leaflet-container">
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; OpenStreetMap contributors'
          />

          {markers.map(event => {
            const geometry = event.latestGeometry;
            if(!geometry || !geometry.coordinates) return null;
         
            const [lon, lat] = geometry.coordinates;
            return (
                <Marker key={event.id} position={[lat, lon]}>
            <Popup className='custom-popup'>
               <strong className="popup-title">{event.title}</strong>
              <CustomButton text={`Show More`} onClick={() => {
                setSelectedEvent(event);
                setShowModal(true)}
              } ></CustomButton>
            </Popup>
            </Marker>
            )
          })}
          </MapContainer>
          <MapPopup
          show={showModal}
          onHide={() => setShowModal(false)}
          eventData={selectedEvent}
          >
          </MapPopup>
          <div className='map-slider-container'>
          <CustomSlider onValueCommit={handleSliderCommit}/>
          </div>

        </div>
         
          
          </>
    )
}
export default Map;