import React, {useState} from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MUILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from 'next/router'
import {useAuth} from "../contexts/AuthContext";
import Copyright from "../components/Copyright";
import {useGoogleOneTapLogin} from "react-google-one-tap-login";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth'
import { auth } from "../utils/firebase";
// import cookieCutter from 'cookie-cutter'

const theme = createTheme();

async function customTokenLogin(googleOAuthLogin, router) {
  const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true)
  // console.log("idToken = " + idToken)
  const config = {
    headers: {Authorization: idToken},
    credentials: 'include'
  };
  const response = await axios.get(
    '/api/login',
    config
  )
  // console.log("Login API response = " + response.data)
  await googleOAuthLogin(response.data.token)
  // const customToken = await auth.currentUser.getIdToken(/* forceRefresh */ true)
  // cookieCutter.set('customAuthToken', customToken)
  await router.replace("/dashboard");
}

export default function Login() {
  const [error, setError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const {googleOAuthLogin, login, setIDToken, currentUser} = useAuth();
  const router = useRouter()

  const togglePassword = () => {
    // When the handler is invoked, inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const validationSchema = yup
    .object({
      email: yup
        .string("Enter your email")
        .required("Please enter an email")
        .email("Enter a valid email"),
      password: yup
        .string("Enter your password")
        .required("Please enter a password")
        .min(6, "Password is too short - should be minimum 6 chars")
        .max(50, "Password is too long"),
    })
    .required();

  const {
    register, handleSubmit, getValues, formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});
  const email = register("email");
  const password = register("password");

  useGoogleOneTapLogin({
    googleAccountConfigs: {
      callback: async ({clientId, credential, select_by}) => {
        try {
          setError("")
          const cred = GoogleAuthProvider.credential(credential)
          await signInWithCredential(auth, cred)
          await router.push("/dashboard")
          // console.log("Signed in with custom credentials")
          // await customTokenLogin(googleOAuthLogin, router)
          // console.log("Signed in with custom token")
        } catch (err) {
          console.error(err)
          if (err.code)
            setError("Failed to login: " + err.code);
          else
            setError("Failed to login")
        }
      },
      client_id: "293626469940-9togri5sacgoeoldvjvq3gtot796cb66.apps.googleusercontent.com",
    },
  });

  const handleLogin = async () => {
    try {
      setError("");
      await login(getValues("email"), getValues("password"));
      await router.push("/dashboard")
      // await customTokenLogin(googleOAuthLogin, router)
    } catch (err) {
      setError("Failed to login: " + err.code);
    }
  };

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
          <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate sx={{mt: 1}}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              inputProps={{style: {textTransform: "lowercase"}}}
              autoComplete="email"
              autoFocus
              inputRef={email.ref}
              error={errors.email}
              onBlur={email.onBlur}
              helperText={errors.email?.message}
              onChange={email.onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              inputRef={password.ref}
              error={errors.password}
              onBlur={password.onBlur}
              helperText={errors.password?.message}
              onChange={password.onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword}>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MUILink href="/forgot-password" variant="body2">
                  {"Forgot password?"}
                </MUILink>
              </Grid>
              <Grid item>
                  <MUILink variant="body2" href="/signup">
                    {"Don't have an account? Sign Up"}
                  </MUILink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}
