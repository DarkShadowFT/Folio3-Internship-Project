import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, doctor, appointment_date,appointment_time, reason) {
  return { id, doctor, appointment_date, appointment_time, reason };
}

const rows = [
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
];



export default function Appointments() {
  return (
    <React.Fragment>
      <Title>Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Doctor</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>appointment Time</TableCell>
            <TableCell>Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appointment_date}</TableCell>
              <TableCell>{row.appointment_time}</TableCell>
              <TableCell>{row.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}