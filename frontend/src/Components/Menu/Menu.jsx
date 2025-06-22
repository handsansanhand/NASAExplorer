import { NavLink, useLocation } from "react-router-dom";
import "./Menu.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import CustomButton from "../CustomButton/CustomButton";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { IoMdInformationCircleOutline } from "react-icons/io";
import InfoModal from "../InfoModal/InfoModal";
function Menu() {
  const [show, setShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const location = useLocation();

  const handleToggle = () => setShow(!show);
  const handleClose = () => setShow(false);
  const handleInfoOpen = () => setInfoShow(true);
  const handleInfoClose = () => setInfoShow(false);

  const infoText = (() => {
    switch (location.pathname) {
      case "/":
        return [
          "Welcome to the homepage!",
          "Use the menu to explore NASA natural events and asteroid near misses.",
        ];
      case "/events":
        return [
          "Welcome to the natural events page! This page displays information about recent natural events all across the world stretching back to 90 days.",
          "You may filter the events by their date, their event type, as well as their 'state', which may be either open or closed.",
          "An event with an 'Open' status means that it is still ongoing, whereas an event marked as 'Closed' means that it has ceased.",
          "You may also click on each event in order to view more information about it, including its category, sources, date & time, and if possible, a satellite image.",
        ];
      case "/nearMisses":
        return [
          "Welcome to the near misses page!",
          "You can click each event to view more details including category, sources, date, and even a satellite image if available.",
        ];
      default:
        return [
          "Welcome to NASA Explorer!",
          "Use the menu to navigate through different pages.",
        ];
    }
  })();

  return (
    <>
      <Navbar
        bg="light"
        expand={false}
        className="py-3 fixed-top custom-navbar"
      >
        <Container fluid>
          <CustomButton text={"Menu"} onClick={handleToggle} />
          <Button onClick={handleInfoOpen} className="ms-2">
            <IoMdInformationCircleOutline size={24} />
          </Button>

          <Navbar.Offcanvas
            show={show}
            onHide={handleClose}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="popup-bar"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink
                  to="/"
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? "popup-link active" : "popup-link"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/events"
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? "popup-link active" : "popup-link"
                  }
                >
                  Natural Events
                </NavLink>
                <NavLink
                  to="/nearMisses"
                  onClick={handleClose}
                  className={({ isActive }) =>
                    isActive ? "popup-link active" : "popup-link"
                  }
                >
                  Near Misses
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <InfoModal
        show={infoShow}
        onClose={handleInfoClose}
        infoText={infoText}
      />
    </>
  );
}

export default Menu;
