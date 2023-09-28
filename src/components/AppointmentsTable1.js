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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UserDrawer from "./common/UserDrawer";
import SetAppointmentForm from "./SetAppointmentForm";
import EditAppointmentForm from "./EditAppointmentForm";

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

export default function AppointmentsTable1(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [showForm, setShowForm] = useState(false); // Add this line
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setShowEditForm(true);
  };

  const handleSetAppointmentClick = () => {
    setShowForm(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowForm(false);
    setShowEditForm(false);
    setMenuOpen(false); // Close the menu
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  if (showForm) {
    return <SetAppointmentForm goBack={handleClose} />; // Pass the handleClose function
  }

  if (showEditForm) {
    return <EditAppointmentForm goBack={handleClose} />;
  }

  return (
    <List
      component="nav"
      sx={{
        px: 0,
        py: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center" // Align items along the cross axis
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#004aad",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            my: 2,
          }}
        >
          <EventNoteIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          Appointments
        </Typography>
        <Button
          variant="outlined"
          onClick={handleSetAppointmentClick} // Use handleSetAppointmentClick here
          sx={{
            color: "#004aad",
            borderColor: "#004aad",
            padding: isMobile ? "4px 6px" : "6px 8px",
            fontSize: isMobile ? "0.55rem" : "0.875rem",
            mx: isMobile ? 2 : 0,
            my: 0,
          }}
        >
          Set Appointment
        </Button>
        {isMobile && (
          <UserDrawer onActiveComponentChange={props.onActiveComponentChange} />
        )}
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
              <ListItemSecondaryAction>
                <Box display="flex" alignItems="center">
                  {!isMobile && (
                    <Typography
                      variant="subtitle1"
                      noWrap
                      sx={{ marginRight: 2 }}
                    >
                      {`${item.startTime} - ${item.endTime}`}
                    </Typography>
                  )}
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
                    sx={{ mt: "45px" }}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={menuOpen}
                    onClose={handleClose}
                    elevation={2}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem
                      onClick={handleOpenDialog}
                      sx={{ color: "error.main" }}
                    >
                      Cancel
                    </MenuItem>
                  </Menu>
                </Box>
              </ListItemSecondaryAction>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {"Are you sure you want to cancel the appointment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm if you wish to cancel this appointment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleClose} sx={{ color: "error.main" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}
