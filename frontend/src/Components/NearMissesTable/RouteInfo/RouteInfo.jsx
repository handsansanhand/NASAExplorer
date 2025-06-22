import { useEffect, useState } from "react";
import { retrieveNearMissInformation } from "../../../Scripts/nearMisses";
import "./RouteInfo.css";
import { SelectButton } from "primereact/selectbutton";
import RouteInfoTable from "./RouteInfoTable/RouteInfoTable";

//helper component which on click, pops up and shows the provided information about an asteroids path. contains the name of the asteroid, a selectable past/future option, and a table component with all the corresponding data
function RouteInfo({ id }) {
  const [status, setStatus] = useState("past");
  const [asteroidPastPath, setAsteroidPastPath] = useState([]);
  const [asteroidFuturePath, setAsteroidFuturePath] = useState([]);
  const [asteroidName, setAsteroidName] = useState("");
  //when loaded (useEffect) needs to fetch the data from the api
  useEffect(() => {
    console.log(`getting infdo`);
    const fetchNearMissInformation = async () => {
      const data = await retrieveNearMissInformation(id);
      setAsteroidName(data.name);
      setAsteroidPastPath(data.pastPath);
      setAsteroidFuturePath(data.futurePath);
    };
    fetchNearMissInformation();
  }, []);

  const active = [
    {
      status: "past",
      title: "Past",
    },
    {
      status: "future",
      title: "Future",
    },
  ];
  //need to specify that if nothing is picked, i.e the user has clicked out, dont toggle anything
  const handleStatusChange = (e) => {
    if (e.value) {
      setStatus(e.value.status);
    } else {
      //setStatus("open");
    }
  };

  //need a way of getting the current path, if its past, give the table the past route, else do future
  const currentPath = status === "past" ? asteroidPastPath : asteroidFuturePath;
  return (
    <>
      <div className="route-info">
        {/*Displayed content for the asteroid with the id*/}
        <div className="table-wrapper">
          <h2>Name: {asteroidName}</h2>
          <div className="button-wrapper">
            <SelectButton
              value={active.find((opt) => opt.status === status)}
              onChange={handleStatusChange}
              options={active}
              itemTemplate={(option) => (
                <span className={`status-${option.status}`}>
                  {option.title}
                </span>
              )}
              optionLabel="title"
              className="time-select-button"
            />
          </div>
          <RouteInfoTable path={currentPath} />
        </div>
      </div>
    </>
  );
}

export default RouteInfo;
