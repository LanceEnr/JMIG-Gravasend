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

export default function EditFleet() {
  const [driver, setDriver] = React.useState("");

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  const [value, setValue] = React.useState("Pandi");

  const handleLocChange = (event) => {
    setValue(event.target.value);
  };
  const dummyDriverNames = [
    "Driver A",
    "Driver B",
    "Driver C",
    "Driver D",
    "Driver E",
  ];

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
          Edit Truck
        </Typography>
        <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      label="Body No."
                      name="bodyno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Tractor No."
                      name="tractorno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Trailer No."
                      name="trailerno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Chassis No."
                      name="chassisno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Engine No."
                      name="engineno"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Model"
                      name="model"
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={dummyDriverNames}
                      filterOptions={(options, state) => {
                        // If the input is empty, return the first 3 options
                        if (state.inputValue === "") {
                          return options.slice(0, 3);
                        }
                        // Otherwise, use the default filter
                        return options.filter((option) =>
                          option
                            .toLowerCase()
                            .includes(state.inputValue.toLowerCase())
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Driver Name" // Change the label to "Driver Name"
                          name="drivername"
                          type="text"
                          fullWidth
                          placeholder="Search drivers..."
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
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Location</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        value={value}
                        onChange={handleLocChange}
                        row={true} // This makes the radio group vertical
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
