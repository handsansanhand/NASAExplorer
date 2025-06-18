
import { NavLink } from 'react-router-dom';
import './Menu.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CustomButton from '../CustomButton/CustomButton';
import { useState } from 'react';

function Menu() {
    const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);
  return (
    
  <Navbar bg="light" expand={false} className="py-3 fixed-top custom-navbar">
      <Container fluid>
        <CustomButton text={"Menu"} onClick={handleToggle} />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className = 'popup-bar'
        >
      
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="/" onClick={handleClose}   className={({ isActive }) => isActive ? "popup-link active" : "popup-link"}>Home</NavLink>
              <NavLink to="/events" onClick={handleClose} className={({ isActive }) => isActive ? "popup-link active" : "popup-link"}>Natural Events</NavLink>
              <NavLink to="/nearMisses" onClick={handleClose} className={({ isActive }) => isActive ? "popup-link active" : "popup-link"}>Near Misses</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Menu;