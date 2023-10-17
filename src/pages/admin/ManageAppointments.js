import React, { useState, useEffect } from "react";
import axios from "axios";
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
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Title from "./components/Title";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { toast } from "react-toastify";

const ManageAppointments = () => {
  const [events, setEvents] = useState([]);
  const [newDateTime, setNewDateTime] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [userData, setUserData] = useState({
    First: "",
    Last: "",
    Email: "",
    Phone: "",
    Agenda: "",
    Schedule: null,
    time: null,
    IsAM: true,
  });
  const [formattedEvents, setFormattedEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/get-events")
      .then((response) => {
        setEvents(response.data);
        const initialFormattedEvents = response.data.map((event) => ({
          ...event,
          start: event._dateTime,
          title: `${event._fName} ${event._lName} - ${event._note}`,
        }));
        setFormattedEvents(initialFormattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleRescheduleSubmit = (appointmentNum) => {
    const updatedEvents = formattedEvents.map((event) =>
      event._appointmentNum === selectedEvent._appointmentNum
        ? { ...event, start: newDateTime }
        : event
    );
    const { Agenda, Schedule, First, Last, Email, Phone, time, IsAM } =
      userData;
    const formattedSchedule = moment(Schedule).format("YYYY-MM-DD");
    const formattedTime = moment(time, "HH:mm").format(
      `h:mm ${IsAM ? "A" : "P"}`
    );
    const formattedTime2 = moment(time, "HH:mm").format("HH:mm");
    const dateTime = `${formattedSchedule}T${formattedTime2}`;
    axios
      .post("http://localhost:3001/update-appointment-admin", {
        appointmentNum: appointmentNum,
        _date: formattedSchedule,
        _time: formattedTime,
        _reasonResched: rescheduleReason,
        _dateTime: dateTime,
        _cancelReason: cancelReason,
      })
      .then((response) => {
        toast.success("Appointment rescheduled successfully");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Appointment already full");
        console.error("Error appointment schedule", error);
      });
    setFormattedEvents(updatedEvents);
    setOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    const isCancelled = eventInfo.event.extendedProps._status === "Cancelled";

    return (
      <Box
        sx={{
          color: "white",
          backgroundColor: isCancelled ? "red" : "secondary.main",
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
        (event) => event._appointmentNum !== selectedEvent._appointmentNum
      );
      setFormattedEvents(updatedEvents);
    } else if (view === "reschedule") {
      const updatedEvents = formattedEvents.map((event) =>
        event._appointmentNum === selectedEvent._appointmentNum
          ? { ...event, start: newDateTime }
          : event
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

  const handleCancelSubmit = (appointmentNum) => {
    if (cancelReason) {
      const updatedEvents = formattedEvents.filter(
        (event) => event._appointmentNum !== selectedEvent._appointmentNum
      );
      axios
        .post("http://localhost:3001/cancel-appointment-admin", {
          appointmentNum: appointmentNum,
          _status: "Cancelled",
          _cancelReason: cancelReason,
        })
        .then((response) => {
          toast.success("Appointment cancelled successfully");
          window.location.reload();
        })
        .catch((error) => {
          toast.error("Cancelation error");
          console.error("Error appointment schedule", error);
        });
      setFormattedEvents(updatedEvents);
      setOpen(false); // Add this line to close the modal form
    } else {
      toast.error("Please provide a reason for cancellation.");
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
        <DialogTitle>{`Appointment #${selectedEvent?.extendedProps._appointmentNum}`}</DialogTitle>
        <DialogContent>
          {view === "details" && (
            <>
              <Box sx={{ my: 2 }}>
                <TextField
                  label="Name"
                  value={
                    selectedEvent?.extendedProps._fName +
                    " " +
                    selectedEvent?.extendedProps._lName
                  }
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Contact Number"
                  value={selectedEvent?.extendedProps._phone}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Appointment Type"
                  value={selectedEvent?.extendedProps._note}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Date and Time"
                  value={selectedEvent?.extendedProps._dateTime}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>

              {selectedEvent?.extendedProps._status !== "Cancelled" && (
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
              )}
            </>
          )}
          {view === "reschedule" && (
            <>
              <DialogContentText>Reschedule Appointment</DialogContentText>
              <Box sx={{ my: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    name="Schedule"
                    required
                    fullWidth
                    value={userData.Schedule}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    shouldDisableDate={(day) => {
                      const currentDate = moment();
                      return (
                        day.day() === 0 ||
                        day.day() === 6 ||
                        day.isBefore(currentDate, "day")
                      );
                    }}
                    minDate={moment().add(1, "day")}
                    onChange={(date) => {
                      setUserData({
                        ...userData,
                        Schedule: date.toDate(),
                      });
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ my: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    minutesStep={60}
                    required
                    ampm={false}
                    minTime={
                      userData.IsAM
                        ? moment("08:00", "HH:mm")
                        : moment("13:00", "HH:mm")
                    }
                    maxTime={
                      userData.IsAM
                        ? moment("11:00", "HH:mm")
                        : moment("16:00", "HH:mm")
                    }
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(date) => {
                      setUserData({
                        ...userData,
                        time: date.format("HH:mm"), // Format the selected time
                      });
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ my: 2 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Time</FormLabel>
                  <RadioGroup
                    aria-label="Time"
                    name="time"
                    value={userData.IsAM ? "AM" : "PM"}
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        IsAM: e.target.value === "AM",
                      });
                    }}
                  >
                    <FormControlLabel
                      value="AM"
                      control={<Radio />}
                      label="AM"
                    />
                    <FormControlLabel
                      value="PM"
                      control={<Radio />}
                      label="PM"
                    />
                  </RadioGroup>
                </FormControl>
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
                  onClick={() =>
                    handleRescheduleSubmit(
                      selectedEvent?.extendedProps._appointmentNum
                    )
                  }
                  disabled={
                    !userData.time || !userData.Schedule || !rescheduleReason
                  }
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
                  onClick={() =>
                    handleCancelSubmit(
                      selectedEvent?.extendedProps._appointmentNum
                    )
                  }
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
