import React from "react";
import Container from '@mui/material/Container';
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="*" element={<PrivateRoute/>}>
            <Route exact path="*" element={<Dashboard/>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
