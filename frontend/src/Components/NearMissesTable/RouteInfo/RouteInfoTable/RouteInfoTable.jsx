import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import "./RouteInfoTable.css";
import "../../NearMissesTable.css";
import LoadingPopup from "../../../LoadingPopup/LoadingPopup";

//recieves in a path, displays a table containing all info from that path
function RouteInfoTable({ path }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [localPath, setLocalPath] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
  const [loading, setLoading] = useState(false);
  //whenever a change in path is detected, we need to update the local cached one
  useEffect(() => {
    setLoading(true);
    //have to make sure the loading bar actually appears for a bit
    const timer = setTimeout(() => {
      setLocalPath(path);
      setSortConfig({ key: null, ascending: true });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [path]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //the sortConfig contains info about what column to sort and if its in ascending or descending order
  function sortJSON(value) {
    let ascending = true;
    if (sortConfig.key === value) {
      ascending = !sortConfig.ascending;
    }
    //have to manually check if its a date, time, or number, string will be the base case
    const sorted = [...localPath].sort((a, b) => {
      const aVal = a[value];
      const bVal = b[value];

      const isDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);
      const isTime = (str) => /^\d{2}:\d{2}$/.test(str);
      const isNumeric = (val) => !isNaN(Number(val));

      let result = 0;
      //compare
      if (isDate(aVal) && isDate(bVal)) {
        result = new Date(aVal) - new Date(bVal);
      } else if (isTime(aVal) && isTime(bVal)) {
        result = aVal.localeCompare(bVal);
      } else if (isNumeric(aVal) && isNumeric(bVal)) {
        result = Number(aVal) - Number(bVal);
      } else {
        result = aVal.toString().localeCompare(bVal.toString());
      }
      return ascending ? result : -result;
    });
    setLocalPath(sorted);
    setSortConfig({ key: value, ascending });
  }
  function getArrow() {
    return sortConfig.ascending ? (
      <IoMdArrowUp size={20} />
    ) : (
      <IoMdArrowDown size={20} />
    );
  }
  const headers = ["Date", "Orbiting Body", "Speed", "Miss Distance"];
  return (
    <>
      {loading && <LoadingPopup text={"Loading Path Information..."} />}
      <Paper className="table-container">
        <TableContainer
          sx={{ height: 600, overflow: "auto" }}
          className="table-layout"
        >
          <Table aria-label="route info table" stickyHeader>
            <TableHead>
              <TableRow sx={{ height: 50 }}>
                {headers.map((key) => (
                  <TableCell key={key}>
                    <Button
                      onClick={() => sortJSON(key)}
                      className="header-button-route"
                    >
                      {key}
                      {sortConfig.key === key && getArrow()}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {localPath.map((element, indx) => (
                <TableRow>
                  <TableCell>{element.Date}</TableCell>
                  <TableCell>{element["Orbiting Body"]}</TableCell>
                  <TableCell>{element.Speed}</TableCell>
                  <TableCell>{element["Miss Distance"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={path.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default RouteInfoTable;
