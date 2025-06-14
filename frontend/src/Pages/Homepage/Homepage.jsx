import './Homepage.css'
import { fetchDailyImage } from '../../Scripts/fetchDailyImage'
import { useState } from "react" 
import CustomButton from '../../Components/CustomButton'
import { Modal, Button } from 'react-bootstrap'
function Homepage() {
      const leftBoxText = "Welcome to the NASA Visualiser!"
      const [showModal, setShowModal] = useState(false)
      const [imageData, setImageData] = useState(null)

    async function showDailyImage () {
        try {
          const imageJSON = await fetchDailyImage();
          if (!imageJSON || !imageJSON.image_url) {
            //fallback to a default image just in case
              setImageData({
              url: "backup_space_pic.jpg",
              title: "Error Finding Image",
              description: "There was a problem retrieving the image, good thing theres a backup!",
              author: "N/A"
          });
              console.log("No image returned.");
              setShowModal(true);
              return;
            }
          setImageData({
              url: imageJSON.image_url,
              title: imageJSON.image_title,
              description: imageJSON.image_description,
              author: imageJSON.image_author
          });

          setShowModal(true);
            
        } catch (error) {
          throw new Error("Error parsing the JSON image.")
        }
    }
    return (
        <>
        <div className='main-container'>
            <div className='homepage-title'>NASA Visualiser</div>
              <div className='content-row'>
                  <div className='left-box'>
                      {leftBoxText}
                  </div>
                  <div className="right-box">
                  <p>View the
                    <br></br>
                    <CustomButton text="Fetch NASA Image" onClick={() => showDailyImage()} />
                    <br></br>
                     Astronomy Picture of the Day!</p>
                  </div>
              </div>
        </div>
         <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header>
          <Modal.Title>{imageData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {imageData && (
              <div className="modal-body">
                <img src={imageData.url} alt={imageData.title} />
                <div className="modal-text">
                  <p>{imageData.description}</p>
                  <div className="author">Author: {imageData.author || 'Unknown'}</div>
                </div>
              </div>
  )}
</Modal.Body>
        <Modal.Footer>
          <CustomButton text="Close" onClick={() => setShowModal(false)} />
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Homepage