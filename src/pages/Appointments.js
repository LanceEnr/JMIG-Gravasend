import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppointmentsTable from "../components/AppointmentsTable";
import "../styles/UserDashboard.css";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get("http://localhost:3001/appointment").then((response) => {
      setAppointments(response.data);
    });
  }, []);

  return (
    <div className="userDashboard">
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            name: {appointment._name}, date: {appointment._date}
          </li>
        ))}
      </ul>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column" }}
            >
              <AppointmentsTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Appointments;
