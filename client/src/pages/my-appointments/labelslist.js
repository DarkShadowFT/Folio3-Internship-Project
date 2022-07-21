import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <DeleteIcon style={{ color: "red" }}  />
      </ListItemIcon>
      <ListItemText primary="Delete" />
    </ListItemButton>
    <ListItemButton href="/DoctorsList">
      <ListItemIcon>
        <EditIcon style={{ color: "blue" }} />
      </ListItemIcon>
      <ListItemText primary="Edit" />
    </ListItemButton>
    <ListItemButton href="/DoctorsList">
      <ListItemIcon>
        <VisibilityIcon style={{ color: "black" }} />
      </ListItemIcon>
      <ListItemText primary="View" />
    </ListItemButton>
  </React.Fragment>
);
