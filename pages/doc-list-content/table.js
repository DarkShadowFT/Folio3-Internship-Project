import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import axios from "axios";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {Avatar, Paper, Button, TextField, IconButton, Container} from '@mui/material';
import {Box, TableFooter, TablePagination, useTheme} from "@mui/material";
import {Search, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from '@mui/icons-material';


function createData(id, name, specialization, fee, day_availability, time_availability, action) {
  return {id, name, specialization, fee, day_availability, time_availability, action};
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
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

export default function BasicTable() {
  const [rows, setRows] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const populateTable = async (response) => {
    let counter = 0;
    let data = [];
    for (let obj of response.data) {
      // console.log("obj = ", obj);
      let response = await axios.get(`/api/doctor/${obj._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const docName = response.data;
      // let availability = obj.Days_available + </br> + obj.Slots_available;
      // console.log("Availability = " + availability)

      const row = createData(counter, docName, obj.Specialization, obj.Fee, obj.Days_available, obj.Slots_available);
      // console.log("row = ", row);
      data.push(row);
      counter += 1;
    }
    setRows(data)
  }

  const searchDoctor = (e) => {
    setSearchQuery(e.target.value)
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const response = await axios.post("/api/doctor/specialization", {searchQuery});
    await populateTable(response)
  }

  useEffect(() => {
    // Get doctor(s) matching the entered specialization
    (async () => {
      const response = await axios.post("/api/doctor/specialization", {searchQuery});
      await populateTable(response)
    })()
  }, [searchQuery])

  useEffect(() => {
    // Get doctors list
    (async () => {
      // API Call
      const response = await axios.get("/api/doctor", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await populateTable(response)
    })()
  }, [])

  return (
    <>
    <Container style={{
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 20,
    }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20
        }}
      >
        <form align='center' onSubmit={handleSubmit}>
          <TextField
            id="search-bar"
            className="text"
            label="Enter Doctor's specialization..."
            variant="outlined"
            value={searchQuery}
            onChange={searchDoctor}
            size="small"
            sx={{ width: 500 }}
            component={Paper}
          />
          <IconButton aria-label="search">
            <Search style={{ fill: "blue" }} />
          </IconButton>
        </form>
      </div>
    </Container>
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Doctor Name</TableCell>
            <TableCell align="center">Doctor Specialization</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Availability</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell align="center">
                {<Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{width: 90, height: 90}}
                />}
              </TableCell>

              {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.specialization} </TableCell>
              <TableCell align="center">{row.fee}</TableCell>
              <TableCell align="center">
                {`${row.day_availability}`}
                {' at '}
                {`${row.time_availability}`}
              </TableCell>
              <TableCell align="center">
                {row.action}
                <Link href="/booking-form">
                  <Button variant="contained">
                    Book Appointment
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
    </TableContainer>
    </>
  );
}