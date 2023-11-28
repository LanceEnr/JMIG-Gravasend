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
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import Typography from "../../../components/common/Typography";
import SearchIcon from "@mui/icons-material/Search";

export default function AddMaintenanceScheduling() {
  const [driver, setDriver] = React.useState("");

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  const [value, setValue] = React.useState("Pandi");

  const handleLocChange = (event) => {
    setValue(event.target.value);
  };
  const dummyTractorNumbers = [
    "Tractor 001",
    "Tractor 002",
    "Tractor 003",
    "Tractor 004",
    "Tractor 005",
    "Tractor 006",
    "Tractor 007",
    "Tractor 008",
    "Tractor 009",
    "Tractor 010",
    "Tractor 011",
    "Tractor 012",
    "Tractor 013",
    "Tractor 014",
    "Tractor 015",
  ];

  // Assuming valueOptions is an array of driver names
  const valueOptions = ["1000", "3000", "5000"];
  return (
    <div>
      <Box sx={{ my: 14, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Add Maintenance
        </Typography>
        <Paper
          sx={{
            mt: 3,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <Autocomplete
                      options={dummyTractorNumbers}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tractor No."
                          name="tractorno"
                          type="text"
                          fullWidth
                          placeholder="Search tractor numbers..."
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Service"
                      name="serviceno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="driver-label">Frequency</InputLabel>
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
                      label="Start Mileage"
                      name="startmileage"
                      type="number"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Next Due Mileage"
                      name="nextduemileage"
                      type="number"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        value={value}
                        onChange={handleLocChange}
                        row={true} // This makes the radio group vertical
                      >
                        <FormControlLabel
                          value="Pending"
                          control={<Radio />}
                          label="Pending"
                        />
                        <FormControlLabel
                          value="Completed"
                          control={<Radio />}
                          label="Completed"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
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
