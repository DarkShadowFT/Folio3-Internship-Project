import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Link from "next/link";
import Title from "./Title";

// Generate Order Data
function createData(id, doctor, appointment_date, appointment_time, reason) {
  return {id, doctor, appointment_date, appointment_time, reason};
}

export default function Appointments() {
  const [rows, setrows] = useState([
    createData(0, "Mark", "16 Mar, 2019", "1:00 pm", "Fever"),
    createData(1, "John", "16 June, 2019", "1:00 pm", "Fever"),
    createData(2, "David", "10 Jan, 2020", "1:00 pm", "Fever"),
    createData(3, "Nathan", "23 Mar, 2019", "1:00 pm", "Fever"),
    createData(4, "Michael", "5 Mar, 2019", "1:00 pm", "Fever"),
  ]);

  const deleteRow = (id) => {
    alert("Are you sure you want to delete this appointment?");
    setrows(rows.filter((row) => row.id !== id));
  };

  return (
    <React.Fragment>
      <Title>Appointments</Title>
      <Link href="/booking-form">
        <Button style={{border: "2px solid black", background: "#FFFFCC", color: "black"}}>
          Create New Appointment
        </Button>
      </Link>

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
                  <Button style={{color: "purple"}}> Read</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/booking-form">
                  <Button style={{color: "blue"}}> Edit</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  style={{color: "red"}}
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
