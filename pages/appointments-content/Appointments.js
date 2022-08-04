import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Link from "next/link";
import Title from "./Title";
import Typography from '@mui/material/Typography';

// Generate Order Data
function createData(id, doctor, appointment_date, appointment_time, reason) {
  return {id, doctor, appointment_date, appointment_time, reason};
}


const getAppointments = async (rows) => {
  while(rows.length) {
    rows.pop();
  }

  // API Call
  const response = await fetch("/api/my-appointments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  let counter = 0;
  for (let obj of json) {
    // console.log("obj = ", obj);
    let response = await fetch(`/api/doctor/${obj.Doctor_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const docName = await response.json();

    let row = createData(counter, docName, obj.Date, obj.Booking_Date, obj.Fee, obj.Status);
    // console.log("row = ", row);
    rows.push(row);
    counter += 1;
  }
  // console.log(rows);
};


export default function Appointments() {
  const [rows, setrows] = useState([ ]);

  const deleteRow = (id) => {
    alert("Are you sure you want to delete this appointment?");
    setrows(rows.filter((row) => row.id !== id));
  };
  getAppointments(rows);
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
              <TableCell>{row.appointment_date}</TableCell>
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
