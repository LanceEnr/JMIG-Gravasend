import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import "../styles/Login.css";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login({ dispatch }) {
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
        "http://localhost:3001/login",
        loginData
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);
        const { token, userName } = response.data;
        console.log(userName);
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);

        if (loginData.rememberMe) {
          localStorage.setItem("rememberMeData", JSON.stringify(loginData));
        } else {
          localStorage.removeItem("rememberMeData");
        }

        toast.success("Login successful", {
          autoClose: 50,
          onClose: () => {
            navigate("/Dashboard");
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
  const theme = useTheme();

  return (
    <div className="signin">
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold" }}
          >
            Welcome back.
          </Typography>
          <Typography component="h1" variant="body1" color="textSecondary">
            Sign in to your account using the form below.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="_userName"
              label="Username"
              name="_userName"
              onChange={handleChange}
              value={loginData._userName}
              autoComplete="username"
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
              control={
                <Checkbox
                  name="rememberMe"
                  color="primary"
                  onChange={handleRememberChange}
                  checked={rememberMe}
                />
              }
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
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
