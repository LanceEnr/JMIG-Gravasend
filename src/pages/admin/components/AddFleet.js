import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Typography from "../../../components/common/Typography";

export default function AddFleet() {
  const [driver, setDriver] = React.useState("");
  const [drivers, setDrivers] = useState([]);

  const [driverName, setdriverName] = React.useState("");
  const [bodyNo, setbodyNo] = React.useState("");
  const [chassisNo, setchassisNo] = React.useState("");
  const [engineNo, setengineNo] = React.useState("");
  const [plateNo, setPlateNo] = React.useState("");
  const [mileage, setmileage] = React.useState("");
  const [model, setmodel] = React.useState("");
  const [plateNo2, setPlateNo2] = React.useState("");
  const status = "available";
  const [location, setLocation] = React.useState("");

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await fetch(
          "http://localhost:3001/fetch-driver-available"
        );
        if (response.ok) {
          const data = await response.json();
          const driverNames = Object.keys(data).map(
            (key) => data[key].driverName
          );
          setDrivers(driverNames);
        } else {
          console.error("Failed to fetch drivers");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchDrivers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/addTruck", {
        //id: actionId,
        driverName: driverName,
        bodyNo: bodyNo,
        chassisNo: chassisNo,
        engineNo: engineNo,
        plateNo: plateNo,
        plateNo2: plateNo2,
        mileage: mileage,
        model: model,
        status: status,
        location: location,
      });

      console.log("Truck added successfully", response.data);
      toast.success("Truck added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Truck add failed", error);
      toast.error("Truck not yet registered!");
    }
  };

  return (
    <div>
      <Box sx={{ my: 14, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Add Truck
        </Typography>
        <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      label="Body No."
                      name="bodyNo"
                      type="text"
                      fullWidth
                      onChange={(event) => setbodyNo(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Tractor No."
                      name="plateNo"
                      type="text"
                      fullWidth
                      onChange={(event) => setPlateNo(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Trailer No."
                      name="plateNo2"
                      type="text"
                      fullWidth
                      onChange={(event) => setPlateNo2(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Chassis No."
                      name="chassisNo"
                      type="text"
                      fullWidth
                      onChange={(event) => setchassisNo(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Engine No."
                      name="engineNo"
                      type="text"
                      fullWidth
                      onChange={(event) => setengineNo(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Model"
                      name="model"
                      type="text"
                      fullWidth
                      onChange={(event) => setmodel(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Mileage"
                      name="mileage"
                      type="number"
                      fullWidth
                      onChange={(event) => setmileage(event.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="driver-label">Driver</InputLabel>
                      <Select
                        labelId="driver-label"
                        id="driver-select"
                        value={driverName}
                        label="Driver"
                        onChange={(event) => setdriverName(event.target.value)}
                        required
                      >
                        {drivers.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Location</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        row={true}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                      >
                        <FormControlLabel
                          value="Pandi"
                          control={<Radio />}
                          label="Pandi"
                        />
                        <FormControlLabel
                          value="Mindanao Avenue"
                          control={<Radio />}
                          label="Mindanao Avenue"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={"/adminfleetinformation"}
                      sx={{
                        marginRight: 2,
                        color: "#83948a",
                        borderColor: "#83948a",
                      }}
                    >
                      Go Back
                    </Button>
                    <Button variant="contained" type="submit">
                      Save changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
