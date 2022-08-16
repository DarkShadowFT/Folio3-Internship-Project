import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from 'next/link'
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function createData(id, name, specialization, fee, day_availability, time_availability, action) {
  return {id, name, specialization, fee, day_availability, time_availability, action};
}

export default function BasicTable() {
  const [rows, setRows] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

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
    <Paper style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <form align='center' onSubmit={handleSubmit}>
        <TextField
          id="search-bar"
          className="text"
          label="Enter Doctor's specialization"
          variant="outlined"
          value={searchQuery}
          onChange={searchDoctor}
          size="small"
          sx={{ width: 250 }}
        />
        <IconButton aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </Paper>
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
          {rows.map((row) => (
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
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}