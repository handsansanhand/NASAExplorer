import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import "./App.css";
import Menu from "./Components/Menu/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer/Footer";
import Eventspage from "./Pages/Events/Eventspage";
import NearMisses from "./Pages/NearMisses/NearMisses";

function App() {
  return (
    <>
          <div className="video-background-wrapper">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="video-background"
  >
    <source src="vecteezy_animated-flying-through-the-stars-and-blue-nebula-in-space_8078506.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  </div>
      <div className="app-wrapper">
        <Router basename="/">
          <Menu className="menu"/>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/events" element={<Eventspage />} />
              <Route path="/nearMisses" element={<NearMisses />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
