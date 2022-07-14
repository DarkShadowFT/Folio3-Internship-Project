import React from "react";

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
