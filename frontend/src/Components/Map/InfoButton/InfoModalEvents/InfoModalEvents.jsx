import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomButton from "../../../CustomButton/CustomButton";
import "./InfoModalEvents.css";
function InfoModalEvents({ onClose }) {
  const infoText = [
    "Welcome to the natural events page! This page displays information about recent natural events all across the world stretching back to 90 days.",
    "You may filter the events by their date, their event type, as well as their 'state', which may be either open or closed.",
    "An event with an 'Open' status means that it is still ongoing, whereas an event marked as 'Closed' means that it has ceased.",
    "You may also click on each event in order to view more information about it, including its category, sources, date & time, and if possible, a satellite image.",
  ];
  return (
    <Modal show={true} onHide={onClose} className="info-modal">
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="info-modal-body">
        {infoText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModalEvents;
