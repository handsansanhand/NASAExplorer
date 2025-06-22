import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './InfoModal.css'

//the popup with passed in info text (an array of strings)
function InfoModal({ show, onClose, infoText }) {
  return (
    <Modal show={show} onHide={onClose} className="info-modal">
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="info-modal-body">
        {infoText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
