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
  Autocomplete,
} from "@mui/material";
import Typography from "../../../components/common/Typography";
import SearchIcon from "@mui/icons-material/Search";

export default function EditOrder() {
  const [driver, setDriver] = React.useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handlePriceChange = (event) => {
    const newPrice = parseFloat(event.target.value) || 0;
    setPrice(newPrice);
    updateTotalPrice(newPrice, quantity);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseFloat(event.target.value) || 0;
    setQuantity(newQuantity);
    updateTotalPrice(price, newQuantity);
  };

  const updateTotalPrice = (newPrice, newQuantity) => {
    const newTotalPrice = newPrice * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  const handleChange = (event) => {
    setDriver(event.target.value);
  };

  const [value, setValue] = React.useState("Pandi");

  const handleLocChange = (event) => {
    setValue(event.target.value);
  };

  const customerNames = [
    "Customer 1",
    "Customer 2",
    "Customer 3",
    "Customer 4",
    "Customer 5",
    "Customer 6",
    "Customer 7",
    "Customer 8",
    "Customer 9",
    "Customer 10",
    "Customer 11",
    "Customer 12",
    "Customer 13",
    "Customer 14",
    "Customer 15",
  ];
  const productNames = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
  ];
  const valueOptions = [
    "Pending",
    "Fetch from Quarry",
    "Arrived (Pandi)",
    "Available for Pick-up (Pandi)",
    "Available for Pick-up (Mindanao Ave.)",
    "Delayed",
    "Cancelled",
  ];
  return (
    <div>
      <Box sx={{ my: 14, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Edit an Order
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
                      options={customerNames}
                      filterOptions={(options, state) => {
                        // If the input is empty, return the first 3 options
                        if (state.inputValue === "") {
                          return options.slice(0, 3);
                        }
                        // Otherwise, use the default filter
                        let results = options.filter((option) =>
                          option
                            .toLowerCase()
                            .includes(state.inputValue.toLowerCase())
                        );
                        return results;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Customer Name"
                          name="customername"
                          type="text"
                          fullWidth
                          placeholder="Search customers..."
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
                    <Autocomplete
                      options={productNames}
                      filterOptions={(options, state) => {
                        // If the input is empty, return the first 3 options
                        if (state.inputValue === "") {
                          return options.slice(0, 3);
                        }
                        // Otherwise, use the default filter
                        let results = options.filter((option) =>
                          option
                            .toLowerCase()
                            .includes(state.inputValue.toLowerCase())
                        );
                        return results;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Product Name" // Change the label to "Product Name"
                          name="productname"
                          type="text"
                          fullWidth
                          placeholder="Search products..."
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
                      label="Price"
                      name="price"
                      type="number"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₱</InputAdornment>
                        ),
                      }}
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Quantity"
                      name="qty"
                      type="number"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            cu. mt.
                          </InputAdornment>
                        ),
                      }}
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Total Price"
                      name="totalPrice"
                      type="number"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₱</InputAdornment>
                        ),
                      }}
                      value={totalPrice}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="driver-label">Status</InputLabel>
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
                  <Grid item xs={12}>
                    <TextField
                      label="Order Details"
                      name="orderdet"
                      type="text"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={"/adminmanageorders"}
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
