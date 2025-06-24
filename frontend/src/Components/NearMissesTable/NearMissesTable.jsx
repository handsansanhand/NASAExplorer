import * as React from "react";
import "./NearMissesTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { retrieveNearMisses } from "../../Scripts/nearMisses";
import RouteInfo from "./RouteInfo/RouteInfo";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import DateDropdown from "./DateDropdown/DateDropdown";
import LoadingPopup from "../LoadingPopup/LoadingPopup";

export default function NearMissesTable() {
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [nearMisses, setNearMisses] = useState([]);
  const missArray = Object.values(nearMisses);
  const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
  useEffect(() => {
    setLoading(true);
    if (Object.keys(filter).length === 0) {
      initializeDate();
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    console.log("Filter changed:", JSON.stringify(filter, null, 2));
    const fetchNearMisses = async () => {
      setLoading(true);
      const data = await retrieveNearMisses(filter);
      const arrayData = Object.entries(data).map(([id, values]) => ({
        id,
        ...values,
      }));
      setNearMisses(arrayData);
      setLoading(false);
    };
    fetchNearMisses();
  }, [filter]);

  function initializeDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const finalDateToday = today.toISOString().split("T")[0];
    const finalDateYesterday = yesterday.toISOString().split("T")[0];
    setFilter({
      start_date: finalDateYesterday,
      end_date: finalDateToday,
    });
  }

  //the sortConfig contains info about what column to sort and if its in ascending or descending order
  function sortJSON(value) {
    let ascending = true;
    if (sortConfig.key === value) {
      ascending = !sortConfig.ascending;
    }
    //have to manually check if its a date, time, or number, string will be the base case
    const sorted = [...nearMisses].sort((a, b) => {
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
    setNearMisses(sorted);
    setSortConfig({ key: value, ascending });
  }

  function getArrow() {
    return sortConfig.ascending ? (
      <IoMdArrowUp size={20} />
    ) : (
      <IoMdArrowDown size={20} />
    );
  }

  const loadHeaders = () => {
    const missArray = Object.values(nearMisses);
    if (missArray.length === 0) return null;

    return (
      <>
        <TableCell sx={{ width: 50 }} key="headers" align="center">
          <Button className="header-button"> Path</Button>
        </TableCell>
        {Object.keys(missArray[0]).map(
          (key) =>
            key !== "id" && (
              <TableCell align="center" key={key}>
                <Button onClick={() => sortJSON(key)} className="header-button">
                  {key}
                  {sortConfig.key === key && getArrow()}
                </Button>
              </TableCell>
            )
        )}
      </>
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsteroidId, setSelectedAsteroidId] = useState(null);
  const handleToggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenModal = (id) => {
    setSelectedAsteroidId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAsteroidId(null);
  };
  //load the rows from the nearMiss json object
  const loadRows = () => {
    if (missArray.length === 0) return null;
    return (
      <>
        {missArray
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((value, idx) => (
            <React.Fragment key={value.id}>
              <TableRow key={idx} sx={{ height: 40 }}>
                <TableCell className="sticky-column-body">
                  <Button
                    aria-label="path information"
                    size="small"
                    onClick={() => handleOpenModal(value.id)}
                    className="view-path-button"
                  >
                    View
                  </Button>
                </TableCell>

                {Object.entries(value)
                  .filter(([key]) => key !== "id")
                  .map(([key, val], indx) => (
                    <TableCell
                      align="center"
                      key={indx}
                      sx={{ border: "1px solid #ccc" }}
                    >
                      {val.toString()}
                    </TableCell>
                  ))}
              </TableRow>
            </React.Fragment>
          ))}
      </>
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [text, setText] = useState("Past 24 Hours");

  function changeFilter(dateText) {
    const today = new Date();
    let targetDate = new Date(today);
    // let date = dateToday.toISOString().split('T')[0];
    if (dateText === "yesterday") {
      targetDate.setDate(today.getDate() - 1);
    } else {
      targetDate.setDate(today.getDate() - 7);
    }
    const finalTargetDate = targetDate.toISOString().split("T")[0];
    setFilter((prev) => ({
      ...prev,
      start_date: finalTargetDate,
    }));
    setSortConfig({ key: null, ascending: true });
  }
  //final return
  return (
    <>
      {loading && <LoadingPopup text={"Loading Data..."} />}

      <div className="page-wrapper">
        <DateDropdown
          text={text}
          changeText={setText}
          changeFilter={changeFilter}
        />
        <Paper className="table-container">
          <TableContainer
            sx={{ height: "70vh", overflow: "auto" }}
            className="table-layout"
          >
            <Table aria-label="near misses table" stickyHeader>
              <TableHead>
                <TableRow sx={{ height: 50 }}>{loadHeaders()}</TableRow>
              </TableHead>
              <TableBody>{loadRows()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={missArray.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        className="route-dialog"
      >
        <DialogContent dividers className="asteroid-path-content">
          {selectedAsteroidId && <RouteInfo id={selectedAsteroidId} />}
        </DialogContent>
        <DialogActions className="asteroid-path-footer">
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
