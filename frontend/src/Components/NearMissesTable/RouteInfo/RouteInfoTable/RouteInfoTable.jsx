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
import "./RouteInfoTable.css";
function RouteInfoTable({ path }) {
  console.log(`in table`);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
                <TableCell>Date</TableCell>
                <TableCell>Orbiting Body</TableCell>
                <TableCell>Speed (KM/H)</TableCell>
                <TableCell>Miss Distance (KM)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {path.map((element, indx) => (
                <TableRow>
                  <TableCell>{element.Date}</TableCell>
                  <TableCell>{element["Orbiting Body"]}</TableCell>
                  <TableCell>{element.Speed}</TableCell>
                  <TableCell>{element["Miss Distance"]}</TableCell>
                </TableRow>
              ))}
              {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
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
