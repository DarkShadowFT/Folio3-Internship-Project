import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import MUILink from "@mui/material/Link";
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Copyright from "../components/copyright/copyright"
import { useRouter } from 'next/router'
import { useAuth } from "../contexts/AuthContext"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import Link from "next/link";

const theme = createTheme()

export default function SignUp() {
  const [error, setError] = useState("")
  const [showalert, setshowalert] = React.useState(false)
  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const { signup } = useAuth()
  const router = useRouter()

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .required("Please enter your first name")
      .min(3, 'First name is too short - should be minimum 3 chars')
      .max(50, 'First name is too long'),
    lastName: yup
      .string("Enter your last name")
      .required("Please enter your last name")
      .min(3, 'Last name is too short - should be minimum 3 chars')
      .max(50, 'Last name is too long'),
    email: yup
      .string("Enter your email")
      .required("Please enter an email")
      .email("Enter a valid email"),
    password: yup
      .string("Enter your password")
      .required("Please enter a password")
      .min(6, 'Password is too short - should be minimum 6 chars')
      .max(50, 'Password is too long'),
    age: yup
      .number()
      .required("Please enter your age")
      .min(18, 'You must be at least 18 years old')
      .max(120, 'You must be at most 120 years old')
      .typeError("Age must be a number"),
    phoneNumber: yup
      .string("Enter your phone number in +923XXXXXXXXXX format")
      .required("Please enter your phone number")
      .min(13, 'PhoneNumber is exactly 13 characters long and of format +923XXXXXXXXXX')
      .max(13, 'PhoneNumber is exactly 13 characters long and of format +923XXXXXXXXXX')
      .typeError("PhoneNumber must be a number")
      .matches("^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$", 'Should be of the form +923XXXXXXXXXX'),
  }).required();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({resolver: yupResolver(validationSchema)});
  const firstName = register('firstName')
  const lastName = register('lastName')
  const email = register('email')
  const password = register('password')
  const age = register('age')
  const phoneNumber = register('phoneNumber')

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setshowalert(false);
  };

  const handleSignup = async () => {

    try {
      setError("")
      await signup(getValues("email"), getValues("password"));
      setshowalert(true);//if user is sign up successfully set showalert to true.

      const timer = setTimeout(() => router.push("/login"), 1500);
      return () => clearTimeout(timer);
    }
    catch (err) {
      setError("Failed to signup: " + err.code)
      setshowalert(false);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleSignup)} noValidate sx={{ mt: 3 }}>
            {error &&< Alert severity="error" sx={{mb: 3}}>{error}</Alert>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={firstName.ref}
                  error={errors.firstName}
                  onBlur={firstName.onBlur}
                  helperText={errors.firstName?.message}
                  onChange={firstName.onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  inputRef={lastName.ref}
                  error={errors.lastName}
                  onBlur={lastName.onBlur}
                  helperText={errors.lastName?.message}
                  onChange={lastName.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email" 
                  inputRef={email.ref}
                  error={errors.email}
                  onBlur={email.onBlur}
                  helperText={errors.email?.message}
                  onChange={email.onChange}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  inputRef={password.ref}
                  error={errors.password}
                  onBlur={password.onBlur}
                  helperText={errors.password?.message}
                  onChange={password.onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  required 
                  fullWidth 
                  id="ageofpatient" 
                  label="Age" 
                  name="age" 
                  autoComplete="age"
                  inputRef={age.ref}
                  error={errors.age}
                  onBlur={age.onBlur}
                  helperText={errors.age?.message}
                  onChange={age.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneofpatient"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="PhoneNumber"
                  inputRef={phoneNumber.ref}
                  error={errors.phoneNumber}
                  onBlur={phoneNumber.onBlur}
                  helperText={errors.phoneNumber?.message}
                  onChange={phoneNumber.onChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            < Snackbar open={showalert} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Account created successfully
              </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MUILink variant="body2">
                  <Link href="/login">
                    {"Already have an account? Sign in"}
                  </Link>
                </MUILink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider >
  );
}