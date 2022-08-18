import React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";
import Typography from '@mui/material/Typography';
import axios from "axios";
import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {Button, IconButton} from '@mui/material';
import {Box, TableFooter, TablePagination, useTheme} from "@mui/material";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, Delete, Edit} from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useAuth} from "../../contexts/AuthContext";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {count, page, rowsPerPage, onPageChange} = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Generate Order Data
function convertDate(original_date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let year = original_date.getFullYear();
  let month = months[original_date.getMonth()];
  let date = original_date.getDate();
  return date + " " + month + " " + year;
}

// Generate Order Data
function createData(id, appt_id, doctor, appointment_date, appointment_time, reason) {
  let appt_date = new Date(appointment_date);
  appt_date = convertDate(appt_date);

  return {id, appt_id, doctor, appt_date, appointment_time, reason};
}


export default function Appointments() {
  const [rows, setrows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const {currentUser} = useAuth();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // Get 5 most recent appointments
    (async () => {
      // API Call
      const response = await axios.get("/api/appointment/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let counter = 0;
      let data = [];
      for (let obj of response.data) {
        // console.log("obj = ", obj);
        let response = await axios.get(`/api/doctor/${obj.Doctor_ID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const docName = response.data.name;

        const time = new Date(obj.Date).toLocaleTimeString('en',
          {timeStyle: 'short', hour12: false, timeZone: 'UTC'});


        let row = createData(counter, obj._id, docName, obj.Date, time, obj.Query);
        // console.log(row);
        data.push(row);
        counter += 1;
      }
      setrows(data)
    })()
  }, [])

  const deleteRow = async (id) => {

    alert("Are you sure you want to delete this appointment?");
    setrows(rows.filter((row) => row.id !== id));
    let response = await fetch(`/api/appointment`,
      {method: 'DELETE'})
    //setStatus('Delete successful');
    const data = await response.json()

    console.log(data);
    const del_response = await axios.post('/api/sendInBlue/deletion', {email: currentUser.email})
    console.log("Deletion confirmation email response = " + del_response)
    //getAppointments(rows,setrows);
  }

  return (
    <React.Fragment>
      <br></br>
      <div>
        <Typography style={{color: 'blue', fontSize: 22}}> <b>My Appointments </b></Typography>
        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          // sx={boxDefault}
        >
          <Link href="/booking-form">
            <Button variant="outlined" color="success">
              Create New Appointment
            </Button>
          </Link>
        </Box>


      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Doctor</b>
            </TableCell>
            <TableCell>
              <b>Appointment Date</b>
            </TableCell>
            <TableCell>
              <b>Appointment Time</b>
            </TableCell>
            <TableCell>
              <b>Reason</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appt_date}</TableCell>
              <TableCell>{row.appointment_time}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>
                <Link href={{
                  pathname: '/booking-form',
                  query: {app_id: row.appt_id, action: "view"}
                }
                }>
                  <Button
                    style={{color: "white", background: "#39c0ed"}}
                    startIcon={<VisibilityIcon fontSize="inherit" size="small"/>}
                  > View</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={{
                  pathname: '/booking-form',
                  query: {app_id: row.appt_id, action: "edit"}
                }
                }>
                  <Button
                    style={{color: "white", background: "#ffa900"}}
                    startIcon={<Edit fontSize="inherit" size="small"/>}
                  >Edit</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  style={{color: "white", background: "#dc3545"}}
                  startIcon={<Delete fontSize="inherit" size="small"/>}
                  onClick={() => {
                    deleteRow(row.id);
                  }}
                >
                  {" "}
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows}}>
              <TableCell colSpan={6}/>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}