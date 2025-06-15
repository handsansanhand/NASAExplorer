
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { retrieveAllEvents } from '../Scripts/retrieveAllEvents';
import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import './Map.css'
import { Modal } from 'react-bootstrap';
import MapPopup from './MapPopup';

function Map() {
    const [markers, setMarkers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        });
    //every time this page is refreshed, repopulate the instances
    useEffect(() => {
        const fetchMarkers = async () => {
            const events = await retrieveAllEvents();
            setMarkers(events);
        }
        fetchMarkers();
    }, [])
    return (
        <>
        
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
           
          </>
    )
}
export default Map;