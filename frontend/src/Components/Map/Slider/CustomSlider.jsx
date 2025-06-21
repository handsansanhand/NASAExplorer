import Slider from "@mui/material/Slider";
import "react-range-slider-input/dist/style.css";
import "./CustomSlider.css";
//a slider which should be from 0->90 and have labels on them
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
    </>
  );
}

export default CustomSlider;
