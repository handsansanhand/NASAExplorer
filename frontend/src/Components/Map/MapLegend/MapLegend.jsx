import CustomButton from "../../CustomButton/CustomButton";
import { SelectButton } from "primereact/selectbutton";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import "./MapLegend.css";
/*this needs to show all
Categories (you can click more or one)
Status (OPEN OR CLOSED)
*/
function MapLegend({ updateFilter }) {
  const categories = [
    { id: 6, title: "Drought", className: "drought" },
    { id: 7, title: "Dust and Haze", className: "dust" },
    { id: 16, title: "Earthquakes", className: "earthquake" },
    { id: 9, title: "Floods", className: "flood" },
    { id: 14, title: "Landslides", className: "landslide" },
    { id: 19, title: "Manmade", className: "manmade" },
    { id: 15, title: "Sea and Lake Ice", className: "ice" },
    { id: 10, title: "Severe Storms", className: "storm" },
    { id: 17, title: "Snow", className: "snow" },
    { id: 18, title: "Temperature Extremes", className: "temperature" },
    { id: 12, title: "Volcanoes", className: "volcano" },
    { id: 13, title: "Water Color", className: "water-color" },
    { id: 8, title: "Wildfires", className: "wildfire" },
  ];
  const active = [
    {
      status: "open",
      title: "Open",
    },
    {
      status: "closed",
      title: "Closed",
    },
  ];
  const [status, setStatus] = useState("open");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (e) => {
    console.log(`changes to ${e}`);
    setSelectedCategory(e.value);
    updateFilter({ category: e.value?.id });
  };
  const handleStatusChange = (e) => {
    if (e.value) {
      console.log(`Status changed to ${e.value.status}`);
      setStatus(e.value.status);
      updateFilter({ status: e.value.status });
    } else {
      setStatus("open");
      updateFilter({ status: "open" });
    }
  };

  return (
    <div className="map-legend">
      <h4>Filter By Status</h4>
      <SelectButton
        value={active.find((opt) => opt.status === status)}
        onChange={handleStatusChange}
        options={active}
        itemTemplate={(option) => (
          <span className={`status-${option.status}`}>{option.title}</span>
        )}
        optionLabel="title"
        className="horizontal-select-button"
      />
      <h4>Filter By Event</h4>
      <SelectButton
        value={selectedCategory}
        options={categories}
        onChange={handleCategoryChange}
        optionLabel="title"
        itemTemplate={(option) => <span>{option.title}</span>}
        multiple={false}
        className="vertical-select-button"
      />
    </div>
  );
}
export default MapLegend;
