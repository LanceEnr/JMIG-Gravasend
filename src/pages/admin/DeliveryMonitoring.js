import React from "react";
import { Grid, Paper, Avatar, Box } from "@mui/material";
import Title from "./components/Title";
import Typography from "antd/es/typography/Typography";

function DeliveryMonitoring() {
  return (
    <Grid container spacing={3}>
      <Title>Delivery Monitoring</Title>

      <Grid item xs={6}>
        <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">Real-time tracking</Typography>
          <Box
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: "#808080",
              bgcolor: "#F5F5F5",
              mt: 2,
              p: 2,
            }}
          >
            MAP HERE
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#3f51b5", marginBottom: "10px" }}
        >
          Current Trip Information
        </Typography>

        <Typography
          variant="subtitle1"
          style={{
            color: "#3f51b5",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Driver Details
        </Typography>
        <Avatar style={{ margin: "10px 0" }} />
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Juan Dela Cruz
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "20px" }}
        >
          Account no. 2020176555
        </Typography>

        <Typography
          variant="subtitle1"
          style={{
            color: "#3f51b5",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Vehicle Details
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "5px" }}
        >
          2023 Isuzu C-Series CYZ52 M Dump Truck
        </Typography>
        <Typography
          variant="caption"
          style={{ display: "block", marginBottom: "20px" }}
        >
          Plate no. MY32160
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography>40 km/hr</Typography>
        <Typography>Current Speed</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>59 km/hr</Typography>
        <Typography>Average Speed</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>0 instances</Typography>
        <Typography>Harsh Braking</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>0 instances</Typography>
        <Typography>Sudden Acceleration</Typography>
      </Grid>
    </Grid>
  );
}

export default DeliveryMonitoring;
