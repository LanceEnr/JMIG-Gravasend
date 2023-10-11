import React from "react";
import { Grid, Paper, Avatar, Box } from "@mui/material";
import Title from "./components/Title";
import Typography from "antd/es/typography/Typography";
import SpeedIcon from "@mui/icons-material/Speed";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import CarCrashIcon from "@mui/icons-material/CarCrash";
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                minHeight: "225px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {" "}
              <Typography
                variant="subtitle1"
                style={{
                  color: "#3f51b5",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                Driver
              </Typography>
              <Avatar sx={{ margin: "10px 0" }} />
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
                Driver ID 2020176555
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                minHeight: "225px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                textAlign: "center",
              }}
            >
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
                style={{
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                2023 Isuzu C-Series CYZ52 M Dump Truck
              </Typography>
              <Typography
                variant="caption"
                style={{ display: "block", marginBottom: "20px" }}
              >
                MY32160
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minHeight: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  style={{ color: "#bd8512", fontSize: "30px" }}
                >
                  40 km/hr
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Current Speed
                </Typography>
              </Box>
              <Box>
                <SpeedIcon sx={{ fontSize: "60px" }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minHeight: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  style={{ color: "#bd8512", fontSize: "30px" }}
                >
                  40 km/hr
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Average Speed
                </Typography>
              </Box>
              <Box>
                <SpeedIcon sx={{ fontSize: "60px" }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minHeight: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  style={{ color: "#bd8512", fontSize: "30px" }}
                >
                  0 instances
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Harsh Braking
                </Typography>
              </Box>
              <Box>
                <CarCrashIcon sx={{ fontSize: "60px" }} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minHeight: "100px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  style={{ color: "#bd8512", fontSize: "30px" }}
                >
                  0 instances
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Sudden Acceleration
                </Typography>
              </Box>
              <Box>
                <ElectricCarIcon sx={{ fontSize: "60px" }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DeliveryMonitoring;
