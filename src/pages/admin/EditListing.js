import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/get-products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <Box sx={{ my: 2 }}>
        <Title>Edit Listing</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} style={{ padding: "24px" }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="product-label">Product</InputLabel>
                    <Select
                      labelId="product-label"
                      id="productName"
                      name="productName"
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      label="Product"
                    >
                      {products.map((product) => (
                        <MenuItem
                          key={product._inventoryID}
                          value={product._itemName}
                        >
                          {product._itemName}
                        </MenuItem>
                      ))}
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
