import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import SignUp from "./signup/signup";
import Dashboard from "./dashboard/dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./forgot-password/ForgotPassword";
import DoctorsList from "./doctors-list/doctorsList"
import BookingForm from "./booking-form/bookingForm";
import MyAppointments from "./my-appointments/myAppointments";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/DoctorsList" element={<DoctorsList/>}/>
            <Route path="/BookingForm" element={<BookingForm/>}/>
            <Route path="/MyAppointments" element={<MyAppointments/>}/>
          </Route>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
