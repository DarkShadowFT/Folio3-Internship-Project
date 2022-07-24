import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import DoctorsList from "./pages/doctors-list/doctorsList"
import BookingForm from "./pages/booking-form/bookingForm";
import MyAppointments from "./pages/my-appointments/myAppointments";

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
