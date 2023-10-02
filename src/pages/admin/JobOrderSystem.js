import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  DialogContentText,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";

// Modal component for creating and editing job orders
const JobOrderModal = ({ isOpen, onClose, onSubmit, onDelete, jobOrder }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [driverName, setDriverName] = useState("");
  const [cargo, setCargo] = useState("");
  const [weight, setWeight] = useState("");
  const [dateTime, setDateTime] = useState("");
  const handleSubmit = () => {
    onSubmit(
      { driverName, cargo, weight, dateTime, origin, destination },
      jobOrder
    );
    onClose();
  };

  useEffect(() => {
    if (jobOrder) {
      setDriverName(jobOrder.extendedProps.driverName);
      setCargo(jobOrder.extendedProps.cargo);
      setWeight(jobOrder.extendedProps.weight);
      setDateTime(jobOrder.start.toISOString().substring(0, 16));
      setOrigin(jobOrder.extendedProps.origin);
      setDestination(jobOrder.extendedProps.destination);
    } else {
      setOrigin("");
      setDestination("");
      setDriverName("");
      setCargo("");
      setWeight("");
      setDateTime("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {jobOrder ? "Edit Job Order" : "Create Job Order"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Driver Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            fullWidth
          />
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="origin-label">Origin</InputLabel>
          <Select
            labelId="origin-label"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            label="Origin" // Add this line
          >
            <MenuItem value="Quarry A">Quarry A</MenuItem>
            <MenuItem value="Quarry B">Quarry B</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="destination-label">Destination</InputLabel>
          <Select
            labelId="destination-label"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            label="Destination" // Add this line
          >
            <MenuItem value="Location A">Location A</MenuItem>
            <MenuItem value="Location B">Location B</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="cargo-label">Cargo</InputLabel>
          <Select
            labelId="cargo-label"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            label="Cargo" // Add this line
          >
            <MenuItem value="Sand">Sand</MenuItem>
            <MenuItem value="Gravel">Gravel</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Date Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
        {jobOrder && (
          <Button onClick={() => onDelete(jobOrder)} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ValidationDialog = ({ isOpen, onConfirm, onCancel }) => (
  <Dialog open={isOpen} onClose={onCancel}>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please note, once you proceed, the changes will be saved.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} color="primary">
        Yes
      </Button>
      <Button onClick={onCancel} color="secondary">
        No
      </Button>
    </DialogActions>
  </Dialog>
);

// Main component
const JobOrderSystem = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const [action, setAction] = useState(null);
  const handleCreateClick = () => {
    setSelectedEvent(null); // Clear selected event
    setModalOpen(true);
  };
  const handleDelete = (event) => {
    setAction(() => () => {
      setEvents(events.filter((e) => e.id !== event.id)); // Compare ids here
      setModalOpen(false);
    });
    setValidationDialogOpen(true);
  };

  const [validationDialogOpen, setValidationDialogOpen] = useState(false);

  const handleSubmit = (jobOrderData, event) => {
    setAction(() => () => {
      if (event) {
        // Edit existing event
        event.setProp(
          "title",
          `${jobOrderData.driverName} - ${jobOrderData.cargo} - ${jobOrderData.weight} - ${jobOrderData.origin} to ${jobOrderData.destination}`
        );

        event.setStart(jobOrderData.dateTime);
        event.setExtendedProp("driverName", jobOrderData.driverName);
        event.setExtendedProp("cargo", jobOrderData.cargo);
        event.setExtendedProp("weight", jobOrderData.weight);
        // Add these lines
        event.setExtendedProp("origin", jobOrderData.origin);
        event.setExtendedProp("destination", jobOrderData.destination);
      } else {
        // Create new event
        setEvents([
          ...events,
          {
            id: Math.random().toString(),
            title: `${jobOrderData.driverName} - ${jobOrderData.cargo} - ${jobOrderData.weight} - ${jobOrderData.origin} to ${jobOrderData.destination}`,
            start: jobOrderData.dateTime,
            extendedProps: {
              driverName: jobOrderData.driverName,
              cargo: jobOrderData.cargo,
              weight: jobOrderData.weight,
              // Add these lines
              origin: jobOrderData.origin,
              destination: jobOrderData.destination,
            },
          },
        ]);
      }
      setModalOpen(false);
    });
    setValidationDialogOpen(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setModalOpen(true);
  };

  function renderEventContent(eventInfo) {
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
  }
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateClick} // Use handleCreateClick here
          sx={{ mb: 2 }}
        >
          Create Job Order
        </Button>
      </Box>
      <JobOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleDelete} // Pass handleDelete here
        jobOrder={selectedEvent}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height={"auto"} // Adjust this value as needed
      />

      <ValidationDialog
        isOpen={validationDialogOpen}
        onConfirm={() => {
          action();
          setValidationDialogOpen(false);
        }}
        onCancel={() => setValidationDialogOpen(false)}
      />
    </Paper>
  );
};

export default JobOrderSystem;
