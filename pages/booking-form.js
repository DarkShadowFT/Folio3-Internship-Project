import React, {useState, useEffect} from "react";
import {Alert, Box, Button} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Copyright from "../components/copyright/copyright";
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import TextField from "@mui/material/TextField";
import {useAuth} from "../contexts/AuthContext";
import {useRouter} from "next/router";
import axios from "axios";
import Custom403 from "./403";

const theme = createTheme();
let authorized = false

export default function BookingForm() {
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()

  useEffect(() => {
    (
      async () => {
        try {
          if (currentUser){
            const idToken = await currentUser.getIdToken(/* forceRefresh */ true)
            // console.log("idToken = " + response_token)
            const config = {
              headers: { Authorization: idToken },
              credentials: 'include'
            };
            const response = await axios.get(
              'http://localhost:3000/api/auth/booking-form',
              config
            )
            if (response.status === 200) {
              // console.log("Response = " + JSON.stringify(response))
              setAuth(true)
            }
            setLoading(false)
          }
          else {
            await router.replace("/login")
          }
        }
        catch (e) {
          setAuth(false)
        }
      }
    )();
  })
  authorized = auth

  let bookingForm = (
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
            {error && <Alert variant="danger">{error}</Alert>}
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
              <Link href="/MyAppointments">
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

  if (!loading){
    if (authorized)
      return bookingForm
    else {
      return <Custom403/>
    }
  }

}

// export default function Dashboard() {

//   return (
//     <Box>
//       <Card>
//         <Card>
//           <h2>Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <strong>Email:</strong> {currentUser.email}
//         </Card>
//       </Card>
//       <Divider />
//       <Button variant="contained" onClick={handleLogout}>
//           Log Out
//       </Button>
//     </Box>
//   )
// }
