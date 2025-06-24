import "./Homepage.css";
import { fetchDailyImage } from "../../Scripts/fetchDailyImage";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DailyImageModal from "../../Components/DailyImageModal/DailyImageModal";
import LoadingPopup from "../../Components/LoadingPopup/LoadingPopup";
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
function Homepage() {
  const leftBoxText = [
    "This website allows you to view more information on natural events, as well as recent near misses.",
    "You may navigate the site using the menu, and may view more information about the current page using the info button.",
  ];
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="homepage-title">NASA Visualiser</div>
        </motion.div>

        <div className="content-wrapper">
          <div className="content-row">
            <div className="left-box">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {" "}
                <h4>Welcome to the NASA Visualiser!</h4>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {leftBoxText.map((text, index) => (
                  <p>
                    <FaRocket size={"1.5rem"}/>
                    {"   "}
                    {text}
                  </p>
                ))}
              </motion.div>
            </div>
            <div className="right-box">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
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
              </motion.div>
            </div>
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
