import React, {useEffect, useState} from "react"
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Appointments from "./appointments-content/Appointments";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Copyright from "../components/copyright/copyright";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import Custom403 from "./403";
import {useRouter} from "next/router";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import cookieCutter from "cookie-cutter";
export default MyAppointments;
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mdTheme = createTheme();
let authorized = false

function MyAppointments() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()

  useEffect(() => {
    (
      async () => {
        try {
          if (currentUser){
            const idToken = cookieCutter.get('customAuthToken')            // console.log("idToken = " + idToken)
            const config = {
              headers: { Authorization: idToken },
              credentials: 'include'
            };
            const response = await axios.get(
              'http://localhost:3000/api/auth/my-appointments',
              config
            )
            if (response.status === 200) {
              // console.log("Response = " + JSON.stringify(response))
              setAuth(true)
            }
            setLoading(false)
          }
          else {
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
          setAuth(false)
        }
      }
    )();
  })
  // console.log("Auth = " + auth)
  authorized = auth

  let myAppointments = (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar>My Appointments</Navbar>
        <Sidebar/>
        
        <Box component="main">
          <Toolbar />
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Grid container spacing={3}>
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                <Appointments />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{pt: 4}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );

  if (!loading){
    if (authorized)
      return myAppointments
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
