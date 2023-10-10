import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  TextField,
  Button,
  Select,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
import Title from "./components/Title";

const ManageAppointments = () => {
  const handleRescheduleSubmit = () => {
    const updatedEvents = formattedEvents.map((event) =>
      event.id === selectedEvent.id ? { ...event, start: newDateTime } : event
    );
    setFormattedEvents(updatedEvents);
    setOpen(false); // Add this line to close the modal form
  };

  const renderEventContent = (eventInfo) => {
    return (
      <Box
        sx={{
          color: "white",
          backgroundColor: "secondary.main",
          p: 1,
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        <Typography variant="h6">{eventInfo.timeText}m</Typography>
        <br />
        <Typography variant="caption">{eventInfo.event.title}</Typography>
      </Box>
    );
  };

  const events = [
    {
      id: "123456",
      name: "Lance Enriquez",
      contactNo: "09774858483",
      dateTime: "2023-10-08T09:30",
      type: "Order Placement",
    },
    {
      id: "123457",
      name: "Nikko Dela Cruz",
      contactNo: "09774852383",
      dateTime: "2023-10-12T12:30",
      type: "Follow Up",
    },
    // more events here
  ];

  const [newDateTime, setNewDateTime] = useState("");

  const [formattedEvents, setFormattedEvents] = useState(
    events.map((event) => ({
      ...event,
      start: event.dateTime,
      title: `${event.name} - ${event.type}`,
    }))
  );

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");

  const [view, setView] = useState("details");
  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleReschedule = () => {
    setView("reschedule");
  };

  const handleCancel = () => {
    setView("cancel");
  };
  const handleConfirmCancel = () => {
    if (view === "cancel") {
      const updatedEvents = formattedEvents.filter(
        (event) => event.id !== selectedEvent.id
      );
      setFormattedEvents(updatedEvents);
    } else if (view === "reschedule") {
      const updatedEvents = formattedEvents.map((event) =>
        event.id === selectedEvent.id ? { ...event, start: newDateTime } : event
      );
      setFormattedEvents(updatedEvents);
    }
    setOpen(false);
    setConfirmOpen(false);
    setView("details"); // reset view state when closing the dialog
  };
  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false);
    setView("details"); // reset view state when closing the dialog
  };

  const handleCancelSubmit = () => {
    if (cancelReason) {
      const updatedEvents = formattedEvents.filter(
        (event) => event.id !== selectedEvent.id
      );
      setFormattedEvents(updatedEvents);
      setOpen(false); // Add this line to close the modal form
    } else {
      alert("Please provide a reason for cancellation.");
    }
  };

  // State variable to track if all fields are filled
  const [isFormFilled, setIsFormFilled] = useState(false);

  // Function to check if all fields are filled
  const checkFormFilled = () => {
    if (newDateTime && rescheduleReason && cancelReason) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  // Call this function every time a field value changes
  useEffect(() => {
    checkFormFilled();
  }, [newDateTime, rescheduleReason, cancelReason]);
  return (
    <Paper sx={{ p: 2 }}>
      <Title>Manage Appointments</Title>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height={"auto"}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Appointment #${selectedEvent?.id}`}</DialogTitle>
        <DialogContent>
          {view === "details" && (
            <>
              <Box sx={{ my: 2 }}>
                <TextField
                  label="Name"
                  value={selectedEvent?.extendedProps.name}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Contact Number"
                  value={selectedEvent?.extendedProps.contactNo}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Appointment Type"
                  value={selectedEvent?.extendedProps.type}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Date and Time"
                  type="datetime-local"
                  value={selectedEvent?.start}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  onClick={handleReschedule}
                >
                  Reschedule
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
          {view === "reschedule" && (
            <>
              <DialogContentText>Reschedule Appointment</DialogContentText>
              <Box sx={{ my: 2 }}>
                <TextField
                  label="Date and Time"
                  type="datetime-local"
                  value={newDateTime}
                  onChange={(e) => setNewDateTime(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start" />,
                  }}
                  fullWidth
                  required
                />
              </Box>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="reschedule-reason-label">
                  Reason for rescheduling
                </InputLabel>
                <Select
                  labelId="reschedule-reason-label"
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  label="Reason for rescheduling"
                >
                  <MenuItem value="Conflict in Schedule">
                    Conflict in Schedule
                  </MenuItem>
                  <MenuItem value="Change in Availability">
                    Change in Availability
                  </MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() => setView("details")}
                >
                  Go Back
                </Button>

                <Button
                  variant="contained"
                  onClick={handleRescheduleSubmit}
                  disabled={!newDateTime || !rescheduleReason}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}

          {view === "cancel" && (
            <>
              <DialogContentText>Cancel Appointment</DialogContentText>

              <FormControl fullWidth sx={{ my: 2 }}>
                <InputLabel id="cancel-reason-label">
                  Reason for cancellation
                </InputLabel>
                <Select
                  labelId="cancel-reason-label"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  label="Reason for cancellation"
                  required
                >
                  <MenuItem value="Conflict in Schedule">
                    Conflict in Schedule
                  </MenuItem>
                  <MenuItem value="Change in Availability">
                    Change in Availability
                  </MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setView("details")}
                  sx={{ mr: 2 }}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCancelSubmit}
                  disabled={!cancelReason}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please note, once you proceed, the changes will be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Submit
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManageAppointments;
