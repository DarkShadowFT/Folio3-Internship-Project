import React, {useEffect, useState} from "react"
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import {useRouter} from "next/router";
import {useAuth} from "../contexts/AuthContext";
import Custom403 from "./403";
import axios from "axios";
// import cookieCutter from "cookie-cutter";
import Custom401 from "./401";
import dynamic from 'next/dynamic'
import {Suspense} from 'react'
import Copyright from "../components/Copyright";
import authHelper from "../utils/authHelper";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const DynamicComponent = dynamic(() => import('./doc-list-content/table'), {
  suspense: true,
})

const mdTheme = createTheme();

function DoctorsList() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const {currentUser, IDToken} = useAuth();

  useEffect(() => {
    authHelper({
      currentUser: currentUser, API_URL: '/api/auth/doctors-list', IDToken: IDToken,
      setAuth: setAuth, setLoading: setLoading
    })
  })

  let doctorsList = (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <Navbar>Doctors List</Navbar>
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
          <Toolbar/>
          <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{p: 0, display: "flex", flexDirection: "column"}}>
                  <Suspense fallback={<Paper sx={{p: 2}}>{`Loading...`}</Paper>}>
                    <DynamicComponent/>
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
      return doctorsList
    }
  }
}

export default DoctorsList;