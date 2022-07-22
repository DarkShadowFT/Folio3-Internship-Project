import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Avatar from '@mui/material/Avatar';
// import Rating from '@mui/material/Rating';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData( name, specialization, fee, availability, action) {
  return { name, specialization, fee, availability, action };
}

const rows = [
  createData('Dr.Abdullah', 'Ear Specialist', '$300', 'Monday,Friday(2pm-4pm) '),
  createData('Dr.Aliyan', 'Eye Specialist', '$250', 'Tuesday(8am-2pm)'),
  createData('Dr.Sufyan', 'Heart Specialist', '$400', 'Saturday,Sunday(2pm-6pm'),
  createData('Dr.Saqib', 'Child Specialist', '$290', 'Sunday(7am-6pm)'),
  createData('Dr.Misbah', 'Orthopedic Surgeon', '$300', 'Monday(10pm-12am)'),
  createData('Dr.Nouman',  'Family physician', '$400', 'Wednesday(2pm-5pm)')
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="center">Doctor Name</TableCell>
            <TableCell align="center">Doctor Specialization</TableCell>
            <TableCell align="center">Appointment Fee</TableCell>
            <TableCell align="center">Availability</TableCell>
            {/* <TableCell align="middle">Location</TableCell> */}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
      
        <TableBody>
          {rows.map((row) => (
            <TableRow

              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="center">{<Avatar
                  alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  sx={{ width: 90, height:90 }}
              />} </TableCell>
              
               {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
              <TableCell component="th" scope="row">
                {row.name}
                
              </TableCell>
              
              <TableCell align="center">{row.specialization} </TableCell>
              <TableCell align="center">{row.fee}</TableCell>
              <TableCell align="center">{row.availability}</TableCell>
              {/* <TableCell align="middle">{row.protein}</TableCell> */}
              <TableCell align="center">{row.action}<Button variant="contained">Book Appointment</Button></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}