import React, { useState } from "react"
import { Alert, Button, Box, CssBaseline, Container, Grid, TextField } from "@mui/material"
import MUILink from "@mui/material/Link";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext"

export default function forgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      await resetPassword(email)
      setMessage("Check your inbox for further instructions")
    } catch (err) {
      setError("Failed to reset password: " + err.code)
    }
  }

  return (
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
        <h2>Password Reset</h2>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <MUILink href="/login" variant="body2">
                {"Login"}
              </MUILink>
            </Grid>
            <Grid item variant="body2">
              <small>
                {"Need an Account? "}
              </small>
              <MUILink variant="body2" href="/signup">
                {"Sign Up"}
              </MUILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
} 