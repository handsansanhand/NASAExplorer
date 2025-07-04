import { Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import MapLegend from "../MapLegend";
import { FaArrowLeft, FaFilter, FaAngleRight } from "react-icons/fa";
import './MapLegendDrawer.css'
function MapLegendDrawer({ updateFilter }) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        className="legend-toggle-btn"
        onClick={handleToggle}
      >
        <FaAngleRight size={20} />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="map-legend-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FaArrowLeft onClick={handleClose} /> Filter Events
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MapLegend updateFilter={updateFilter} className='map-legend-popup'/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MapLegendDrawer;
