import React, { useEffect, useState } from "react";

import Typography from "../../../components/common/Typography";
import { Link } from "react-router-dom";

import axios from "axios";
import { Paper, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

import {
  Avatar,
  CardActionArea,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import MyResponsiveBar from "./ResponsiveBar";
const data = [
  {
    Driver: "Driver 1",
    Overspeeding: 65,
    OverspeedingColor: "hsl(107, 70%, 50%)",
    "Harsh Braking": 171,
    "Harsh BrakingColor": "hsl(5, 70%, 50%)",
    "Sudden Acceleration": 83,
    "Sudden AccelerationColor": "hsl(88, 70%, 50%)",
  },
  {
    Driver: "Driver 2",
    Overspeeding: 74,
    OverspeedingColor: "hsl(71, 70%, 50%)",
    "Harsh Braking": 185,
    "Harsh BrakingColor": "hsl(20, 70%, 50%)",
    "Sudden Acceleration": 151,
    "Sudden AccelerationColor": "hsl(26, 70%, 50%)",
  },
  {
    Driver: "Driver 3",
    Overspeeding: 24,
    OverspeedingColor: "hsl(24, 70%, 50%)",
    "Harsh Braking": 36,
    "Harsh BrakingColor": "hsl(140, 70%, 50%)",
    "Sudden Acceleration": 29,
    "Sudden AccelerationColor": "hsl(111, 70%, 50%)",
  },
  {
    Driver: "Driver 4",
    Overspeeding: 173,
    OverspeedingColor: "hsl(120, 70%, 50%)",
    "Harsh Braking": 61,
    "Harsh BrakingColor": "hsl(334, 70%, 50%)",
    "Sudden Acceleration": 56,
    "Sudden AccelerationColor": "hsl(92, 70%, 50%)",
  },
  {
    Driver: "Driver 5",
    Overspeeding: 26,
    OverspeedingColor: "hsl(80, 70%, 50%)",
    "Harsh Braking": 107,
    "Harsh BrakingColor": "hsl(227, 70%, 50%)",
    "Sudden Acceleration": 46,
    "Sudden AccelerationColor": "hsl(16, 70%, 50%)",
  },
  {
    Driver: "Driver 6",
    Overspeeding: 155,
    OverspeedingColor: "hsl(94, 70%, 50%)",
    "Harsh Braking": 57,
    "Harsh BrakingColor": "hsl(271, 70%, 50%)",
    "Sudden Acceleration": 116,
    "Sudden AccelerationColor": "hsl(330, 70%, 50%)",
  },
  {
    Driver: "Driver 7",
    Overspeeding: 136,
    OverspeedingColor: "hsl(345, 70%, 50%)",
    "Harsh Braking": 1,
    "Harsh BrakingColor": "hsl(163, 70%, 50%)",
    "Sudden Acceleration": 111,
    "Sudden AccelerationColor": "hsl(196, 70%, 50%)",
  },
  {
    Driver: "Driver 8",
    Overspeeding: 65,
    OverspeedingColor: "hsl(107, 70%, 50%)",
    "Harsh Braking": 171,
    "Harsh BrakingColor": "hsl(5, 70%, 50%)",
    "Sudden Acceleration": 83,
    "Sudden AccelerationColor": "hsl(88, 70%, 50%)",
  },
  {
    Driver: "Driver 9",
    Overspeeding: 74,
    OverspeedingColor: "hsl(71, 70%, 50%)",
    "Harsh Braking": 185,
    "Harsh BrakingColor": "hsl(20, 70%, 50%)",
    "Sudden Acceleration": 151,
    "Sudden AccelerationColor": "hsl(26, 70%, 50%)",
  },
  {
    Driver: "Driver 10",
    Overspeeding: 24,
    OverspeedingColor: "hsl(24, 70%, 50%)",
    "Harsh Braking": 36,
    "Harsh BrakingColor": "hsl(140, 70%, 50%)",
    "Sudden Acceleration": 29,
    "Sudden AccelerationColor": "hsl(111, 70%, 50%)",
  },
  {
    Driver: "Driver 11",
    Overspeeding: 173,
    OverspeedingColor: "hsl(120, 70%, 50%)",
    "Harsh Braking": 61,
    "Harsh BrakingColor": "hsl(334, 70%, 50%)",
    "Sudden Acceleration": 56,
    "Sudden AccelerationColor": "hsl(92, 70%, 50%)",
  },
  {
    Driver: "Driver 12",
    Overspeeding: 26,
    OverspeedingColor: "hsl(80, 70%, 50%)",
    "Harsh Braking": 107,
    "Harsh BrakingColor": "hsl(227, 70%, 50%)",
    "Sudden Acceleration": 46,
    "Sudden AccelerationColor": "hsl(16, 70%, 50%)",
  },
  {
    Driver: "Driver 13",
    Overspeeding: 155,
    OverspeedingColor: "hsl(94, 70%, 50%)",
    "Harsh Braking": 57,
    "Harsh BrakingColor": "hsl(271, 70%, 50%)",
    "Sudden Acceleration": 116,
    "Sudden AccelerationColor": "hsl(330, 70%, 50%)",
  },
  {
    Driver: "Driver 14",
    Overspeeding: 136,
    OverspeedingColor: "hsl(345, 70%, 50%)",
    "Harsh Braking": 1,
    "Harsh BrakingColor": "hsl(163, 70%, 50%)",
    "Sudden Acceleration": 111,
    "Sudden AccelerationColor": "hsl(196, 70%, 50%)",
  },
  {
    Driver: "Driver 15",
    Overspeeding: 65,
    OverspeedingColor: "hsl(107, 70%, 50%)",
    "Harsh Braking": 171,
    "Harsh BrakingColor": "hsl(5, 70%, 50%)",
    "Sudden Acceleration": 83,
    "Sudden AccelerationColor": "hsl(88, 70%, 50%)",
  },
];

function TripMetricsReport() {
  return (
    <div>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Typography
                variant="h3"
                marked="left"
                style={{ fontWeight: "bold", fontSize: "30px" }}
                gutterBottom
              >
                Trip Metrics Report
              </Typography>
              <Box display="flex">
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  color="primary"
                  component={Link}
                  to={"/admindeliverymonitoring"}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 1 }}
                  startIcon={<PrintIcon />}
                >
                  Print
                </Button>
              </Box>
            </Box>
            <Paper
              sx={{
                mt: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",

                height: "74vh",
              }}
            >
              <MyResponsiveBar data={data} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TripMetricsReport;
