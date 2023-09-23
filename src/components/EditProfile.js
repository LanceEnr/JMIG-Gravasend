import React from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  useMediaQuery,
  Avatar,
  List,
  Button,
  TextField,
  Badge,
  IconButton,
} from "@mui/material";
import UserDrawer from "./common/UserDrawer";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileInfo(props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const userAvatarUrl = "https://example.com/avatar.jpg";
  const userData = {
    "First Name": "John",
    "Last Name": "Doe",
    Email: "john.doe@example.com",
    Phone: "123-456-7890",
    Birthdate: "1990-01-01",
    Address: "123 Main St, Anytown, USA",
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
            my: 1,
          }}
        >
          <EditIcon sx={{ mr: 2, verticalAlign: "middle" }} />
          Edit Profile
        </Typography>
        {isMobile && (
          <UserDrawer onActiveComponentChange={props.onActiveComponentChange} />
        )}
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2} style={{ padding: "24px" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      size="small"
                      style={{
                        backgroundColor: "#bd8512",
                        color: "#fafbf5",
                      }}
                    >
                      <CameraEnhanceIcon
                        style={{ pointerEvents: "none", fontSize: "24px" }}
                      />
                    </IconButton>
                  }
                >
                  <Avatar
                    alt="User Avatar"
                    src={userAvatarUrl}
                    style={{ width: "60px", height: "60px" }}
                  />
                </Badge>
              </Grid>
              {Object.entries(userData).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  {key === "Birthdate" ? (
                    <TextField
                      label={key}
                      type="date"
                      defaultValue={value}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  ) : (
                    <TextField label={key} defaultValue={value} fullWidth />
                  )}
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#004aad",
                    color: "#fff", // adjust text color as needed
                    "&:hover": {
                      backgroundColor: "#003882", // darker shade for hover state
                    },
                  }}
                >
                  Save changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </List>
  );
}
