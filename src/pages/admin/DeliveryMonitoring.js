import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Grid, Paper, Avatar, Box } from "@mui/material";
import Title from "./components/Title";
import Typography from "antd/es/typography/Typography";
import SpeedIcon from "@mui/icons-material/Speed";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import TripOngoing from "./TripOngoing";
import truckIcon from "../../assets/truck.png";

const mapStyles = {
  height: "450px",
  width: "1000px",
};

function DeliveryMonitoring() {
  const [truckLocations, setTruckLocations] = useState({});
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [foundLocation, setFoundLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12);
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
  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };
  function handleFindClick(id) {
    const location = truckLocations[id];
    if (location) {
      setFoundLocation(location);
      handleZoomChange(15);
    } else {
      setFoundLocation(null);
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
      <Title>Delivery Monitoring</Title>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h3"
              style={{ color: "#3f51b5", marginBottom: "10px" }}
            >
              Real-time tracking
            </Typography>
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
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Ongoing Trips</Title>
            <TripOngoing onFindClick={handleFindClick} />;
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryMonitoring;
