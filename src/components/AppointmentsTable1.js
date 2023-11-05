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
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UserDrawer from "./common/UserDrawer";
import SetAppointmentForm from "./SetAppointmentForm";
import EditAppointmentForm from "./EditAppointmentForm";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  const [appointmentNum, setAppointmentNumber] = useState(null);
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
    setAppointmentNumber(appointmentNum);
  };

  const handleSetAppointmentClick = () => {
    setShowForm(true);
  };
  const handleClick = (event, appointmentNum) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
    setAppointmentNumber(appointmentNum);
  };
  const handleCancel = async () => {
    axios
      .post("http://localhost:3001/cancel-appointment", {
        _appointmentNum: appointmentNum,
        _status: "Cancelled",
      })
      .then((response) => {
        toast.success("Appointment canceled successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
      });
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
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      axios
        .get(`http://localhost:3001/appointment?userName=${storedUsername}`)
        .then((response) => {
          setAppointments(response.data);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, []);

  const isMobile = useMediaQuery("(max-width:600px)");

  if (showForm) {
    return <SetAppointmentForm goBack={handleClose} />; // Pass the handleClose function
  }

  if (showEditForm) {
    return (
      <EditAppointmentForm
        goBack={handleClose}
        appointmentNum={appointmentNum}
      />
    );
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
        {!isMobile ? (
          <Button
            variant="contained"
            onClick={handleSetAppointmentClick}
            sx={{
              backgroundColor: "#004aad",
            }}
          >
            Set Appointment
          </Button>
        ) : (
          <IconButton
            color="primary"
            onClick={handleSetAppointmentClick}
            sx={{
              color: "#004aad",
            }}
          >
            <AddCircleIcon />
          </IconButton>
        )}
        {isMobile && (
          <UserDrawer onActiveComponentChange={props.onActiveComponentChange} />
        )}
      </Box>

      {appointments
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item, index) => (
          <Paper elevation={2} sx={{ my: 1 }}>
            <ListItem
              key={item.appointmentNumber}
              divider={index !== appointments.length - 1}
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
                  <Typography variant="subtitle1">{`Appointment ${item._appointmentNum}`}</Typography>
                }
                secondary={`${item._note}, ${item._date}`}
              />
              {isMobile && (
                <ListItemText
                  sx={{ ml: 4 }}
                  primary={
                    <Typography variant="subtitle1">
                      {" "}
                      {`${item._time} `}
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
                      {`${item._time} `}
                    </Typography>
                  )}
                  <Tooltip title={item._status === "Upcoming" ? "Actions" : ""}>
                    <MoreVertIcon
                      onClick={(event) =>
                        item._status === "Upcoming"
                          ? handleClick(event, item._appointmentNum)
                          : null
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
                    sx={{ mt: "45px" }}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={menuOpen}
                    onClose={handleClose}
                    elevation={2}
                  >
                    <MenuItem onClick={() => handleEditClick(appointmentNum)}>
                      Edit
                    </MenuItem>
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
          count={Math.ceil(appointments.length / itemsPerPage)}
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
          <Button
            onClick={() => handleCancel(appointmentNum)}
            sx={{ color: "error.main" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}
