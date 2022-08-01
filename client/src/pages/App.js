import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup/signup";
import Dashboard from "./dashboard/dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./forgot-password/ForgotPassword";
import DoctorsList from "./doctors-list/doctorsList"
import BookingForm from "./booking-form/bookingForm";
import MyAppointments from "./my-appointments/myAppointments";

function App() {
  return (
    <AuthProvider>
    </AuthProvider>
  );
}

export default App;
