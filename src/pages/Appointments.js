import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppointmentsTable1 from "../components/AppointmentsTable1";
import "../styles/UserDashboard.css";
import UserSidePanel from "../components/UserSidePanel";
import { useMediaQuery } from "@mui/material";

function Appointments() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="userDashboard">
      <Container sx={{ minHeight: "80vh", mt: 2 }}>
        <Grid container spacing={2}>
          {!isMobile && (
            <Grid item xs={6} md={3}>
              <UserSidePanel />
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            <AppointmentsTable1 />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Appointments;
