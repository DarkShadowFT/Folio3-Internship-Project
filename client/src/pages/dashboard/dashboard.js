import React, {useState} from "react";
import {Alert, Box, Button, Card, Divider} from "@mui/material";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {mainListItems, secondaryListItems} from "./listItems";
import Appointments from "./Appointments";
import Drawer from "../../components/Drawer/Drawer";
import Navbar from "../../components/Navbar/Navbar"
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";
import {faker} from "@faker-js/faker";

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
    }
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
        text: 'Year'
      }
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: 'No of Appointments'
      }
    },
  },
  maintainAspectRatio: false,
};

const labels = ['2017', '2018', '2019', '2020', '2021', '2021', '2022'];

export const data = {
  labels,
  datasets: [
    {
      label: "Attended",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: 'Pending',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    },
    {
      label: 'Cancelled',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: 'rgba(53, 162, 235, 0.8)',
    },
  ],
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Find Me A Doctor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 250;

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [error, setError] = useState("");
  const {currentUser, logout} = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar/>
        <Drawer/>
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
            {error && <Alert variant="danger">{error}</Alert>}
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
}

export default function Dashboard() {
  return <DashboardContent />;
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
