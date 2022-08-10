import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Appointments from "./dashboard-content/Appointments";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Copyright from "../components/copyright/copyright";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Pie, Bar} from "react-chartjs-2";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {useRouter} from "next/router";
import Custom403 from "./403";
import Custom401 from "./401";
import cookieCutter from 'cookie-cutter'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "No of Appointments",
      },
    },
  },
  maintainAspectRatio: false,
};

const labels = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];

const mdTheme = createTheme();

export default function DashboardContent() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()
  const [pie_chart_data, setPieChartData] = useState([])
  const [attended, setAttended] = useState([])
  const [pending, setPending] = useState([])
  const [cancelled, setCancelled] = useState([])

  // Fetching current month's appointment to be displayed in pie chart
  useEffect(() => {
    (async() => {
      const response = await axios.get('/api/dashboard/month')
      let completed_count = 0
      let pending_count = 0
      let cancelled_count = 0
      // console.log("Response.data = " + JSON.stringify(response))
      for (let appt of response.data){
        // console.log("appt type = " + JSON.stringify(appt.Status))
        if (appt.Status === "Completed"){
          completed_count += 1
        }
        else if (appt.Status === "Cancelled"){
          cancelled_count += 1
        }
        else if (appt.Status === "Pending"){
          pending_count += 1
        }
      }
      // console.log("Returning " + [completed_count, pending_count, cancelled_count]);
      setPieChartData([completed_count, pending_count, cancelled_count])
    })()
  }, [])

  // Fetching 7-year appointments
  useEffect(() => {
    (async() => {
      const date = new Date()
      const currentYear = date.getFullYear() - 6
      for (let i = currentYear; i < currentYear + 7; i++){
        const response = await axios.get(`/api/dashboard/${i}`)

        let completed_count = 0
        let pending_count = 0
        let cancelled_count = 0
        for (let appt of response.data){
          if (appt.Status === "Completed"){
            completed_count += 1
          }
          else if (appt.Status === "Cancelled"){
            cancelled_count += 1
          }
          else if (appt.Status === "Pending"){
            pending_count += 1
          }
        }

        setAttended(oldValue => [...oldValue, completed_count])
        setPending(oldValue => [...oldValue, pending_count])
        setCancelled(oldValue => [...oldValue, cancelled_count])
      }
    })()
  }, [])

  // Authorizing user
  useEffect(() => {
    (async() => {
      try {
        if (currentUser) {
          // const idToken = await currentUser.getIdToken(true)
          const idToken = cookieCutter.get('customAuthToken')
          const config = {
            headers: {
              Authorization: idToken}
            };
          const response = await axios.get(
            'http://localhost:3000/api/auth/dashboard',
            config
          )
          if (response.status === 200) {
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
        setLoading(false)
        // console.log(e)

        // Refresh the idToken if expired
        if (e.response.data.code === "auth/id-token-expired"){
          const idToken = await currentUser.getIdToken(true)
          cookieCutter.set('customAuthToken', idToken)
          console.log("About to reload page")
          await router.reload()
        }
        setAuth(0)
      }
    })()
  }, [])
  // console.log("Auth = " + auth)

  const pie_data = {
    labels: ["Attended", "Pending", "Cancelled"],
    datasets: [
      {
        label: "# of Appointments in Current Month",
        data: pie_chart_data,
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Attended",
        data: attended.map((appt) => appt),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Pending",
        data: pending.map((appt) => appt),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Cancelled",
        data: cancelled.map((appt) => appt),
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
    ],
  };

  let dashboard = (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar>Dashboard</Navbar>
        <Sidebar />
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
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    height: 250,
                  }}
                >
                  <div style={{display: "flex", width: "45%"}}>
                    <Pie data={pie_data} width="300px" options={{maintainAspectRatio: false}} />
                    <Bar data={data} width={"10%"} options={options} />
                  </div>
                </Paper>
              </Grid>
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
    if (auth === 0)
      return <Custom401/>
    else if (auth === 1)
      return <Custom403/>
    else
      return dashboard
  }
}
