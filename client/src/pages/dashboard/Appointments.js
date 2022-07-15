import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, doctor, appointment_date, booking_date, amount, status) {
  return { id, doctor, appointment_date, booking_date, amount, status };
}

const rows = [
  createData(
    0,
    'Mark',
    '16 Mar, 2019',
    '13 Mar, 2019',
    1000,
    'Pending',
  ),
  createData(
    1,
    'John',
    '16 June, 2019',
    '15 June, 2019',
    5000,
    'Pending',
  ),
  createData(2, 'David', '10 Jan, 2020', '8 Jan, 2020', 4000, 'Cancelled'),
  createData(
    3,
    'Nathan',
    '23 Mar, 2019',
    '20 Mar, 2019',
    3000,
    'Completed',
  ),
  createData(
    4,
    'Michael',
    '5 Mar, 2019',
    '3 Mar, 2019',
    7000,
    'Pending',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Appointments() {
  return (
    <React.Fragment>
      <Title>Recent Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Doctor</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appointment_date}</TableCell>
              <TableCell>{row.booking_date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">{`${row.status}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}