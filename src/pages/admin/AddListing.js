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

export default function AddListing() {
  const [product, setProduct] = React.useState("");

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

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
        <Title>Add New Listing</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} style={{ padding: "24px" }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="product-label">Product</InputLabel>
                    <Select
                      labelId="product-label"
                      id="product-select"
                      value={product}
                      label="Product"
                      onChange={handleProductChange}
                    >
                      <MenuItem value={"Product 1"}>Product 1</MenuItem>
                      <MenuItem value={"Product 2"}>Product 2</MenuItem>
                      {/* Add more products as needed */}
                    </Select>
                  </FormControl>
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
                      <MenuItem value={"Services"}>Services</MenuItem>
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
