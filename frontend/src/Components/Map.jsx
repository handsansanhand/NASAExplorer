
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function Map() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        });
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
          </MapContainer>
    )
}
export default Map;