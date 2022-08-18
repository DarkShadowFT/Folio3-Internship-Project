import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Link from "next/link";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BoltIcon from '@mui/icons-material/Bolt';

export const mainListItems = (
  <React.Fragment>
    <Link href="/dashboard" replace>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/doctors-list" replace>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Book Appointment" />
      </ListItemButton>
    </Link>
    <Link href="/my-appointments" replace>
      <ListItemButton>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="My Appointments" />
      </ListItemButton>
    </Link>
    <Link href="/booking-form" replace>
    <ListItemButton>
      <ListItemIcon>
        <BoltIcon />
      </ListItemIcon>
      <ListItemText primary="Instant Appointment" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end" />
    </ListItemButton>
  </React.Fragment>
);