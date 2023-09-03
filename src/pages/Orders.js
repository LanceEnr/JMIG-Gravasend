import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography, Pagination, Box } from "@mui/material";
import OrdersTable1 from "../components/OrdersTable1";
import "../styles/UserDashboard.css";

function Orders() {
  return (
    <div className="userDashboard">
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
