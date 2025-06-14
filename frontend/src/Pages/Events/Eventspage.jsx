import './Eventspage.css'
import { fetchDailyImage } from '../../Scripts/fetchDailyImage'
import { useState } from "react" 
import CustomButton from '../../Components/CustomButton'
import { Modal, Button } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function Eventspage() {
      delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

    return (
        <>
         <MapContainer center={[0, 0]} zoom={2} style={{ height: "600px", width: "100%" }}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; OpenStreetMap contributors'
          />
          </MapContainer>
        </>
    )
}

export default Eventspage