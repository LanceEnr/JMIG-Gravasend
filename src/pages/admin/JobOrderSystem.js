import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Typography from "../../components/common/Typography";

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
} from "@mui/material";
import Title from "./components/Title";
import { toast } from "react-toastify";

const JobOrderModal = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  jobOrder,
  formData,
  setFormData,
}) => {
  const [origin, setOrigin] = useState(formData.origin);
  const [destination, setDestination] = useState(formData.destination);
  const [driverName, setDriverName] = useState(formData.driverName);
  const [cargo, setCargo] = useState(formData.cargo);
  const [weight, setWeight] = useState(formData.weight);
  const [dateTime, setDateTime] = useState(formData.dateTime);
  const [drivers, setDrivers] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [UID, setUID] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    const intValue = parseInt(value, 10);
    setOrigin(formData.origin);
    setDestination(formData.destination);
    setDriverName(formData.driverName);
    setCargo(formData.cargo);
    setWeight(formData.weight);
    setProductName(formData.cargo);
    setDateTime(formData.dateTime);
    setInstructions(formData.instructions);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/get-products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await fetch(
          "http://localhost:3001/fetch-fleet-available"
        );
        if (response.ok) {
          const data = await response.json();
          const driverNames = Object.keys(data).map(
            (key) => data[key].driverName
          );
          const uid = Object.keys(data).map((key) => data[key].id);
          setDrivers(driverNames);
          setUID(uid);
        } else {
          console.error("Failed to fetch drivers");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchDrivers();
  }, []);

  const handleSubmit = () => {
    if (isFormComplete) {
      onSubmit(formData, jobOrder);
    }
  };

  const isFormComplete = () => {
    return (
      origin !== "" &&
      destination !== "" &&
      driverName !== "" &&
      cargo !== "" &&
      weight !== "" &&
      dateTime !== "" &&
      instructions !== ""
    );
  };

  useEffect(() => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 1);

    currentDate.setHours(0, 0, 0, 0);

    const minDateFormatted = currentDate.toISOString().slice(0, 16);

    setDateTime(minDateFormatted);
  }, []);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {jobOrder ? "Edit Job Order" : "Create Job Order"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="driver-label">Driver Name</InputLabel>
            <Select
              labelId="driver-label"
              id="driverName"
              name="driverName"
              value={driverName}
              onChange={(e) => handleFieldChange("driverName", e.target.value)}
              fullWidth
              required
              label="Driver Name"
            >
              {drivers.map((driverName) => (
                <MenuItem key={driverName} value={driverName}>
                  {driverName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="origin-label">Origin</InputLabel>
          <Select
            labelId="origin-label"
            value={origin}
            onChange={(e) => handleFieldChange("origin", e.target.value)}
            label="Origin"
            required
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
            onChange={(e) => handleFieldChange("destination", e.target.value)}
            label="Destination"
            required
          >
            <MenuItem value="Pandi">Pandi</MenuItem>
            <MenuItem value="Mindanao">Mindanao Ave.</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="product-label">Product</InputLabel>
          <Select
            labelId="product-label"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => handleFieldChange("cargo", e.target.value)}
            label="Product"
          >
            {products.map((product) => (
              <MenuItem key={product._inventoryID} value={product._itemName}>
                {product._itemName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Weight"
            type="number"
            onChange={(e) => handleFieldChange("weight", e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Instructions"
            onChange={(e) => handleFieldChange("instructions", e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Date Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => handleFieldChange("dateTime", e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start" />,
              required: true,
              inputProps: { min: dateTime },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isFormComplete}
        >
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

const ValidationDialog = ({ isOpen, onConfirm, onCancel, formData }) => {
  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/addJob",
        formData
      );
      if (response.status === 200) {
        console.log("Data submitted successfully!");
        toast.success("Job added successfull!");
      } else {
        console.error("Failed to submit data");
        toast.error("Please try again!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    onConfirm();
  };

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note, once you proceed, the changes will be saved.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          Submit
        </Button>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main component
const JobOrderSystem = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [action, setAction] = useState(null);
  const [formattedEvents, setFormattedEvents] = useState([]);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    driverName: "",
    cargo: "",
    weight: "",
    dateTime: "",
    UID: "",
    instructions: "",
  });

  useEffect(() => {
    async function fetchJobOrders() {
      try {
        const jobOrdersResponse = await axios.get(
          "http://localhost:3001/fetch-job-orders"
        );
        const jobRecordsResponse = await axios.get(
          "http://localhost:3001/fetch-job-records"
        );

        if (
          jobOrdersResponse.status === 200 &&
          jobRecordsResponse.status === 200
        ) {
          const jobOrdersData = jobOrdersResponse.data;
          const jobRecordsData = jobRecordsResponse.data;

          const uniqueDateTimes = new Set();

          const jobOrders = Object.values(jobOrdersData)
            .map((jobOrderData) => {
              const driverName = jobOrderData.driverName;
              const cargo = jobOrderData.cargo;
              const weight = jobOrderData.weight;
              const dateTime = jobOrderData.dateTime;

              if (!uniqueDateTimes.has(dateTime)) {
                uniqueDateTimes.add(dateTime);

                return {
                  title: `${driverName} - ${cargo} - ${weight}`,
                  start: dateTime,
                };
              }

              return null;
            })
            .filter(Boolean);

          const jobRecords = Object.values(jobRecordsData)
            .map((uidData) => {
              return Object.values(uidData).map((idData) => {
                const driverName = idData.driverName;
                const cargo = idData.cargo;
                const weight = idData.weight;
                const dateTime = idData.dateTime;
                if (!uniqueDateTimes.has(dateTime)) {
                  uniqueDateTimes.add(dateTime);

                  return {
                    title: `${driverName} - ${cargo} - ${weight}`,
                    start: dateTime,
                  };
                }

                return null;
              });
            })
            .flat()
            .filter(Boolean);

          const mergedEvents = [...jobOrders, ...jobRecords];

          setEvents(mergedEvents);
        } else {
          console.error("Failed to fetch job orders or job records");
        }
      } catch (error) {
        console.error("Error fetching job orders or job records:", error);
      }
    }

    fetchJobOrders();
  }, []);

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
        event.setExtendedProp("origin", jobOrderData.origin);
        event.setExtendedProp("destination", jobOrderData.destination);
      } else {
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
    setSelectedEvent(info);

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
    <Box sx={{ my: 3, mx: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography
            variant="h3"
            marked="left"
            style={{ fontWeight: "bold", fontSize: "30px" }}
          >
            Job Orders
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateClick}
          >
            Create Job Order
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
        <JobOrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          jobOrder={selectedEvent}
          formData={formData}
          setFormData={setFormData}
        />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          width="100%"
        />

        <ValidationDialog
          isOpen={validationDialogOpen}
          onConfirm={() => {
            action(formData);
            setValidationDialogOpen(false);
          }}
          onCancel={() => setValidationDialogOpen(false)}
          formData={formData} // Pass formData as a prop
        />
      </Paper>
    </Box>
  );
};

export default JobOrderSystem;
