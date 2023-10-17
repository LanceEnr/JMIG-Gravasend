import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Grid,
  Paper,
  useMediaQuery,
  Avatar,
} from "@mui/material";

import Title from "./components/Title";

export default function AdminProfileInfo() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const userAvatarUrl = "https://example.com/avatar.jpg";
  const userName = "John Doe";
  const totalOrders = 10;
  const pendingOrders = 2;
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    "First Name": "",
    "Last Name": "",
    Email: "",
    Phone: "",
    Birthdate: "",
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUserName");
    axios
      .get(`http://localhost:3001/adminUser?userName=${storedUsername}`)
      .then((response) => {
        setUsers(response.data);

        if (response.data.length > 0) {
          const user = response.data[0];

          setUserData({
            "First Name": user._fName,
            "Last Name": user._lName,
            Email: user._email,
            Phone: user._phone,
            Birthdate: user._bday,
          });
        }
      });
  }, []);
  const adminUserName = localStorage.getItem("adminUserName");
  return (
    <Box>
      <Title>Account Information</Title>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Add this line
              padding: "0 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={adminUserName}
                src={userAvatarUrl}
                style={{ width: "60px", height: "60px", marginLeft: "16px" }}
              />
              <Typography variant="h5" style={{ marginLeft: "16px" }}>
                {adminUserName}
              </Typography>
            </div>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ marginRight: "16px" }}
            >
              ADMIN
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper
            style={{
              minHeight: "100px",
              padding: "16px 16px 16px 32px",
              marginBottom: "16px",
            }}
          >
            <Grid container spacing={2}>
              {Object.entries(userData).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {key}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ wordBreak: "break-word" }}
                  >
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
