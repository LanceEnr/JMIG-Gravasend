import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Paper,
  Box,
  useMediaQuery,
  List,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import UserDrawer from "./common/UserDrawer";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

export default function ProfileInfo(props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? "password" : "text");
  };

  const [userData, setUserData] = useState({
    userName: "", // You should set the username here
    Phone: "",
    Address: "",
    CurrentPassword: "",
    NewPassword: "",
  });
  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    axios
      .get(`http://localhost:3001/setuser?userName=${storedUsername}`)
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];

          setUserData({
            userName: user.userName, // Set the username if available
            Phone: user.Phone,
            Address: user.Address,
            CurrentPassword: "", // Add this line if you want to reset the password fields
            NewPassword: "", // Add this line if you want to reset the password fields
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = () => {
    const userName = localStorage.getItem("userName");
    const { CurrentPassword, NewPassword } = userData;

    axios
      .post("http://localhost:3001/changepassword", {
        userName,
        currentPassword: CurrentPassword,
        newPassword: NewPassword,
      })
      .then((response) => {
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const digitRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        if (NewPassword.length < 8) {
          toast.error("New Password must be at least 8 characters long");
          return;
        }
        if (!lowercaseRegex.test(NewPassword)) {
          toast.error("New Password must contain a lowercase character");
          return;
        }
        if (!uppercaseRegex.test(NewPassword)) {
          toast.error("New Password must contain an uppercase character");
          return;
        }
        if (!digitRegex.test(NewPassword)) {
          toast.error("New Password must contain a number");
          return;
        }
        if (!specialCharRegex.test(NewPassword)) {
          toast.error("New Password must contain a special character");
          return;
        }
        toast.success("New Password updated successfully", {
          autoClose: 50,
          onClose: () => {
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast.error("Incorrect current password");
        } else {
          toast.error("Error updating password");
        }
        setUserData({ ...userData, NewPassword: "", CurrentPassword: "" });
      });
  };

  const handlePhoneAddressChange = () => {
    const userName = localStorage.getItem("userName");
    const { Phone, Address } = userData;

    axios
      .post("http://localhost:3001/updatephoneaddress", {
        userName,
        phone: Phone,
        address: Address,
      })
      .then((response) => {
        toast.success("Phone and address updated successfully");
        console.log("Phone and address updated successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating phone and address:", error);
      });
  };
  const userName = localStorage.getItem("userName");
  return (
    <List
      sx={{
        px: 0,
        py: 0,
        marginBottom: 1,
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
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Phone
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Phone"
                    name="Phone"
                    value={userData.Phone}
                    fullWidth
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Address
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Address"
                    name="Address"
                    value={userData.Address}
                    fullWidth
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#004aad",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#003882",
                    },
                  }}
                  onClick={handlePhoneAddressChange} // Call the appropriate function here
                >
                  Save phone and address
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Change Password
                </Typography>
                <Box sx={{ my: 2 }}>
                  <TextField
                    label="Current Password"
                    name="CurrentPassword"
                    type="password"
                    value={userData.CurrentPassword}
                    fullWidth
                    onChange={handleChange}
                    required
                  />
                </Box>
                <TextField
                  label="New Password"
                  name="NewPassword"
                  type={passwordInputType}
                  value={userData.NewPassword}
                  fullWidth
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleShowPasswordToggle}
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#004aad",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#003882",
                    },
                  }}
                  onClick={handlePasswordChange} // Call the appropriate function here
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
