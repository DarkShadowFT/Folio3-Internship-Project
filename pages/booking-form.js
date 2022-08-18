import React, {useEffect, useState} from "react";
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
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"

const theme = createTheme();

export default function BookingForm() {
  // 0 - not logged in, not authorized
  // 1 - logged in, not authorized
  // 2 - logged in, authorized
  const [auth, setAuth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [updateMethod, setUpdateMethod] = useState(false);
  const [error, setError] = useState("")
  const {currentUser} = useAuth();
  const router = useRouter()

  const url_appointment_api = "http://localhost:3000/api/appointment_api"
  const [data, setData] = useState({
    specialization: "", doctor_name: "", appointment_date: "", Booking_Date: "", appointment_time: "", fee: "",//Appointment Charges
    Status: "Pending", patientID: "", doctorID: ""
  })

  function getRandomDate(src_date) {
    const start_date = new Date(src_date)
    const end_date = new Date();
    end_date.setDate(end_date.getDate() + 7);

    const offset = parseInt(1 + (Math.random() * 7))
    // console.log("offset = " + offset)
    let new_date = new Date();
    let hour = Math.random() * (23) | 0;
    new_date.setHours(hour);
    new_date.setDate(start_date.getDate() + offset)
    // console.log("Random date within range: (", start_date, ", ", end_date, ") is : ", new_date)
    return new_date;
  }

  const onError = (errors, e) => console.log(errors, e);

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .required("Please enter your first name")
      .min(3, 'First name is too short - should be minimum 3 chars')
      .max(50, 'First name is too long'), lastName: yup
      .string("Enter your last name")
      .required("Please enter your last name")
      .min(3, 'Last name is too short - should be minimum 3 chars')
      .max(50, 'Last name is too long'), patientEmail: yup
      .string("Enter your email")
      .required("Please enter an email")
      .email("Enter a valid email"), doctorEmail: yup
      .string("Enter your email")
      .required("Please enter an email")
      .email("Enter a valid email"), query: yup
      .string("Enter your Query")
      .required("Please enter your Query")
      .typeError("Enter Query correctly"),
  }).required();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: {errors}
  } = useForm({resolver: yupResolver(validationSchema)});

  const firstName = register('firstName')
  const lastName = register('lastName')
  const patientEmail = register('patientEmail')
  const doctorEmail = register('doctorEmail')
  const query = register('query')
  const watchDoctorEmail = watch('doctorEmail', '');

  async function submit(e) {
    try {
      // e.preventDefault();
      data.Booking_Date = new Date()

      if (!updateMethod) {
        await axios.post(url_appointment_api, {
          Doctor_ID: data.doctorID,
          Patient_ID: data.patientID,
          Query: getValues("query"),
          Date: getRandomDate(data.Booking_Date),
          Booking_Date: data.Booking_Date,
          Fee: data.fee,
          Status: data.Status
        })
      } else {

        await axios.put(url_appointment_api, {
          app_id: router.query.app_id,
          Doctor_ID: data.doctorID,
          Patient_ID: data.patientID,
          Query: getValues("query"),
          Date: getRandomDate(data.Booking_Date),
          Booking_Date: data.Booking_Date,
          Fee: data.fee,
          Status: data.Status
        })
      }
      await router.push("/my-appointments")
    } catch (err) {
      setError("Failed to signup: " + err.code)
    }
  }

  function handle(e) {
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    // console.log("handle function called = " + JSON.stringify(newdata))
  }

  useEffect(() => {
    const handleRouteChange = (url, {shallow}) => {
      setValue("doctorEmail", "")
      setValue("query", "")
      setAuth(0);
      setLoading(true);
      setDisabled(false);
      setUpdateMethod(false);
      const newData = {...data}
      newData.doctor_name = ""
      newData.doctorID = ""
      newData.specialization = ""
      newData.fee = ""
      newData.Booking_Date = ""
      newData.appointment_time = ""
      newData.appointment_date = ""
      newData.Status = ""
      setData(newData)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.get(`/api/person/${currentUser.email}`)
        const newData = {...data}
        setValue("firstName", userData.data[0].First_Name)
        setValue("lastName", userData.data[0].Last_Name)
        setValue("patientEmail", currentUser.email)

        // Boolean to change request to PUT request if booking form opened in edit mode
        setUpdateMethod(false)

        const patient = await axios.get(`/api/patient/${userData.data[0]._id}`)
        newData.patientID = patient.data[0]._id

        if (router.query) {
          if (Object.keys(router.query).length === 2) {
            const appointment = await axios.get(`/api/appointment/${router.query.app_id}`)
            setValue("firstName", appointment.data.first_name)
            setValue("lastName", appointment.data.last_name)
            setValue("doctorEmail", appointment.data.doctor_email)
            newData.doctor_name = appointment.data.doctor_name
            newData.specialization = appointment.data.doctor_specialization
            newData.fee = appointment.data.appt_fee
            setValue("patientEmail", appointment.data.patient_email)
            setValue("query", appointment.data.appt_query)
            const converted_date = new Date(appointment.data.appt_date)
            // console.log("Converted date = " + converted_date)
            newData.appointment_date = converted_date.toISOString().split('T')[0];
            newData.appointment_time = converted_date.toTimeString().split(' ')[0]

            if (router.query.action === "edit") {
              setUpdateMethod(true)
              setDisabled(false)
            } else if (router.query.action === "view") {
              setDisabled(true)
            }

          } else {
            if (router.query.docName) {
              newData.doctor_name = router.query.docName
            }

            if (router.query.fee) {
              newData.fee = router.query.fee
            }

            if (router.query.specialization) {
              newData.specialization = router.query.specialization
            }

            if (router.query.email) {
              setValue("doctorEmail", router.query.email)
            }

            setDisabled(false)
          }
        }

        setData(newData)
      } catch (err) {
        console.error(err)
      }
    })();
  }, [loading])

  useEffect(() => {
    (async () => {
      try {
        const doc_email = watchDoctorEmail
        if (doc_email && doc_email.length !== 0) {
          const doctor = await axios.post('/api/doctor/email', {email: doc_email})
          const newData = {...data}
          newData.fee = doctor.data[0].Fee
          // console.log("Doctor Details = ", doctor.data[0])
          newData.doctorID = doctor.data[0]._id
          newData.specialization = doctor.data[0].Specialization
          const person = await axios.get(`/api/doctor/${newData.doctorID}`)
          newData.doctor_name = person.data.name
          // console.log("Doctor name = " + newData.doctor_name)
          // const timer = setTimeout(() => {
          // }, 1000);
          // clearTimeout(timer);
          setData(newData)
        }
      } catch (err) {
        // console.error(err)
      }
    })();
  }, [watchDoctorEmail])

  useEffect(() => {
    (async () => {
      try {
        if (currentUser) {
          const idToken = cookieCutter.get('customAuthToken')
          const config = {
            headers: {Authorization: idToken}, credentials: 'include'
          };
          const response = await axios.get('http://localhost:3000/api/auth/booking-form', config)
          if (response.status === 200) {
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
          await router.reload()
        }
        setAuth(0)
        setLoading(false)
      }
    })();
  })

  let bookingForm = (<ThemeProvider theme={theme}>
    <Box sx={{display: "flex"}}>
      <CssBaseline/>
      <Navbar>Booking Form</Navbar>
      <Sidebar/>
      <Box component="main" sx={{
        backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
      >
        <Toolbar/>
        <Container maxWidth="sm" sx={{mt: 4, mb: 2}}>
          <form onSubmit={handleSubmit(submit, onError)} noValidate autoComplete="off">
            {error && < Alert severity="error" sx={{mb: 3}}>{error}</Alert>}
            <Box
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTextField-root": {m: 1, width: "25ch"},
                spacing: 10,
                bgcolor: "white ",
                mr: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: 477
              }}
              noValidate
              autoComplete="off"
            >
              <TextField required
                         id="firstName"
                         label="First Name" name="firstName"
                         inputRef={firstName.ref}
                         error={errors.firstName}
                         onBlur={firstName.onBlur}
                         helperText={errors.firstName?.message}
                         onChange={firstName.onChange}
                         type="text"
                         disabled={disabled}
                         autoComplete="off"
              />
              <TextField required
                         id="last_name"
                         label="Last Name"
                         name="lastName"
                         disabled={disabled}
                         inputRef={lastName.ref}
                         error={errors.lastName}
                         onBlur={lastName.onBlur}
                         helperText={errors.lastName?.message}
                         onChange={lastName.onChange}
                         type="text"
                         autoComplete="off"
              />
            </Box>
            <Box sx={{
              "& .MuiTextField-root": {m: 1, width: "52ch"}, bgcolor: "white ", mr: 1, width: 480
            }} noValidate
                 autoComplete="off">
              <div>
                <TextField required
                           id="doctorEmail"
                           label="Doctor Email"
                           disabled={disabled}
                           inputRef={doctorEmail.ref}
                           error={errors.doctorEmail}
                           onBlur={doctorEmail.onBlur}
                           helperText={errors.doctorEmail?.message}
                           onChange={doctorEmail.onChange}
                           name="doctorEmail"
                           InputLabelProps={{shrink: true}}
                />
              </div>
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTextField-root": {m: 1, width: "25ch"},
                spacing: 10,
                bgcolor: "white ",
                mr: 1, //border:1,
                //borderRadius:2,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: 477
              }}
              noValidate
              autoComplete="off">
              <TextField onChange={(e) => handle(e)} required
                         disabled={true} id="doctor_name" label="Doctor Name" value={data.doctor_name} type="text"/>
              <TextField onChange={(e) => handle(e)} required
                         disabled={true} id="specialization" label="Doctor Specialization" value={data.specialization}
                         type="text"/>
              {disabled && <TextField onChange={(e) => handle(e)} required
                                      id="Booking_Date" type="date" disabled={true} label="Appointment Date"
                                      value={data.appointment_date}/>}
              {disabled && <TextField onChange={(e) => handle(e)} required
                                      id="Time" type="time" disabled={true} label="Appointment Time"
                                      value={data.appointment_time}/>}
            </Box>
            <Box sx={{
              "& .MuiTextField-root": {m: 1, width: "52ch"}, bgcolor: "white ", mr: 1, width: 480
            }}>
              <TextField onChange={(e) => handle(e)} required
                         disabled={true} id="fee" label="Appointment fee" value={data.fee} type="number"/>
              <TextField required
                         id="patientEmail"
                         label="Your Email"
                         name="patientEmail"
                         fullWidth
                         inputRef={patientEmail.ref}
                         error={errors.patientEmail}
                         onBlur={patientEmail.onBlur}
                         helperText={errors.patientEmail?.message}
                         onChange={patientEmail.onChange}
                         disabled={disabled}
              />
              <div>
                <TextField
                  required
                  id="Query"
                  label="Patient Query"
                  name="query"
                  fullWidth
                  inputRef={query.ref}
                  error={errors.query}
                  onBlur={query.onBlur}
                  helperText={errors.query?.message}
                  onChange={query.onChange}
                  type="text"
                  disabled={disabled}
                  multiline
                  rows={5}
                  InputLabelProps={{shrink: true}}
                />
              </div>
            </Box>
            <Box>
              <Button type="submit" variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}
                      disabled={disabled}>
                Submit
              </Button>
            </Box>
          </form>
        </Container>
        <Copyright sx={{pt: 4}}/>
      </Box>
    </Box>
  </ThemeProvider>);

  if (!loading) {
    if (auth === 0) {
      return <Custom401/>
    } else if (auth === 1) {
      return <Custom403/>
    } else {
      return bookingForm
    }
  }
}