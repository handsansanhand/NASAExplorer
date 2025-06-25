import { Modal, Button } from "react-bootstrap";

//image data passed in, and when to show/hide itself
function DailyImageModal({ show, onHide, imageData }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>NASA Daily Astronomy Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {imageData && (
          <div className="modal-body">
            <img
              src={imageData.url}
              alt={imageData.title}
              className="modal-image"
            />
            <div className="modal-text">
              <div className="image-title">{imageData.title}</div>
              <p>{imageData.description}</p>
              <div className="author">
                Author: {imageData.author || "Unknown"}
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DailyImageModal;
