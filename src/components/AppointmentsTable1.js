import React, { useState } from "react";
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
} from "@mui/material";
import MainCard from "./common/MainCard";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const data = [
  {
    status: "Upcoming",
    appointmentNumber: "#002434",
    date: "5 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Cancelled",
    appointmentNumber: "#002435",
    date: "6 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Completed",
    appointmentNumber: "#002436",
    date: "7 August",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
  },
  {
    status: "Completed",
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

const getColor = (status) => {
  switch (status) {
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

export default function OrdersTable1() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
          border: "1px solid",
          borderColor: "#E6EBF1",
          borderRadius: 1,
        }}
      >
        {data.map((item, index) => (
          <ListItem
            key={item.appointmentNumber}
            divider={index !== data.length - 1}
          >
            <ListItemAvatar>
              <Tooltip title={item.status}>
                <Avatar
                  sx={{
                    bgcolor: getColor(item.status).lighter,
                    color: getColor(item.status).main,
                  }}
                >
                  {item.status === "Completed" && (
                    <CheckIcon sx={{ pointerEvents: "none" }} />
                  )}
                  {item.status === "Cancelled" && (
                    <CloseIcon sx={{ pointerEvents: "none" }} />
                  )}
                  {item.status === "Upcoming" && (
                    <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                  )}
                </Avatar>
              </Tooltip>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Appointment ${item.appointmentNumber}`}</Typography>
              }
              secondary={`${item.dayOfWeek}, ${item.date}`}
            />
            <ListItemSecondaryAction>
              <Box display="flex" alignItems="center" spacing={5}>
                <Typography variant="subtitle1" noWrap sx={{ marginRight: 2 }}>
                  {`${item.startTime} - ${item.endTime}`}
                </Typography>
                <Tooltip title={item.status === "Upcoming" ? "Actions" : ""}>
                  <MoreVertIcon
                    onClick={item.status === "Upcoming" ? handleClick : null}
                    sx={{
                      cursor:
                        item.status === "Upcoming" ? "pointer" : "default",
                      color:
                        item.status === "Upcoming"
                          ? "text.secondary"
                          : "text.disabled",
                      pointerEvents:
                        item.status === "Upcoming" ? "auto" : "none",
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
                  elevation={1}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
                    Cancel
                  </MenuItem>
                </Menu>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </MainCard>
  );
}
