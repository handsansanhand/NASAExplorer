import "./Homepage.css";
import { fetchDailyImage } from "../../Scripts/fetchDailyImage";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DailyImageModal from "../../Components/DailyImageModal/DailyImageModal";
import LoadingPopup from "../../Components/LoadingPopup/LoadingPopup";
function Homepage() {
  const leftBoxText = "Welcome to the NASA Visualiser!";
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const showDailyImage = async () => {
    setLoading(true);
    const fetchedImage = await fetchDailyImage();
    setImageData(fetchedImage);
    setLoading(false);
    setShowModal(true);
  };

  return (
    <>
      {loading && <LoadingPopup text={"Loading Image..."} />}
      <div className="main-container">
        <div className="homepage-title">NASA Visualiser</div>
        <div className="content-row">
          <div className="left-box">{leftBoxText}</div>
          <div className="right-box">
            <p>
              View the
              <br></br>
              <Button onClick={() => showDailyImage()}>
                {" "}
                Fetch NASA Image{" "}
              </Button>
              <br></br>
              Astronomy Picture of the Day!
            </p>
          </div>
        </div>
      </div>
      <DailyImageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        imageData={imageData}
      />
    </>
  );
}

export default Homepage;
