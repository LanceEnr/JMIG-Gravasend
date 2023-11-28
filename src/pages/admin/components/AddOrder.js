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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Typography from "../../../components/common/Typography";
import SearchIcon from "@mui/icons-material/Search";

export default function AddOrder() {
  const [driver, setDriver] = React.useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchCustomerName() {
      try {
        const response = await fetch("http://localhost:3001/get-customers");
        if (response.ok) {
          const data = await response.json();
          const customerNames = data.map(
            (customer) => `${customer._fName}_${customer._lName}`
          );

          setCustomers(customerNames);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    fetchCustomerName();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3001/get-products");
        if (response.ok) {
          const data = await response.json();
          const productNames = data.map(
            (product) => `${product._itemName}_${product._location}`
          );
          setProduct(productNames);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.error(
      price +
        " " +
        quantity +
        " " +
        totalPrice +
        " " +
        location +
        " " +
        details +
        " " +
        name +
        " "
    );
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
          Add an Order
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={6}>
                    <Autocomplete
                      options={customers}
                      filterOptions={(options, state) => {
                        if (state.inputValue === "") {
                          return options.slice(0, 3);
                        }

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
                      onChange={(event, value) => {
                        if (value) {
                          setName(value);
                        } else {
                          setName("");
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Autocomplete
                      options={product}
                      filterOptions={(options, state) => {
                        if (state.inputValue === "") {
                          return options.slice(0, 3);
                        }

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
                      onChange={(event, value) => {
                        if (value) {
                          setProduct(value);
                        } else {
                          setProduct("");
                        }
                      }}
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
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Location</FormLabel>
                      <RadioGroup
                        aria-label="options"
                        row={true}
                        onChange={(event) => setLocation(event.target.value)}
                        required
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
