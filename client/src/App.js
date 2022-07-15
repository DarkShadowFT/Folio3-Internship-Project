import React from "react";
import Header from "./pages/Patient's_Appointment/Header";
import SideNav from "./pages/Patient's_Appointment/Sidenav";
import Appointment from "./pages/Patient's_Appointment/Appointment";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <div className="divleft">
          <SideNav/>
        </div>
        <div className="divright">
          <Appointment/>
        </div>
      </div>
    </div>
  );
}

export default App;
