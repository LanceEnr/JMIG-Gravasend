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
import InventoryBar from "./components/InventoryBar";
import MyResponsivePie from "./components/MyResponsivePie";

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
            Admin
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
          <Grid item xs={7}>
            <Paper
              sx={{ px: 2, pt: 2, pb: 6, height: "55vh", overflow: "hidden" }}
            >
              <Typography
                color="text.primary"
                sx={{ fontWeight: "bold" }}
                variant="overline"
              >
                Current Inventory
              </Typography>
              <InventoryBar />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper
              sx={{ px: 2, pt: 2, pb: 6, height: "55vh", overflow: "hidden" }}
            >
              <Typography
                color="text.primary"
                sx={{ fontWeight: "bold" }}
                variant="overline"
              >
                Driver Performance
              </Typography>
              <MyResponsivePie />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AdminHomepage;
