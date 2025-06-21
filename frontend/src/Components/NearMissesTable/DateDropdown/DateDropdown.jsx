import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./DateDropdown.css";
function DateDropdown({ text, changeText, changeFilter }) {
  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={text}
        size="lg"
        className="date-button"
      >
        <Dropdown.Item
          href="#/action-1"
          onClick={() => {
            changeText("Past 24 Hours");
            changeFilter("yesterday");
          }}
        >
          Past 24 Hours
        </Dropdown.Item>
        <Dropdown.Item
          href="#/action-2"
          onClick={() => {
            changeText("Past Week");
            changeFilter("week");
          }}
        >
          Past Week
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default DateDropdown;
