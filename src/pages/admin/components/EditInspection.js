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

export default function EditInspection() {
  const [driver, setDriver] = React.useState("");

  const handleChange = (event) => {
    setDriver(event.target.value);
  };
  const dummyLicensePlateNumbers = [
    "ABC 123",
    "XYZ 789",
    "DEF 456",
    "GHI 789",
    "JKL 012",
    "ABC 123",
    "XYZ 789",
    "DEF 456",
    "GHI 789",
    "JKL 012",
    "ABC 123",
    "XYZ 789",
    "DEF 456",
    "GHI 789",
    "JKL 012",
    "ABC 123",
    "XYZ 789",
    "DEF 456",
    "GHI 789",
    "JKL 012",
  ];

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
          Edit Inspection Schedule
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
                      options={dummyLicensePlateNumbers}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Plate No." // Change the label to "Plate No."
                          name="platenumber"
                          type="text"
                          fullWidth
                          placeholder="Search license plates..."
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
                      label="Inspection Type"
                      name="inspectiontype"
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Inspection Date"
                      name="inspectiondate"
                      type="date"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Verdict</FormLabel>
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
                          value="On-Going"
                          control={<Radio />}
                          label="On-Going"
                        />
                        <FormControlLabel
                          value="Failed"
                          control={<Radio />}
                          label="Failed"
                        />
                        <FormControlLabel
                          value="Passed"
                          control={<Radio />}
                          label="Passed"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={"/admininspection"}
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
