import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Box,
  ListItem,
  Tooltip,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Pagination,
  useMediaQuery,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UserDrawer from "./common/UserDrawer";

const data = [
  {
    _status: "Upcoming",
    appointmentNumber: "#002434",
    date: "5 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Cancelled",
    appointmentNumber: "#002435",
    date: "6 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    _status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

data.forEach((item) => {
  const date = new Date(item.date + " " + new Date().getFullYear());
  const day = date.getDay();
  item.dayOfWeek = daysOfWeek[day];
});

const getColor = (_status) => {
  switch (_status) {
    case "Completed":
      return { main: "success.main", lighter: "#8dd290" };
    case "Cancelled":
      return { main: "error.main", lighter: "#f5c9c9" };
    case "Upcoming":
      return { main: "warning.main", lighter: "#ffc890" };
    default:
      return { main: "", lighter: "" };
  }
};

export default function AppointmentsTable1() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <List
      component="nav"
      sx={{
        px: 0,
        py: 0,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "#004aad", fontWeight: "bold" }}
        >
          <EventNoteIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Appointments
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: "#004aad",
            borderColor: "#004aad",
            padding: isMobile ? "6px 8px" : "10px 16px",
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        >
          Set Appointment
        </Button>
        {isMobile && <UserDrawer />}
      </Box>

      {data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item, index) => (
          <Paper elevation={2} sx={{ my: 1 }}>
            <ListItem
              key={item.appointmentNumber}
              divider={index !== data.length - 1}
            >
              <ListItemAvatar>
                <Tooltip title={item._status}>
                  <Avatar
                    sx={{
                      bgcolor: getColor(item._status).lighter,
                      color: getColor(item._status).main,
                    }}
                  >
                    {item._status === "Completed" && (
                      <CheckIcon sx={{ pointerEvents: "none" }} />
                    )}
                    {item._status === "Cancelled" && (
                      <CloseIcon sx={{ pointerEvents: "none" }} />
                    )}
                    {item._status === "Upcoming" && (
                      <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                    )}
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle1">{`Appointment ${item._id}`}</Typography>
                }
                secondary={`${item.dayOfWeek}, ${item._date}`}
              />
              {isMobile && (
                <ListItemText
                  sx={{ ml: 4 }}
                  primary={
                    <Typography variant="subtitle1">
                      {" "}
                      {`${item.startTime} - ${item.endTime}`}
                    </Typography>
                  }
                />
              )}
              {isMobile && (
                <ListItemSecondaryAction>
                  <Tooltip title={item._status === "Upcoming" ? "Actions" : ""}>
                    <MoreVertIcon
                      onClick={item._status === "Upcoming" ? handleClick : null}
                      sx={{
                        cursor:
                          item._status === "Upcoming" ? "pointer" : "default",
                        color:
                          item._status === "Upcoming"
                            ? "text.secondary"
                            : "text.disabled",
                        pointerEvents:
                          item._status === "Upcoming" ? "auto" : "none",
                      }}
                    />
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                    }}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    elevation={2}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      sx={{ color: "error.main" }}
                    >
                      Cancel
                    </MenuItem>
                  </Menu>
                </ListItemSecondaryAction>
              )}
              {!isMobile && (
                <ListItemSecondaryAction>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ marginRight: isMobile ? 0 : 2 }}
                    >
                      {`${item.startTime} - ${item.endTime}`}
                    </Typography>

                    <Tooltip
                      title={item._status === "Upcoming" ? "Actions" : ""}
                    >
                      <MoreVertIcon
                        onClick={
                          item._status === "Upcoming" ? handleClick : null
                        }
                        sx={{
                          cursor:
                            item._status === "Upcoming" ? "pointer" : "default",
                          color:
                            item._status === "Upcoming"
                              ? "text.secondary"
                              : "text.disabled",
                          pointerEvents:
                            item._status === "Upcoming" ? "auto" : "none",
                        }}
                      />
                    </Tooltip>
                    <Menu
                      sx={{
                        mt: "45px",
                      }}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      elevation={2}
                    >
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ color: "error.main" }}
                      >
                        Cancel
                      </MenuItem>
                    </Menu>
                  </Box>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </Paper>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
        />
      </Box>
    </List>
  );
}
