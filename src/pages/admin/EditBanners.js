import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
} from "@mui/material";

export default function EditBanners() {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <Box sx={{ my: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                  {isDragActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop banner image here, or click to select an image
                    </p>
                  )}
                </Box>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Banner</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value={"Homepage Full"}>Homepage Full</MenuItem>
                    <MenuItem value={"Homepage Half"}>Homepage Half</MenuItem>
                    <MenuItem value={"Products Page"}>Products Page</MenuItem>
                    <MenuItem value={"Services Page"}>Services Page</MenuItem>
                    <MenuItem value={"FAQS Page"}>FAQS Page</MenuItem>
                    <MenuItem value={"About Page"}>About Page</MenuItem>
                    <MenuItem value={"Contact Page"}>Contact Page</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Heading"
                  name="heading"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="subheading"
                  label="Subheading"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
