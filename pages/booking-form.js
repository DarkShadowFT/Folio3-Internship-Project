import React, {useState, useEffect} from "react";
import {Alert, Box, Button} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "next/link";
import Copyright from "../components/copyright/copyright";
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import TextField from "@mui/material/TextField";
import {useAuth} from "../contexts/AuthContext";
import {useRouter} from "next/router";
import axios from "axios";
import Custom403 from "./403";
import cookieCutter from "cookie-cutter";
import Custom401 from "./401";

const theme = createTheme();

export default function BookingForm() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  const router = useRouter()

  const url_doctor_api = "http://localhost:3000/api/doctor_api"
  const url_appointment_api = "http://localhost:3000/api/appointment_api"
  const [data, setData] = useState({
    first_name:"",
    last_name:"",
    email: "",
    specialization:"",
    doctor_name:"",
    Booking_Date: "",
    Time: "",
    // appointment_location:"",
    fee: "",//Appointment Chargers
    Query: ""
  })

  function submit(e) {
    e.preventDefault();
    console.log("submit got clicked")
    console.log(data)
    console.log(data.Query)
    axios.post(url_appointment_api, {
      Query: data.Query,
      Booking_Date: data.Booking_Date,
    })
      .then(res => {
        console.log(res.data)
      })
  }

  function handle(e) {
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function sayHello() {
    alert('You clicked me!');
  }

  useEffect(() => {
    (
      async () => {
        try {
          const userData = await axios.get(`/api/person/${currentUser.email}`)
          // console.log("Name = " + userData.data[0].First_Name + " " + userData.data[0].Last_Name)
          // data.first_name = userData.data[0].First_Name
          // data.last_name = userData.data[0].Last_Name
          const newData = {...data}
          newData.first_name = userData.data[0].First_Name
          newData.last_name = userData.data[0].Last_Name
          newData.email = currentUser.email

          if (router.query){
            console.log("Query Params found")
            if (router.query.docName){
              newData.doctor_name = router.query.docName
            }

            if (router.query.fee){
              newData.fee = router.query.fee
            }

            if (router.query.specialization){
              newData.specialization = router.query.specialization
            }
          }

          setData(newData)
        }
        catch(err){
          console.error(err)
        }
      }
    )();
  }, [loading])

  useEffect(() => {
    (
      async () => {
        try {
          if (currentUser) {
            // console.log("Current User = " + JSON.stringify(currentUser))
            const idToken = cookieCutter.get('customAuthToken')
            // console.log("idToken = " + response_token)
            const config = {
              headers: {Authorization: idToken},
              credentials: 'include'
            };
            const response = await axios.get(
              'http://localhost:3000/api/auth/booking-form',
              config
            )
            if (response.status === 200) {
              // console.log("Response = " + JSON.stringify(response))
              setAuth(2)
            } else {
              setAuth(1)
            }

            setLoading(false)
          } else {
            setAuth(0)
            setLoading(false)
          }
        } catch (e) {
          // Refresh the idToken if expired
          if (e.response.data.code === "auth/id-token-expired") {
            const idToken = await currentUser.getIdToken(true)
            cookieCutter.set('customAuthToken', idToken)
            console.log("About to reload page")
            await router.reload()
          }
          setAuth(0)
          setLoading(false)
        }
      }
    )();
  })

  let bookingForm = (
    <ThemeProvider theme={theme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline/>
        <Navbar>Booking Form</Navbar>
        <Sidebar/>
        <Box component="main" sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar/>
          <Container maxWidth="sm" sx={{mt: 4, mb: 2}}>
            <Container maxWidth="sm" sx={{mt: 4, mb: 2}}>
              {/* ///////////////////////////////////////////////////////////////*/}
              <Box
                component="form"
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  "& .MuiTextField-root": {m: 1, width: "25ch"},
                  spacing: 10,
                  bgcolor: "white ",
                  mr: 1,
                  //border:1,
                  //borderRadius:2,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  width: 477
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField onChange={(e) => handle(e)} required
                             id="first_name" label="First Name" value={data.first_name} type="text"/>
                  <TextField onChange={(e) => handle(e)} required
                             id="last_name" label="Last Name"
                             value={data.last_name} type="text"/>
                  <TextField onChange={(e) => handle(e)} required
                             id="doctor_name" label="Doctor Name" value={data.doctor_name} type="text"/>
                  <TextField onChange={(e) => handle(e)} required
                             id="specialization" label="Doctor Specialization" value={data.specialization} type="text"/>
                  <TextField onChange={(e) => handle(e)} required
                             id="Booking_Date" type="date" value={data.Booking_Date}/>
                  <TextField onChange={(e) => handle(e)} required
                             id="Time" type="time" value={data.Time}/>
                  <TextField onChange={(e) => handle(e)} required
                             id="appointment_location" label="Appointment Location" value={data.appointment_location} type="text"/>
                  <TextField onChange={(e) => handle(e)} required
                             id="fee" label="Appointment fee" value={data.fee} type="number"/>
                  {/* <Button type="submit" onClick={submit} variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
                Submit
                </Button> */}
                </div>
              </Box>
              <Box
                sx={{
                  "& .MuiTextField-root": {m: 1, width: "52ch"},
                  bgcolor: "white ",
                  mr: 1,
                  //border:1,
                  //borderRadius:2,
                  width: 480
                }}
              >
                <TextField onChange={(e) => handle(e)} required id="email"
                           label="Email" value={data.email} fullWidth type="email"/>
              </Box>
              <Box
                sx={{
                  "& .MuiTextField-root": {m: 1, width: "52ch"},
                  bgcolor: "white ",
                  mr: 1,
                  //border:1,
                  //borderRadius:2,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  width: 480,
                }}
              >
                <TextField onChange={(e) => handle(e)} required id="Query" label="Patient Query" value={data.Query}
                           type="text"
                           fullWidth multiline
                           rows="5"
                />
              </Box>
              <Box>
                <Link href="/my-appointments">
                  <Button type="submit" onClick={submit} variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
                    Submit
                  </Button>
                </Link>
              </Box>
            </Container>
          </Container>
          <Copyright sx={{pt: 4}}/>
        </Box>
      </Box>
    </ThemeProvider>
);

  if (!loading)
  {
    if (auth === 0) {
      return <Custom401/>
    }
    else if (auth === 1) {
      return <Custom403/>
    }
    else {
      return bookingForm
    }
  }
}