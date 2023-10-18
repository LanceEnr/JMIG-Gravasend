import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Grid,
  Paper,
  useMediaQuery,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
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
  const [passwordData, setPasswordData] = useState({
    CurrentPassword: "",
    NewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [newPassword, setNewPassword] = useState("");
  const [resetInProgress, setResetInProgress] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? "password" : "text");
  };

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordChange = () => {
    const userName = localStorage.getItem("adminUserName");
    const { CurrentPassword, NewPassword } = passwordData;

    axios
      .post("http://localhost:3001/admin-changepassword", {
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
        setPasswordData({
          ...passwordData,
          NewPassword: "",
          CurrentPassword: "",
        });
      });
  };

  const adminUserName = localStorage.getItem("adminUserName");
  return (
    <div>
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
      <Box>
        <Title>Change Password</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={2} style={{ padding: "24px" }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label="Current Password"
                      name="CurrentPassword"
                      type="password"
                      value={passwordData.CurrentPassword}
                      fullWidth
                      onChange={handleChange}
                      required
                    />
                  </Box>
                  <TextField
                    label="New Password"
                    name="NewPassword"
                    type={passwordInputType}
                    value={passwordData.NewPassword}
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
                    variant="contained"
                    type="submit"
                    onClick={handlePasswordChange} // Call the appropriate function here
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
