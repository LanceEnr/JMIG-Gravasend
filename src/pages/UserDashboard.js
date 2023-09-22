import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";
import OrdersTable1 from "../components/OrdersTable1";
import UserSidePanel from "../components/UserSidePanel";
import AppointmentsTable1 from "../components/AppointmentsTable1";
import ProfileInfo from "../components/ProfileInfo";
import EditProfile from "../components/EditProfile";
import "../styles/UserDashboard.css";
import axios from "axios";

function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Orders");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get("http://localhost:3001/order").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Orders":
        return <OrdersTable1 />;
      case "Appointments":
        return <AppointmentsTable1 />;
      case "Profile Info":
        return <ProfileInfo />;
      case "Edit Profile":
        return <EditProfile />;
      default:
        return <OrdersTable1 />;
    }
  };

  return (
    <div className="userDashboard">
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Product: {order._name}, Quantity: {order._status}
          </li>
        ))}
      </ul>
      <Container sx={{ minHeight: "80vh" }}>
        <Grid container spacing={2}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <UserSidePanel setActiveComponent={setActiveComponent} />
            </Grid>
          )}
          <Grid item xs={12} md={isMobile ? 12 : 9}>
            {renderComponent()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UserDashboard;
