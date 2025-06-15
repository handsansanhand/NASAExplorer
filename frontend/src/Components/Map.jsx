
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { retrieveAllEvents } from '../Scripts/retrieveAllEvents';
import { useEffect, useState } from 'react';

function Map() {
    const [markers, setMarkers] = useState([]);
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
                    <Popup>
              <strong>Event ID:</strong> {event.id}<br />
              <strong>Type:</strong> {geometry.type}<br />
              <strong>Date:</strong> {geometry.date}
            </Popup>
                </Marker>
            )

          })}
          </MapContainer>
    )
}
export default Map;