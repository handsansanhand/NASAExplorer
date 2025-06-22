import "./Homepage.css";
import { fetchDailyImage } from "../../Scripts/fetchDailyImage";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
function Homepage() {
  const leftBoxText = "Welcome to the NASA Visualiser!";
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);

  const showDailyImage = async () => {
    const fetchedImage = await fetchDailyImage();
    setImageData(fetchedImage);
    setShowModal(true);
  };

  return (
    <>
      <div className="main-container">
        <div className="homepage-title">NASA Visualiser</div>
        <div className="content-row">
          <div className="left-box">{leftBoxText}</div>
          <div className="right-box">
            <p>
              View the
              <br></br>
              <Button
                onClick={() => showDailyImage()}
              > Fetch NASA Image </Button>
              <br></br>
              Astronomy Picture of the Day!
            </p>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>NASA Daily Astronomy Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageData && (
            <div className="modal-body">
              <img src={imageData.url} alt={imageData.title} className="modal-image" />
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
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Homepage;
