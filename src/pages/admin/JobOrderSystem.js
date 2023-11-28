import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Typography from "../../components/common/Typography";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  IconButton,
  DialogContentText,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Modal,
  Divider,
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
        const response = await fetch("http://localhost:3001/fetch-trucks");
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
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {jobOrder ? "Edit Job Order" : "Create Job Order"}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider style={{ borderStyle: "dashed", borderColor: "#bd8512" }} />

        <Box sx={{ my: 2 }}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="driver-label">Driver Name:</InputLabel>
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
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="origin-label">Origin</InputLabel>
            <Select
              labelId="origin-label"
              value={origin}
              onChange={(e) => handleFieldChange("origin", e.target.value)}
              label="Origin"
              required
            >
              <MenuItem value="DFS Pampanga">DFS Pampanga</MenuItem>
              <MenuItem value="Gainersand Corporation">
                Gainersand Corporation
              </MenuItem>
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
              onChange={(e) => handleFieldChange("productName", e.target.value)}
              label="Product"
            >
              {products.map((product, index) => (
                <MenuItem key={index} value={product}>
                  {product}
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
              onChange={(e) =>
                handleFieldChange("instructions", e.target.value)
              }
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
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
        </Box>
      </Box>
    </Modal>
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
                  title: `${driverName} - ${cargo} - ${weight} cu. mt.`,
                  start: dateTime,
                  status: "order",
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
                    title: `${driverName} - ${cargo} - ${weight} cu. mt.`,
                    start: dateTime,
                    status: "records",
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

  const handleEventClick = ({ info }) => {
    setSelectedEvent(info);

    setModalOpen(true);
  };

  function renderEventContent(eventInfo) {
    const backgroundColor =
      eventInfo.event.extendedProps.status === "order"
        ? "success.light"
        : "info.light";
    const icon =
      eventInfo.event.extendedProps.status === "order" ? (
        <CheckCircleIcon fontSize="small" sx={{ fontSize: "16px" }} />
      ) : (
        <LocalShippingIcon fontSize="small" sx={{ fontSize: "16px" }} />
      );
    return (
      <Box
        sx={{
          color: "white",
          backgroundColor: backgroundColor,
          p: 1,
          m: 1,
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "normal",
          borderRadius: 1,
          cursor: "pointer",
        }}
      >
        <Typography variant="h6">
          {eventInfo.timeText}m {icon}
        </Typography>
        <br />
        <Typography variant="caption">{eventInfo.event.title}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ my: 4, mx: 12 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Job Orders
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateClick}
          startIcon={<AddIcon />}
          sx={{ ml: 1 }}
        >
          Create Job Order
        </Button>
      </Box>
      <Paper
        sx={{
          mt: 3,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
