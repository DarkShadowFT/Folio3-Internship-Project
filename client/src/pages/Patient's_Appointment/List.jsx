import React from "react";
import "./List.css"

const AppointmentList = (props) => {
  return (
    <div>
      <table>
        <tr>
          <td>{props.name} </td>
          <td>{props.rollNo} </td>
          <td>{props.name} </td>
        </tr>
      </table>
    </div>
  );
};

export default AppointmentList;
