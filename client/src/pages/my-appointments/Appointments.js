import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {mainListItems} from "../../pages/my-appointments/labelslist";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import List from "@mui/material/List";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Title from './Title';

// Generate Order Data
function createData(id, doctor, appointment_date,appointment_time, reason) {
  return { id, doctor, appointment_date, appointment_time, reason };
}
 
export default function Appointments() {

  const [rows,setrows] = useState([
    createData(
      0,
      'Mark',
      '16 Mar, 2019',
      '1:00 pm',
      'Fever',
    ),
    createData(
      1,
      'John',
      '16 June, 2019',
      '1:00 pm',
      'Fever',
    ),
    createData(
      2,
      'David', 
      '10 Jan, 2020', 
      '1:00 pm',
      'Fever',
    ),
    createData(
      3,
      'Nathan',
      '23 Mar, 2019',
      '1:00 pm',
      'Fever',
    ),
    createData(
      4,
      'Michael',
      '5 Mar, 2019',
      '1:00 pm',
      'Fever',
    ),
  ]); 

  const deleteRow =(id) => {
      alert("Areyou sure, You want to Delete this Appointment?");
    setrows(rows.filter(row =>row.id!== id))
  }

  return (

    <React.Fragment>
      <Title>Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Doctor</b></TableCell>
            <TableCell><b>Appointment Date</b></TableCell>
            <TableCell><b>Appointment Time</b></TableCell>
            <TableCell><b>Reason</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appointment_date}</TableCell>
              <TableCell>{row.appointment_time}</TableCell>
              <TableCell>{row.reason}</TableCell>
              <TableCell>  
                
                  <Link to="../BookingForm">
                    <Button style={{ color: "purple" }}> Read</Button>
                  </Link>
              </TableCell>
              <TableCell>
                  <Link to="../BookingForm">
                    <Button style={{ color: "blue" }}> Edit</Button>
                  </Link>
              </TableCell>
              <TableCell>
                  <Button style={{ color: "red" }} onClick={() => {deleteRow(row.id)}} > Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}