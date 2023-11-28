import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button } from "@mui/material";
import Typography from "../../../components/common/Typography";

export default function EditDriver() {
  const [driver, setDriver] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const remainingSlots = 6 - selectedFiles.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      setSelectedFiles([...selectedFiles, ...filesToAdd]);
    },
    [selectedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div>
      <Box sx={{ my: 14, mx: 12 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Edit Driver Information
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
                  <Grid item xs={12}>
                    <Box
                      {...getRootProps()}
                      sx={{
                        height: 200,
                        border: "1px dashed gray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input {...getInputProps()} />
                      {selectedFiles.length > 0 ? (
                        <ul>
                          {selectedFiles.map((file, index) => (
                            <li key={index}>
                              {file.name}{" "}
                              <button onClick={() => removeFile(index)}>
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>
                          Drag & drop driver picture here, or click to select
                          driver picture
                        </p>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Name"
                      name="drivername"
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Contact No."
                      name="contactno"
                      type="number"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Hire Date"
                      name="hiredate"
                      type="date"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="License No."
                      name="licenseno"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={"/admindrivermanagement"}
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
