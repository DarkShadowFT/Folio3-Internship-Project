import React from "react"
import Search from './search';
import Table from './table';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';

const mdTheme = createTheme();

function DoctorsList() {
  return (
      
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar>Doctors List</Navbar>
        <Sidebar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                  height: "100vh",
                    overflow: "auto",
          }}
          
          >
          <Toolbar />
          <Container>
            <Search />
          </Container>
            <Container>
              <Table/>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DoctorsList;