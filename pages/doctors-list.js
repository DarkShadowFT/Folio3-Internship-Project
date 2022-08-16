import React, {useEffect, useState} from "react"
import Table from './doc-list-content/table';
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import {useRouter} from "next/router";
import {useAuth} from "../contexts/AuthContext";
import Custom403 from "./403";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import Custom401 from "./401";

const mdTheme = createTheme();

function DoctorsList() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()

  useEffect(() => {
    (
      async () => {
        try {
          if (currentUser){
            const idToken = cookieCutter.get('customAuthToken')
            const config = {
              headers: { Authorization: idToken },
            };
            const response = await axios.get(
              'http://localhost:3000/api/auth/doctors-list',
              config
            )
            if (response.status === 200) {
              // console.log("Response = " + JSON.stringify(response))
              setAuth(2)
            }
            else {
              setAuth(1)
            }
            setLoading(false)
          }
          else {
            setAuth(0)
            setLoading(false)
          }
        }
        catch (e) {
          // Refresh the idToken if expired
          if (e.response.data.code === "auth/id-token-expired"){
            const idToken = await currentUser.getIdToken(true)
            cookieCutter.set('customAuthToken', idToken)
            console.log("About to reload page")
            await router.reload()
          }
          setAuth(0)
        }
      }
    )();
  })
  // console.log("Auth = " + auth)

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
          <Container>
            <Table/>
          </Container>
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