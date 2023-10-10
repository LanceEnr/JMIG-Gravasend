import React, { useState } from "react";
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
} from "@mui/material";

const ManageAppointments = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleDateChange = (date) => {
    if (
      window.confirm(
        "Are you sure? Please note, once you proceed, the changes will be saved."
      )
    ) {
      selectedEvent.setStart(date);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    if (cancelReason) {
      setConfirmOpen(true);
    }
  };

  const handleConfirmCancel = () => {
    selectedEvent.remove();
    setOpen(false);
    setConfirmOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "Appointment 1", date: "2023-10-08", reason: "Check-up" },
          // more events here
        ]}
        eventClick={handleEventClick}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Appointment 1</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Reason for appointment"
              value={selectedEvent?.extendedProps.reason}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Date and time"
              type="datetime-local"
              defaultValue={selectedEvent?.start}
              onChange={(e) => handleDateChange(e.target.value)}
              fullWidth
            />
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="reason">Reason for Cancellation</InputLabel>
            <Select
              labelId="reason"
              value="reason"
              label="Reason for Cancellation" // Add this line
            >
              <MenuItem value="Conflicting Schedule">
                Conflicting Schedule
              </MenuItem>
              <MenuItem value="Change in Availability">
                Change in Availability
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Save Changes
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary" autoFocus>
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
      </Dialog>
    </div>
  );
};

export default ManageAppointments;
