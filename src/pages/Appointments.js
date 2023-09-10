import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Box, Pagination } from "@mui/material";
import AppointmentsTable1 from "../components/AppointmentsTable1";
import "../styles/UserDashboard.css";

function Appointments() {
  return (
    <div className="userDashboard">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#004aad", fontWeight: "bold" }}
            >
              Your Appointments
            </Typography>
            <AppointmentsTable1 />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination count={5} color="primary" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Appointments;
