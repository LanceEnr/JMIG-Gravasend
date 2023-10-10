import React from "react";
import { Grid, Paper, Avatar, Box } from "@mui/material";
import Title from "./components/Title";
import Typography from "antd/es/typography/Typography";

function DeliveryMonitoring() {
  return (
    <Grid container spacing={3}>
      <Title>Delivery Monitoring</Title>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h3"
            style={{ color: "#3f51b5", marginBottom: "10px" }}
          >
            Real-time tracking
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.336009504322!2d121.0196
6503907859!3d14.693580674853429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b
13a6371ac9d%3A0x8828bdfef721a44c!2sJMIG%20Gravel%20and%20Sand%20Supply!5e0!3m2!1sen!2s
ph!4v1693048413304!5m2!1sen!2sph"
            width={1200}
            height={450}
            sx={{ border: "none", borderRadius: "5px", mb: "20px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h3"
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
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>40 km/hr</Typography>
              <Typography>Current Speed</Typography>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>59 km/hr</Typography>
              <Typography>Average Speed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>0 instances</Typography>
              <Typography>Harsh Braking</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <Typography>0 instances</Typography>
              <Typography>Sudden Acceleration</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DeliveryMonitoring;
