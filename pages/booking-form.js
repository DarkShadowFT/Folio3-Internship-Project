import React, {useState} from "react";
import {Alert, Box, Button} from "@mui/material";
// import {useAuth} from "../../contexts/AuthContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Copyright from "../components/copyright/copyright";
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import TextField from "@mui/material/TextField";
import Axios from "axios";

const theme = createTheme();

function DashboardContent() {
  const [error, setError] = useState("");

  const url="http://localhost:3000/api/doctor_api"
  const[data,setData]=useState([{
    //first_name:"",
    Specialization:""

  }])
  function submit(e){
    e.preventDefault ();
    console.log("submit got clicked")
    console.log(data)
    Axios.post(url,{
      Specialization:data.Specialization
    })
    .then(res=>{
      console.log(res.data)
    })
  }
  function handle(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function sayHello() {
    alert('You clicked me!');
  }
  return (
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
          <Container  maxWidth="sm" sx={{mt: 4, mb: 2}}>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* ///////////////////////////////////////////////////////////////*/}
            <Box
              
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTextField-root": {m: 1, width: "25ch"},
                spacing: 10,
                bgcolor: "white ",
                mr:1,
                //border:1,
                //borderRadius:2,
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                width:477
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                {/* <TextField onChange={(e)=>handle(e)} required id="first_name" label="First Name" value={data.first_name}  type="text" /> */}
                <TextField required id="outlined-required" label="Last Name" type="text" defaultValue="" />
                <TextField required id="outlined-required" label="Doctor Name" type="text" defaultValue="" />
                <TextField onChange={(e)=>handle(e)} required id="Specialization" label="Doctor Specialization" value={data.Specialization} type="text"  />
                <TextField required id="outlined-required" type="date" />
                <TextField required id="outlined-required" type="time" />
                <TextField required id="outlined-required" label="Appointment Location" type="text" defaultValue="" />
                <TextField required id="outlined-required" label="Appointment Charges" type="number" defaultValue="" />
                <Button type="submit" onClick={submit} variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
                Submit
                </Button>
              </div>
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
                bgcolor: "white ",
                mr:1,
                //border:1,
                //borderRadius:2,

                width:480
              }}
            >
              <TextField required id="outlined-required" label="Email" defaultValue="" fullWidth type="email" />
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
                bgcolor: "white ",
                mr:1,
                //border:1,
                //borderRadius:2,
                borderBottomLeftRadius:10,
                borderBottomRightRadius:10,
                width:480,
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
                <Button type="submit" onClick={submit} variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
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
