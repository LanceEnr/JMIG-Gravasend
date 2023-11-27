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
  InputAdornment,
} from "@mui/material";
import Typography from "../../../components/common/Typography";

export default function EditMaintenanceRecord() {
  const [driver, setDriver] = React.useState("");

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  const [value, setValue] = React.useState("Pandi");

  const handleLocChange = (event) => {
    setValue(event.target.value);
  };

  // Assuming valueOptions is an array of driver names
  const valueOptions = ["Driver 1", "Driver 2", "Driver 3"];
  return (
    <div>
      <Box sx={{ my: 14, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Edit Maintenance Record
        </Typography>
        <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="driver-label">Tractor No.</InputLabel>
                      <Select
                        labelId="driver-label"
                        id="driver-select"
                        value={driver}
                        label="Driver"
                        onChange={handleChange}
                      >
                        {valueOptions.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Service"
                      name="service"
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Mileage"
                      name="mileage"
                      type="number"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Service Provider"
                      name="serviceprovider"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Cost"
                      name="totalcost"
                      type="number"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₱</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={"/adminmaintenance"}
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
