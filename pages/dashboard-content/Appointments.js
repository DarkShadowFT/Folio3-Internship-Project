import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

function convertDate(original_date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let year = original_date.getFullYear();
  let month = months[original_date.getMonth()];
  let date = original_date.getDate();
  // let hour = original_date.getHours();
  // let min = original_date.getMinutes();
  // let time = date + " " + month + " " + year + " " + hour + ":" + min;
   // final date with time, you can use this according your requirement
  return date + " " + month + " " + year;
}

// Generate Order Data
function createData(id, doctor, appointment_date, booking_date, amount, status) {
  let appt_date = new Date(appointment_date);
  let book_date = new Date(booking_date);
  appt_date = convertDate(appt_date);
  book_date = convertDate(book_date);
  // console.log("Appointment date = " + appt_date + ", Booking Date = " + book_date);
  return {id, doctor, appt_date, book_date, amount, status};
}

let rows = [];

// Get 5 most recent appointments
const getAppointments = async () => {
  while(rows.length > 5) {
    rows.pop();
  }

  // API Call
  const response = await fetch("/api/dashboard/", {
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

  getAppointments();

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
              <TableCell>{row.appt_date}</TableCell>
              <TableCell>{row.book_date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
