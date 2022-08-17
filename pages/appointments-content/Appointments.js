import React from "react";
import {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Link from "next/link";
import Title from "./Title";
import Typography from '@mui/material/Typography';
import { object } from "yup";
import axios from "axios";

// Generate Order Data
function convertDate(original_date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let year = original_date.getFullYear();
  let month = months[original_date.getMonth()];
  let date = original_date.getDate();
  return date + " " + month + " " + year;
}

// Generate Order Data
function createData(id, doctor, appointment_date, appointment_time, reason) {
  let appt_date = new Date(appointment_date);
  appt_date = convertDate(appt_date);
  
   return {id, doctor, appt_date, appointment_time, reason};
}


const getAppointments = async (rows,setrows) => {
  /*while(rows.length) {
    //rows.pop();
  }*/

  useEffect(() => {
    // Get 5 most recent appointments
    (async() => {
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
        { timeStyle: 'short', hour12: false, timeZone: 'UTC' });


        let row = createData(counter, docName, obj.Date, time, obj.Query);
        console.log(row);
        data.push(row);
        counter += 1;
      }
      setrows(data)
    })()
  }, [])
  return rows
};


export default function Appointments() {
  const [rows, setrows] = useState([ ]);

  getAppointments(rows,setrows);
  const deleteRow = async (id) => {

    alert("Are you sure you want to delete this appointment?");
    setrows(rows.filter((row) => row.id !== id));
    let response = await fetch(`/api/appointment`,
     { method: 'DELETE' })
        //setStatus('Delete successful');
    const data=await response.json()
    
    console.log(data);
    //getAppointments(rows,setrows);
  }
  
  return (
    <React.Fragment>
    <br></br>
    <div>
    <Typography  style={{color: 'blue', fontSize: 22}}> <b>My Appointments  </b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    &nbsp; &nbsp; 
     <Button  variant="outlined" color="success" href="/booking-form">
        Create New Appointment
      </Button>
      </Typography>
    
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appt_date}</TableCell>
              <TableCell>{row.appointment_time}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>
                <Link href="/booking-form">
                  <Button style={{color: "white", background: "purple"}}> View</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/booking-form">
                  <Button style={{color: "white", background: "blue"}}> Edit</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  style={{color: "white", background: "#ba0001"}}
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
        </TableBody>
      </Table>
    </React.Fragment>
  );
}