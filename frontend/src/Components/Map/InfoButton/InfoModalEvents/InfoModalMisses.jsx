import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomButton from '../../../CustomButton/CustomButton';
import './InfoModalEvents.css'
function InfoModalMisses({ onClose }) {
const infoText = [
    "Welcome to the near misses page!",
    "You may also click on each event in order to view more information about it, including its category, sources, date & time, and if possible, a satellite image."
]
  return (
    <Modal show={true} onHide={onClose} className='info-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className='info-modal-body'>
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

export default InfoModalMisses;