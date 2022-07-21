import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </ListItemButton>
    <ListItemButton href="/DoctorsList">
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Book Appointment" />
    </ListItemButton>
    <ListItemButton href="/MyAppointments">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="My Appointments" />
    </ListItemButton>
  </React.Fragment>
);
