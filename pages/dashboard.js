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
import {Pie} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";
import {faker} from "@faker-js/faker";
import {useAuth} from "../contexts/AuthContext";
import axios from "axios";
import {useRouter} from "next/router";
import Custom403 from "./403";
import cookieCutter from 'cookie-cutter'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const pie_data = {
  labels: ["Attended", "Pending", "Cancelled"],
  datasets: [
    {
      label: "# ",
      data: [12, 4, 2],
      backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

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

const labels = ["2017", "2018", "2019", "2020", "2021", "2021", "2022"];

export const data = {
  labels,
  datasets: [
    {
      label: "Attended",
      data: labels.map(() => faker.datatype.number({min: 0, max: 50})),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Pending",
      data: labels.map(() => faker.datatype.number({min: 0, max: 10})),
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    {
      label: "Cancelled",
      data: labels.map(() => faker.datatype.number({min: 0, max: 20})),
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
  ],
};

const mdTheme = createTheme();
let authorized = false

export default function DashboardContent() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()

  useEffect(() => {
    (async() => {
      try {
        if (currentUser) {
          // const idToken = await currentUser.getIdToken(true)
          const idToken = cookieCutter.get('customAuthToken')
          const config = {
            headers: {Authorization: idToken},
            credentials: 'include'
          };
          const response = await axios.get(
            'http://localhost:3000/api/auth/dashboard',
            config
          )
          if (response.status === 200) {
            // console.log("Response = " + JSON.stringify(response))
            setAuth(true)
          }
          setLoading(false)
        } else {
          await router.replace("/login")
        }
      }
      catch (e) {
        setAuth(false)
      }
    })()
  }, [])
  // console.log("Auth = " + auth)
  authorized = auth

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
    if (authorized)
      return dashboard
    else
      return <Custom403/>
  }
}
