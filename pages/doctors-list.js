import React, {useEffect, useState} from "react"
import Search from './doc-list-content/search';
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

const mdTheme = createTheme();
let authorized = false

function DoctorsList() {
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
              'http://localhost:3000/api/auth/doctors-list',
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
  // console.log("Auth = " + auth)
  authorized = auth

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
            <Search/>
          </Container>
          <Container>
            <Table/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );

  if (!loading){
    if (authorized)
      return doctorsList
    else {
      return <Custom403/>
    }
  }
}

export default DoctorsList;