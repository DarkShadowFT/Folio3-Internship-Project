import React from "react";
import Header from "./Header";
import SideNav from "./Sidenav";
import Appoinment from "./Appointment";
function App() {
  return (
    <div className="App">
      <Header />

      <div class="container">
        <div class="divleft">
          <SideNav />
        </div>
        <div class="divright">
          <Appoinment />
        </div>
      </div>
    </div>
  );
}

export default App;
