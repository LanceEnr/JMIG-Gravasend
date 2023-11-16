import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
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

export default function EditListing({ onBackClick }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const remainingSlots = 6 - selectedFiles.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      setSelectedFiles([...selectedFiles, ...filesToAdd]);
    },
    [selectedFiles]
  );
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_listingName", productName);
    formData.append("_listingCategory", category);
    formData.append("_listingPrice", price);
    formData.append("_isPublished", description);
    selectedFiles.forEach((file) => {
      formData.append("image", file);
    });
    try {
      const response = await axios.put(
        "http://localhost:3001/update-listing",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Listing modified successfully");
      setProductName("");
      setCategory("");
      setPrice(0);
      setDescription("");
      setSelectedFiles([]);
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      toast.error("Modification failed, please try again!");
      console.error("Form submission failed", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/get-listing");
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

  useEffect(() => {
    async function fetchProductDetails() {
      if (productName) {
        try {
          const response = await fetch(
            `http://localhost:3001/get-listing-details?productName=${productName}`
          );
          if (response.ok) {
            const data = await response.json();
            setCategory(data._listingCategory);
            setPrice(data._listingPrice);
            setDescription(data._listingDescription);
          } else {
            console.error("Failed to fetch products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    }
    fetchProductDetails();
  }, [productName]);

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div>
      <Box sx={{ my: 2 }}>
        <Title>Edit Listing</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <form onSubmit={handleFormSubmit}>
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
                            key={product._listingID}
                            value={product._listingName}
                          >
                            {product._listingName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    {productName ? (
                      <TextField
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        value={price}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    ) : (
                      <TextField
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {productName ? (
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
                            Drag & drop images here, or click to select images.
                            <br />
                            (This will replace all the current photos)
                          </p>
                        )}
                      </Box>
                    ) : (
                      <p>Select a product you want to modify</p>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {productName ? (
                      <TextField
                        fullWidth
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    ) : (
                      <TextField
                        fullWidth
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        disabled
                      />
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      sx={{
                        marginRight: 2,
                        color: "#004aad",
                        borderColor: "#004aad",
                      }}
                      onClick={onBackClick}
                    >
                      Go Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Save changes
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
