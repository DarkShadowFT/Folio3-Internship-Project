
import React from "react"
import SignUp from "./pages/signup/signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/signup" element={<SignUp/>} />
       
      </Routes>
    </Router>
  );
}

