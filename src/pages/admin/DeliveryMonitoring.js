import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import { Grid, Paper, Avatar, Box, Button } from "@mui/material";
import Title from "./components/Title";

import TripOngoing from "./TripOngoing";
import truckIcon from "../../assets/truck.png";

const mapStyles = {
  height: "450px",
  width: "100%",
};

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
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Ongoing Trips</Title>
            <TripOngoing onFindClick={handleFindClick} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryMonitoring;
