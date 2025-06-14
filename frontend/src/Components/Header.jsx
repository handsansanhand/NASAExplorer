import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
      <>
       <Navbar bg="light" expand="lg" className="py-3 fixed-top custom-navbar">
          <Container fluid> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="custom-navbar">
              <Nav className="me-auto d-flex gap-4">
                <Nav.Link as={NavLink}
                    className="nav-link nav-link-instance"
                    to="/"
                    >
                      Home
                </Nav.Link>
                    <Nav.Link as={NavLink}
                    className="nav-link nav-link-instance"
                    to="/events"
                    >
                      Events
                </Nav.Link>
                               <Nav.Link as={NavLink}
                    className="nav-link nav-link-instance"
                    to="/weather"
                    >
                      Weather
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    ); 
}

export default Header;