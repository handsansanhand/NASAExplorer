import Slider from "@mui/material/Slider";
import "react-range-slider-input/dist/style.css";
import "./CustomSlider.css";
//a slider which should be from 0->90 and have intervals of 10
function CustomSlider({ onValueCommit }) {
  const marks = Array.from({ length: 10 }, (_, i) => ({
    value: i * 10,
    label: `${i * 10}`,
  }));

  function handleChangeCommited(event, value) {
    if (onValueCommit) {
      onValueCommit(value);
    }
  }
  function valuetext(value) {
    return `${value}`;
  }
  return (
    <>
     <div className="custom-slider-container">
      
      <Slider
        aria-label="Custom marks"
        defaultValue={90}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={90}
        onChangeCommitted={handleChangeCommited}
        className="custom-slider"
      />
      <h4>Filter Events by Date Range</h4>
    </div>
    </>
  );
}

export default CustomSlider;
