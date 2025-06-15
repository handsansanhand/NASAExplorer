
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Menu.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CustomButton from './CustomButton';
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
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/" onClick={handleClose}>Home</Nav.Link>
              <Nav.Link href="events" onClick={handleClose}>Events</Nav.Link>
              <Nav.Link href="weather" onClick={handleClose}>Weather</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Menu;