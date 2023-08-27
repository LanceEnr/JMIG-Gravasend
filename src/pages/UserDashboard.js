import * as React from "react";
import Container from "@mui/material/Container";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Orders from "../components/Orders";
import Appointments from "../components/Appointments";
import "../styles/UserDashboard.css";

function UserDashboard() {
  return (
    <div className="userDashboard">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column" }}
            >
              <Appointments />
            </Paper>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserDashboard;
