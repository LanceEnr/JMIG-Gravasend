import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Pagination, Box } from "@mui/material";
import OrdersTable1 from "../components/OrdersTable1";
import "../styles/UserDashboard.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get("http://localhost:3001/order").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="userDashboard">
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Product: {order._name}, Quantity: {order._status}
          </li>
        ))}
      </ul>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Your Orders</Typography>
            <OrdersTable1 />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination count={5} color="primary" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Orders;
