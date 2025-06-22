import { Infinity } from "ldrs/react";
import './LoadingPopup.css';

function LoadingPopup({ text }) {
  return (
    <>
      <div className="loading-overlay">
        <p>{text}</p>
        <Infinity size="120" stroke="5" speed="1.5" color="#fc3c23" />
      </div>
    </>
  );
}

export default LoadingPopup;
