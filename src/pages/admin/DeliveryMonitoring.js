import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import axios from "axios";
import { Grid, Paper, Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import Title from "./components/Title";
import TripRecords from "./TripRecords";

import TripOngoing from "./TripOngoing";
import truckIcon from "../../assets/truck.png";

const mapStyles = {
  height: "450px",
  width: "100%",
};

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "driverName", headerName: "Driver Name", flex: 2 },
  {
    field: "dateTimeCompleted",
    headerName: "Date and Time Completed",
    flex: 3,
  },
  { field: "avgSpeed", headerName: "Avg. Speed", flex: 2 },
  { field: "maxSpeed", headerName: "Max Speed", flex: 2 },
  { field: "harshBraking", headerName: "Harsh Braking", flex: 2 },
  { field: "suddenAcceleration", headerName: "Sudden Acceleration", flex: 2 },
  {
    field: "eSignature",
    headerName: "E-Signature",
    flex: 2,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="E-Signature"
        style={{ width: "100%", height: "auto" }}
      />
    ),
  },
];

const rows = [
  {
    id: 1,
    driverName: "John Doe",
    dateTimeCompleted: "2023-11-19 09:05:25",
    avgSpeed: "60 km/h",
    maxSpeed: "80 km/h",
    harshBraking: "3",
    suddenAcceleration: "4",
    eSignature:
      "https://signaturely.com/wp-content/uploads/2020/04/mark-cuban-signature-signaturely-image.png",
  },
  // Add more rows as needed
];
function DeliveryMonitoring() {
  const [truckLocations, setTruckLocations] = useState({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [foundLocation, setFoundLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [lockZoom, setLockZoom] = useState(false);
  const [hoveredTruck, setHoveredTruck] = useState(null);
  const handleLoad = () => {
    setIsMapLoaded(true);
  };

  const fetchTruckLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-location");
      return response.data;
    } catch (error) {
      console.error("Error fetching truck locations:", error);
      return {};
    }
  };

  const handleCenterMap = () => {
    setFoundLocation(null);
    handleZoomChange(5);
    setLockZoom(false);
  };

  const handleZoomChange = (newZoomLevel) => {
    if (!lockZoom) {
      setZoomLevel(newZoomLevel);
    }
  };
  function handleFindClick(id) {
    const location = truckLocations[id];
    if (location) {
      setFoundLocation(location);
      handleZoomChange(15);
      setLockZoom(true);
    }
  }

  useEffect(() => {
    fetchTruckLocations().then((data) => {
      setTruckLocations(data);
    });

    const intervalId = setInterval(() => {
      fetchTruckLocations().then((data) => {
        setTruckLocations(data);
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Title>Real-time Tracking</Title>
            <LoadScript
              googleMapsApiKey="AIzaSyAJf20RDl1D_m5wh6KGdhKPOALFM-pbMFI"
              onLoad={handleLoad}
            >
              {isMapLoaded && (
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  center={
                    foundLocation
                      ? {
                          lat: foundLocation.latitude,
                          lng: foundLocation.longitude,
                        }
                      : {
                          lat: 14.6936,
                          lng: 121.0197,
                        }
                  }
                  zoom={zoomLevel}
                  options={{
                    gestureHandling: "greedy",
                  }}
                >
                  {Object.keys(truckLocations).map((uid) => (
                    <Marker
                      key={uid}
                      position={{
                        lat: truckLocations[uid].latitude,
                        lng: truckLocations[uid].longitude,
                      }}
                      icon={{
                        url: truckIcon, // Use your custom icon URL here
                        scaledSize: new window.google.maps.Size(40, 40), // Set the desired size
                      }}
                    />
                  ))}
                </GoogleMap>
              )}
            </LoadScript>
            <Button onClick={handleCenterMap}>Center Map</Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Trip Metrics" />
                  <Tab label="Records" />
                </Tabs>
              </Box>
              {value === 0 && <TripOngoing onFindClick={handleFindClick} />}
              {value === 1 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableColumnFilter
                  disableColumnSelector
                  density="comfortable"
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryMonitoring;
