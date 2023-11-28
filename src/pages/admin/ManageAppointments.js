import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Typography from "../../components/common/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";

import {
  Dialog,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Divider,
  Modal,
  InputAdornment,
  Paper,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
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
  const [completedAppointments, setCompletedAppointments] = useState([]);
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

  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);
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

  const handleComplete = (appointmentNum, dateTime, fname, lname) => {
    axios
      .post("http://localhost:3001/complete-appointment-admin", {
        appointmentNum: appointmentNum,
        dateTime: dateTime,
        date: formattedDate,
        name: fname + "_" + lname,
      })
      .then((response) => {
        toast.success("Appointment completed successfully");
        const updatedEvents = formattedEvents.map((event) =>
          event._appointmentNum === appointmentNum
            ? { ...event, _status: "Completed", backgroundColor: "green" }
            : event
        );

        setFormattedEvents(updatedEvents);
        setCompletedAppointments([...completedAppointments, appointmentNum]);
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Completion error");
        console.error("Error completing appointment", error);
      });
    setOpen(false);
  };

  const handleRescheduleSubmit = (appointmentNum, dateTime2, fname, lname) => {
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
        date: formattedDate,
        name: fname + "_" + lname,
      })
      .then((response) => {
        toast.success("Appointment rescheduled successfully");
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
    const isCompleted = eventInfo.event.extendedProps._status === "Completed";
    const icon = isCancelled ? (
      <CancelIcon sx={{ fontSize: "16px" }} />
    ) : isCompleted ? (
      <CheckCircleIcon sx={{ fontSize: "16px" }} />
    ) : (
      <AccessTimeFilledIcon sx={{ fontSize: "16px" }} />
    );

    return (
      <Box
        sx={{
          color: "white",
          m: 1,
          backgroundColor: isCancelled
            ? "error.light"
            : isCompleted
            ? "success.light"
            : "info.light",
          p: 1,
          overflow: "hidden",
          wordWrap: "break-word",
          borderRadius: 1,
          cursor: "pointer",

          whiteSpace: "normal",
        }}
      >
        <Typography variant="h6">
          {eventInfo.timeText}m {icon}
        </Typography>
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

  const handleCancelSubmit = (appointmentNum, dateTime, fname, lname) => {
    if (cancelReason) {
      const updatedEvents = formattedEvents.filter(
        (event) => event._appointmentNum !== selectedEvent._appointmentNum
      );
      axios
        .post("http://localhost:3001/cancel-appointment-admin", {
          appointmentNum: appointmentNum,
          _status: "Cancelled",
          _cancelReason: cancelReason,
          date: formattedDate,
          dateTime: dateTime,
          name: fname + "_" + lname,
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
    <Box sx={{ my: 4, mx: 12 }}>
      <Typography
        variant="h3"
        marked="left"
        style={{ fontWeight: "bold", fontSize: "30px" }}
        gutterBottom
      >
        Manage Appointments
      </Typography>
      <Paper
        sx={{
          mt: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={formattedEvents}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          height={"auto"}
        />
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "8px",

              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2,
              }}
            >
              {" "}
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {`Appointment #${selectedEvent?.extendedProps._appointmentNum}`}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider
              style={{ borderStyle: "dashed", borderColor: "#bd8512" }}
            />

            <Box sx={{ my: 2 }}>
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

                  {selectedEvent?.extendedProps._status !== "Cancelled" &&
                    selectedEvent?.extendedProps._status !== "Completed" && (
                      <Box sx={{ mb: 2 }}>
                        <Button
                          onClick={() =>
                            handleComplete(
                              selectedEvent?.extendedProps._appointmentNum,
                              selectedEvent?.extendedProps._dateTime,
                              selectedEvent?.extendedProps._fName,
                              selectedEvent?.extendedProps._lName
                            )
                          }
                          sx={{ mr: 1 }}
                          variant="contained"
                          className="MuiButton-success"
                          startIcon={<CheckCircleIcon />}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="contained"
                          className="MuiButton-warning"
                          sx={{ mr: 1 }}
                          onClick={handleReschedule}
                          startIcon={<ScheduleIcon />}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="contained"
                          className="MuiButton-error"
                          onClick={handleCancel}
                          startIcon={<CancelIcon />}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                </>
              )}

              {view === "reschedule" && (
                <>
                  <DialogContentText sx={{ mb: 1 }}>
                    Reschedule Appointment
                  </DialogContentText>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date"
                            name="Schedule"
                            required
                            fullWidth
                            value={userData.Schedule}
                            InputLabelProps={{ shrink: true }}
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
                    </Grid>

                    <Grid item xs={6}>
                      <Box>
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
                            InputLabelProps={{ shrink: true }}
                            onChange={(date) => {
                              setUserData({
                                ...userData,
                                time: date.format("HH:mm"),
                              });
                            }}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Grid>
                  </Grid>
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
                        row={true}
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
                          selectedEvent?.extendedProps._appointmentNum,
                          selectedEvent?.extendedProps._dateTime,
                          selectedEvent?.extendedProps._fName,
                          selectedEvent?.extendedProps._lName
                        )
                      }
                      disabled={
                        !userData.time ||
                        !userData.Schedule ||
                        !rescheduleReason
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
                          selectedEvent?.extendedProps._appointmentNum,
                          selectedEvent?.extendedProps._dateTime,
                          selectedEvent?.extendedProps._fName,
                          selectedEvent?.extendedProps._lName
                        )
                      }
                      disabled={!cancelReason}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Modal>
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
    </Box>
  );
};

export default ManageAppointments;
