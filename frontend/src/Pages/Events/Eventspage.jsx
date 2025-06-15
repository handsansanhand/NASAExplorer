import './Eventspage.css'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Map from '../../Components/Map';
import MapLegend from '../../Components/MapLegend';
function Eventspage() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });

    return (
        <>
        <Map />
        <MapLegend />
        </>
    )
}

export default Eventspage