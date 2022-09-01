import React, {useEffect, useState} from "react";
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
import {Pie, Bar} from "react-chartjs-2";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import Custom403 from "./403";
import Custom401 from "./401";
import authHelper from "../utils/authHelper"
import dynamic from 'next/dynamic'
import {Suspense} from 'react'
import Layout from '../components/Layout'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Appointments = dynamic(() => import('./dashboard-content/Appointments'), {
  suspense: true,
})

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
  const {currentUser, IDToken} = useAuth();
  const [pie_chart_data, setPieChartData] = useState([])
  const [yearlyData, setYearlyData] = useState([[], [], []])

  // Fetching current month's appointment to be displayed in pie chart
  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/appointment/month')
      let completed_count = 0
      let pending_count = 0
      let cancelled_count = 0
      console.log("Response.data = " + JSON.stringify(response))
      for (let appt of response.data) {
        console.log("appt type = " + JSON.stringify(appt.Status))
        if (appt.Status === "Completed") {
          completed_count += 1
        } else if (appt.Status === "Cancelled") {
          cancelled_count += 1
        } else if (appt.Status === "Pending") {
          pending_count += 1
        }
      }
      console.log("Returning " + [completed_count, pending_count, cancelled_count]);
      setPieChartData([completed_count, pending_count, cancelled_count])
    })()
  }, [])

  // Fetching 7-year appointments
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/appointment/year`)
      const least_year = new Date().getFullYear() - 6
      const statuses = ["Cancelled", "Completed", "Pending"]
      let count = 0
      for (let i = least_year; i < least_year + 7; i++) {
        if (response.data[count]._id.date === i) {
          let copy = [...yearlyData]
          for (let j = 0; j < statuses.length; j++) {
            if (response.data[count]._id.status === statuses[j]) {
              copy[j].push(response.data[count].count)
            } else {
              copy[j].push(0)
            }
            count += 1
          }
          setYearlyData(copy)
        } else {
          let copy = [...yearlyData]
          copy[0].push(0)
          copy[1].push(0)
          copy[2].push(0)
          setYearlyData(copy)
        }
      }
      // if (appt._id.status === "Completed") {
      //   setAttended(oldArray => [...oldArray, appt.count])
      // } else if (appt._id.status === "Cancelled") {
      //   setCancelled(oldArray => [...oldArray, appt.count])
      // } else if (appt._id.status === "Pending") {
      //   setPending(oldArray => [...oldArray, appt.count])
      // }
    })()
  }, [])

  // Authorizing user
  useEffect(() => {
    authHelper({
      currentUser: currentUser, API_URL: '/api/auth/dashboard', IDToken: IDToken,
      setAuth: setAuth, setLoading: setLoading
    })
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
        data: yearlyData[1].map((appt) => appt),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "Pending",
        data: yearlyData[2].map((appt) => appt),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Cancelled",
        data: yearlyData[0].map((appt) => appt),
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
    ],
  };

  let dashboard = (
    <ThemeProvider theme={mdTheme}>
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
                  <Pie data={pie_data} width="300px" options={{maintainAspectRatio: false}}/>
                  <Bar data={data} width={"10%"} options={options}/>
                </div>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                <Suspense fallback={`Loading...`}>
                  <Appointments/>
                </Suspense>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright sx={{pt: 2}}/>
      </Box>
    </ThemeProvider>
  );

  if (!loading) {
    if (auth === 0)
      return <Custom401/>
    else if (auth === 1)
      return <Custom403/>
    else
      return dashboard
  }
}

DashboardContent.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <Navbar>Dashboard</Navbar>
        <Sidebar/>
        {page}
      </Box>
    </Layout>
  )
}
