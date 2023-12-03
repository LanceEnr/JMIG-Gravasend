import React, { useEffect, useState } from "react";

import Typography from "../../components/common/Typography";
import { Link } from "react-router-dom";

import axios from "axios";
import { Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import HandymanIcon from "@mui/icons-material/Handyman";
import SearchIcon from "@mui/icons-material/Search";
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
import MyResponsiveBar from "./components/ResponsiveBar";

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

function AdminHomepage() {
  return (
    <div>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Welcome,{" "}
          <Typography
            variant="h3"
            component="span"
            style={{ fontWeight: "bold", fontSize: "30px" }}
            color="secondary"
          >
            Lance Enriquez
          </Typography>
        </Typography>
        <Grid sx={{ mt: 3 }} container spacing={3}>
          <Grid item xs={2.4}>
            <Card>
              <CardActionArea component={Link} to={`/adminmanageorders`}>
                <CardContent>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                        variant="overline"
                      >
                        {" "}
                        Total Orders
                      </Typography>
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        15
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        backgroundColor: "info.main",
                        height: 85,
                        width: 85,
                      }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: "42px" }} />
                    </Avatar>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>{" "}
          </Grid>
          <Grid item xs={2.4}>
            <Card>
              <CardActionArea component={Link} to={`/admindeliverymonitoring`}>
                <CardContent>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                        variant="overline"
                      >
                        Ongoing Trips
                      </Typography>
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        4
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        backgroundColor: "success.main",
                        height: 85,
                        width: 85,
                      }}
                    >
                      <LocalShippingIcon sx={{ fontSize: "42px" }} />
                    </Avatar>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>{" "}
          </Grid>
          <Grid item xs={2.4}>
            <Card>
              <CardActionArea component={Link} to={`/adminmanageappointments`}>
                <CardContent>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                        variant="overline"
                      >
                        {" "}
                        Appointments
                      </Typography>
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        10
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        backgroundColor: "secondary.main",
                        height: 85,
                        width: 85,
                      }}
                    >
                      <EventIcon sx={{ fontSize: "42px" }} />
                    </Avatar>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>{" "}
          </Grid>
          <Grid item xs={2.4}>
            <Card>
              <CardActionArea component={Link} to={`/adminmaintenance`}>
                <CardContent>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                        variant="overline"
                      >
                        {" "}
                        Maintenance
                      </Typography>
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        4{" "}
                        <Chip
                          label={
                            <Typography
                              sx={{
                                fontSize: "10px",
                                color: "error.dark",
                              }}
                            >
                              OVERDUE
                            </Typography>
                          }
                          sx={{ bgcolor: "#f5c9c9" }}
                        />
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        backgroundColor: "warning.main",
                        height: 85,
                        width: 85,
                      }}
                    >
                      <HandymanIcon sx={{ fontSize: "42px" }} />
                    </Avatar>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>{" "}
          </Grid>
          <Grid item xs={2.4}>
            <Card>
              <CardActionArea component={Link} to={`/admininspection`}>
                <CardContent>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                        variant="overline"
                      >
                        {" "}
                        Inspection
                      </Typography>
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        4{" "}
                        <Chip
                          label={
                            <Typography
                              sx={{
                                fontSize: "10px",
                                color: "error.dark",
                              }}
                            >
                              OVERDUE
                            </Typography>
                          }
                          sx={{ bgcolor: "#f5c9c9" }}
                        />
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        backgroundColor: "warning.main",
                        height: 85,
                        width: 85,
                      }}
                    >
                      <SearchIcon sx={{ fontSize: "42px" }} />
                    </Avatar>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>{" "}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminHomepage;
