import * as React from 'react';
import './NearMissesTable.css'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { retrieveNearMisses } from '../../Scripts/nearMisses';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

export default function NearMissesTable() {
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(false);    
    const [nearMisses, setNearMisses] = useState([]);
    const missArray = Object.values(nearMisses);
    const [sortConfig, setSortConfig] = useState({ key: null, ascending: true });
      useEffect(() => {
      if (Object.keys(filter).length === 0) {
      initializeDate();
    }
    }, [filter]);

    useEffect(() => {
      console.log('Filter changed:', JSON.stringify(filter, null, 2));
        const fetchNearMisses = async () => {
            setLoading(true);
            const data = await retrieveNearMisses(filter);
            const arrayData = Object.entries(data).map(([id, values]) => ({
              id,
              ...values
            }));
            setNearMisses(arrayData);
            setLoading(false);
          }
        fetchNearMisses();
    }, [filter])

    function initializeDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const finalDateToday = today.toISOString().split('T')[0];
    const finalDateYesterday = yesterday.toISOString().split('T')[0];
      setFilter({
    start_date: finalDateYesterday,
    end_date: finalDateToday,
  });
    }

//the sortConfig contains info about what column to sort and if its in ascending or descending order
function sortJSON(value) {
  let ascending = true;
  if(sortConfig.key === value) {
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
    } 
    else if (isTime(aVal) && isTime(bVal)) {
      result = aVal.localeCompare(bVal);
    } 
    else if (isNumeric(aVal) && isNumeric(bVal)) {
      result = Number(aVal) - Number(bVal);
    } 
    else {
      result = aVal.toString().localeCompare(bVal.toString());
    }
       return ascending ? result : -result;
  });
  setNearMisses(sorted);
  setSortConfig({key : value, ascending})
}

function getArrow() {
  return sortConfig.ascending ? <IoMdArrowUp /> : <IoMdArrowDown />
}

    const loadHeaders = () => {
    const missArray = Object.values(nearMisses);
    if (missArray.length === 0) return null;

    return (
      <>

        {Object.keys(missArray[0]).map((key) => (
          key !== 'id' && (
          <TableCell align="center" key={key}> 
            <Button onClick={() => sortJSON(key)}>
                {key}
                {sortConfig.key === key && (
                  getArrow()
                )}
            </Button>
          </TableCell> 
        )
        ))}
      </>
    );
    };

    //load the rows from the nearMiss json object
   const loadRows = () => {
 
  if (missArray.length === 0) return null;

  return (
 <>
      {missArray
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((value, idx) => (
          <TableRow key={idx} >
            {Object.entries(value)
              .filter(([key]) => key !== 'id')
              .map(([key, val], indx) => (
                <TableCell align="center" key={indx}>
                  {val.toString()}
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  );
}
  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //final return
  return (
    <div className='page-wrapper' >
<Paper className='table-container'>
     <TableContainer sx={{ maxHeight: 700, overflow: 'auto' }} className='table-layout'>
      <Table aria-label="near misses table" stickyHeader sx={{ tableLayout: 'fixed',}}>
        <TableHead>
          <TableRow>
            {loadHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {loadRows()}
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
        </TableBody>
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
    <Button onClick={() => setFilter({})}>clear filter</Button>
    </Paper>
    </div>   
  );
}
