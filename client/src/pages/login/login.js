import React, { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
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
import IconButton from '@mui/material/IconButton';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import Copyright from "../copyright/copyright";
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

const theme = createTheme();

export default function Login() {
  const [error, setError] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { googleOAuthLogin, login } = useAuth()
  const history = useNavigate()

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  useGoogleOneTapLogin({
    googleAccountConfigs: {
      callback: ({ clientId, credential, select_by }) => { 
        try {
          setError("")
          googleOAuthLogin(credential)
          history("/")
        }
        catch (err) {
          setError("Failed to login: " + err.code)
        }
      },
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      setError("")
      await login(email, password)
      history("/")
    }
    catch (err){
      setError("Failed to login: " + err.code)
    }
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              type={passwordShown ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value) }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword}>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
