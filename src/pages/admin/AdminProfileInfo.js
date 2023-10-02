import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  useMediaQuery,
  Avatar,
  List,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AdminProfileInfo() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const userAvatarUrl = "https://example.com/avatar.jpg";
  const userName = "John Doe";
  const totalOrders = 10;
  const pendingOrders = 2;

  const userData = {
    "First Name": "John",
    "Last Name": "Doe",
    Email: "john.doe@example.com",
    Phone: "123-456-7890",
    Birthdate: "1990-01-01",
    Address: "Sampaloc, Manila",
  };
  return (
    <List
      sx={{
        px: 0,
        py: 0,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#004aad",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            my: 2,
          }}
        >
          <AccountCircleIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          Profile Information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={2}
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <Avatar
              alt={userName}
              src={userAvatarUrl}
              style={{ width: "60px", height: "60px", marginLeft: "16px" }}
            />
            <Typography variant="h5" style={{ marginLeft: "16px" }}>
              {userName}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper
            elevation={2}
            style={{ padding: "16px 16px 16px 32px", marginBottom: "16px" }}
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
    </List>
  );
}