import CustomButton from "../../CustomButton/CustomButton";
import { Button as BootstrapButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InfoButton.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
function InfoButton({ onClick }) {
  return (
    <>
      <BootstrapButton
        text={"Information"}
        className="info-button"
        onClick={onClick}
      >
        <IoMdInformationCircleOutline />
      </BootstrapButton>
    </>
  );
}

export default InfoButton;
