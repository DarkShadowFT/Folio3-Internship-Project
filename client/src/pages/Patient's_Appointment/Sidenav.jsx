import React from "react";
import "./Sidenav.css";
import { SidebarData } from "./SidebarData";

function SideNav() {
  return (
    <div className="Sidenav">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              className="row"
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default SideNav;
