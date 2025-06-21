import { Button as BootstrapButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomButton.css"; // your custom styles

function CustomButton({ text, onClick }) {
  return (
    <BootstrapButton className="custom-button" onClick={onClick}>
      {text}
    </BootstrapButton>
  );
}
export default CustomButton;
