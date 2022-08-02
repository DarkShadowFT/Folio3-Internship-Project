import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

<<<<<<< Updated upstream

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
=======
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
    Address: yup
      .string("Enter your Address ")
      .required("Please Enter your Address")
      .typeError("Kindly Enter your Address"),
    Gender: yup
      .string("Enter your Gender")
      .required("Please Enter your Gender")
      .typeError("Kindly Enter your Gender"),
    CNIC: yup
      .string("Enter your CNIC number in format XXXXX-XXXXXXX-X")
      .required("Please enter your CNIC number")
      .min(13, 'CNIC is exactly 13 characters long and of format XXXXX-XXXXXXX-X')
      .max(13, 'CNIC is exactly 13 characters long and of format XXXXX-XXXXXXX-X')
      .typeError("CNIC must be a number")
      .matches("^[0-9]{5}-[0-9]{7}-[0-9]$", 'Should be of the form XXXXX-XXXXXXX-X'),





  }).required();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
  const firstName = register('firstName')
  const lastName = register('lastName')
  const email = register('email')
  const password = register('password')
  const age = register('age')
  const phoneNumber = register('phoneNumber')
  const Address = register('Address')
  const Gender = register('Gender')
  const CNIC = register('CNIC')
>>>>>>> Stashed changes

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
<<<<<<< Updated upstream
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
=======
          <Box component="form" onSubmit={handleSubmit(handleSignup)} noValidate sx={{ mt: 3 }}>
            {error && < Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
>>>>>>> Stashed changes
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
<<<<<<< Updated upstream
=======
                  inputRef={email.ref}
                  error={errors.email}
                  onBlur={email.onBlur}
                  helperText={errors.email?.message}
                  onChange={email.onChange}
>>>>>>> Stashed changes
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
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneofpatient"
                  label="Phone Number"
                  name="Phone_number"
                  autoComplete="PhoneNumber"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept terms and policy"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Addressofpatient"
                  label="Address"
                  name="patientAddress"
                  autoComplete="patientAddress"
                  inputRef={Address.ref}
                  error={errors.Address}
                  onBlur={Address.onBlur}
                  helperText={errors.Address?.message}
                  onChange={Address.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="GenderofPatient"
                  label="Gender"
                  name="PatientGender"
                  autoComplete="PatientGender"
                  inputRef={Gender.ref}
                  error={errors.Gender}
                  onBlur={Gender.onBlur}
                  helperText={errors.Gender?.message}
                  onChange={Gender.onChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="CNIC"
                  label="CNIC Number"
                  name="CNICNumber"
                  autoComplete="CNICNumber"
                  inputRef={CNIC.ref}
                  error={errors.CNIC}
                  onBlur={CNIC.onBlur}
                  helperText={errors.CNIC?.message}
                  onChange={CNIC.onChange}
                />
              </Grid>

            </Grid>



            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        
      </Container>
    </ThemeProvider>
  );
}





