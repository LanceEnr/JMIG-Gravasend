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

import Title from "./components/Title";

export default function EditListing() {
  const [category, setCategory] = useState("Aggregate Materials");

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
        <Title>Edit Listing</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} style={{ padding: "24px" }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    label="Product"
                    name="product"
                    type="text"
                    fullWidth
                    defaultValue="Gravel"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      value={category}
                      label="Category"
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value={"Aggregate Materials"}>
                        Aggregate Materials
                      </MenuItem>
                      <MenuItem value={"Service"}>Services</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                        Drag & drop product image here, or click to select an
                        image
                      </p>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    defaultValue="Dummy Description"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
