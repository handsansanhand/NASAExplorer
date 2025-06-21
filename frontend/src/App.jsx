import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import "./App.css";
import Header from "./Components/Menu/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Footer/Footer";
import Eventspage from "./Pages/Events/Eventspage";
import NearMisses from "./Pages/NearMisses/NearMisses";

function App() {
  return (
    <>
      <div className="app-wrapper">
        <Router basename="/NASAExplorer">
          <Header />
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
