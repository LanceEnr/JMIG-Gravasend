import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import BannerImage from "../../assets/catalog.webp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {" JMIG Gravel and Sand Supply."}
    </Typography>
  );
}

export default function AdminLogin({ dispatch }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? "password" : "text");
  };
  const [loginData, setLoginData] = useState({
    _userName: "",
    _pwd: "",
    rememberMe: false,
  });
  useEffect(() => {
    const rememberMeData = localStorage.getItem("rememberMeData");
    if (rememberMeData) {
      setLoginData(JSON.parse(rememberMeData));
    }
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleRememberChange = () => {
    setRememberMe(!rememberMe);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/adminLogin",
        loginData
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);
        const { token, userName } = response.data;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUserName", userName);

        if (loginData.rememberMe) {
          localStorage.setItem("rememberMeData", JSON.stringify(loginData));
        } else {
          localStorage.removeItem("rememberMeData");
        }

        toast.success("Login successful", {
          autoClose: 50,
          onClose: () => {
            navigate("/adminDashboard");
          },
        });
        dispatch({ type: "LOGIN" });
      } else {
        console.error("Login failed", response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect Login Credentials");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold" }}
          >
            Admin Login
          </Typography>
          <Typography component="h1" variant="body1" color="textSecondary">
            Sign in below to access dashboard
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="_userName"
              onChange={handleChange}
              value={loginData._userName}
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="_pwd"
              onChange={handleChange}
              value={loginData._pwd}
              label="Password"
              type={passwordInputType}
              id="_pwd"
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#004aad" }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/adminregister" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
