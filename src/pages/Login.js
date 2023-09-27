import React, { useState } from "react";
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
import "../styles/Login.css";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    _userName: "",
    _pwd: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
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
        toast.success("Login successful", {
          autoClose: 500,
          onClose: () => {
            navigate("/Dashboard");
          },
        });
      } else {
        console.error("Login failed", response.data);
      }
    } catch (error) {
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
            backgroundColor: theme.palette.background.paper, // set background color
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
              type="password"
              id="_pwd"
              autoComplete="current-password"
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
