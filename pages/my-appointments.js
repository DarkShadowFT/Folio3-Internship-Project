import React, {useEffect, useState} from "react"
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Copyright from "../components/Copyright";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import Custom403 from "./403";
import {useRouter} from "next/router";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
// import cookieCutter from "cookie-cutter";
import Custom401 from "./401";
import dynamic from 'next/dynamic'
import {Suspense} from 'react'
import authHelper from "../utils/authHelper";

const Appointments = dynamic(() => import('./appointments-content/Appointments'), {
  suspense: true,
})

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mdTheme = createTheme();

function MyAppointments() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const {currentUser, IDToken} = useAuth();

  useEffect(() => {
    authHelper({
      currentUser: currentUser, API_URL: '/api/auth/my-appointments', IDToken: IDToken,
      setAuth: setAuth, setLoading: setLoading
    })
  })

  let myAppointments = (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <Navbar>My Appointments</Navbar>
        <Sidebar/>

        <Box component="main"
             sx={{
               backgroundColor: (theme) =>
                 theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
               flexGrow: 1,
               height: "100vh",
               overflow: "auto",
             }}
        >
          <Toolbar/>
          <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{pl: 2, pr: 2, display: "flex", flexDirection: "column"}}>
                  <Suspense fallback={<Paper sx={{pb: 2, pt: 2}}>{`Loading...`}</Paper>}>
                    <Appointments/>
                  </Suspense>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Copyright sx={{pt: 2}}/>
        </Box>
      </Box>
    </ThemeProvider>
  );

  if (!loading) {
    if (auth === 0) {
      return <Custom401/>
    } else if (auth === 1) {
      return <Custom403/>
    } else {
      return myAppointments
    }
  }
}

export default MyAppointments;