import { useState } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Infinity } from "ldrs/react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import "./RouteInfoTable.css";
function RouteInfoTable({ path }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [localPath, setLocalPath] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
  //whenever a change in path is detected, we need to update the local cached one
  useEffect(() => {
    setLocalPath(path);
    setSortConfig({ key: null, ascending: true });
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
  return (
    <>
      <Paper className="table-container">
        <TableContainer
          sx={{ height: 600, overflow: "auto" }}
          className="table-layout"
        >
          <Table aria-label="near misses table" stickyHeader>
            <TableHead>
              <TableRow sx={{ height: 50 }}>
                <TableCell>
                  <Button
                    onClick={() => sortJSON("Date")}
                    className="header-button"
                  >
                    {"Date"}
                    {sortConfig.key === "Date" && getArrow()}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => sortJSON("Orbiting Body")}
                    className="header-button"
                  >
                    {"Orbiting Body"}
                    {sortConfig.key === "Orbiting Body" && getArrow()}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => sortJSON("Speed")}
                    className="header-button"
                  >
                    {"Speed"}
                    {sortConfig.key === "Speed" && getArrow()}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => sortJSON("Miss Distance")}
                    className="header-button"
                  >
                    {"Miss Distance (KM)"}
                    {sortConfig.key === "Miss Distance" && getArrow()}
                  </Button>
                </TableCell>
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
