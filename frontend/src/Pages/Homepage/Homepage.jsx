import './Homepage.css'
import { fetchDailyImage } from '../../Scripts/fetchDailyImage'
import { useState } from "react" 
import CustomButton from '../../Components/CustomButton'
import { Modal, Button } from 'react-bootstrap'
function Homepage() {
      const leftBoxText = "Welcome to the NASA Visualiser!"
      const [message, setMessage] = useState("")
      const [showModal, setShowModal] = useState(false)
      const [imageData, setImageData] = useState(null)

    async function showDailyImage () {
        try {
          const imageJSON = await fetchDailyImage();
          if (!imageJSON || !imageJSON.image_url) {
            //fallback to a default image
              console.log("No image returned.");
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
        <Modal.Header closeButton>
          <Modal.Title>{imageData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageData && (
            <>
              <img src={imageData.url} alt={imageData.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
              <p><strong>Author:</strong> {imageData.author || 'Unknown'}</p>
              <p>{imageData.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Homepage