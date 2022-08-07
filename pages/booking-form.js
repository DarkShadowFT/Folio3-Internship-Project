import React, {useState} from "react";
import {Alert, Box, Button} from "@mui/material";
// import {useAuth} from "../../contexts/AuthContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Copyright from "../components/copyright/copyright";
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import TextField from "@mui/material/TextField";

const theme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar>Booking Form</Navbar>
        <Sidebar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="sm" sx={{mt: 4, mb: 2}}>
            {/* ///////////////////////////////////////////////////////////////*/}
            <Box
              component="form"
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTextField-root": {m: 1, width: "25ch"},
                spacing: 10,
                //,bgcolor: "aqua "
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField required id="outlined-required" label="First Name" defaultValue="" />
                <TextField required id="outlined-required" label="Last Name" defaultValue="" />
                <TextField required id="outlined-required" label="Doctor Name" defaultValue="" />
                <TextField required id="outlined-required" label="Doctor Specialization" defaultValue="" />
                <TextField required id="outlined-required" type="date" />
                <TextField required id="outlined-required" type="time" />
                <TextField required id="outlined-required" label="Appointment Location" defaultValue="" />
                <TextField required id="outlined-required" label="Appointment Charges" defaultValue="" />
              </div>
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
              }}
            >
              <TextField required id="outlined-required" label="Email" defaultValue="" fullWidth type="email" />
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Patient Query"
                defaultValue=""
                fullWidth
                multiline
                rows="5"
              />
            </Box>
            <Box>
              <Link href="/my-appointments">
                <Button type="submit" variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
                Submit
                </Button>
              </Link>
            </Box>
          </Container>

          <Copyright sx={{pt: 4}} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
