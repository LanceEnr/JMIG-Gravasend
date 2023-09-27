import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"; // Import Box component
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    _fName: "",
    _lName: "",
    _email: "",
    _pwd: "",
    _userName: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { _fName, _lName, _email, _pwd, _userName } = formData;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (!nameRegex.test(_fName) || !nameRegex.test(_lName)) {
      toast.error(
        "First name and last name must contain only alphabetic characters"
      );
      return;
    }

    if (!usernameRegex.test(_userName)) {
      toast.error("Username must contain only alphanumeric characters");
      return;
    }
    if (_userName.length < 8) {
      toast.error("Username must be at least 8 characters long");
      return;
    }
    if (!emailRegex.test(_email)) {
      toast.error("Invalid email address");
      return;
    }
    if (_pwd.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (!lowercaseRegex.test(_pwd)) {
      toast.error("Password must contain an lowercase character");
      return;
    }
    if (!uppercaseRegex.test(_pwd)) {
      toast.error("Password must contain an uppercase character");
      return;
    }
    if (!digitRegex.test(_pwd)) {
      toast.error("Password must contain a number");
      return;
    }
    if (!specialCharRegex.test(_pwd)) {
      toast.error("Password must contain a special character");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      console.log("Registration successful", response.data);
      toast.success("Registration successful", {
        autoClose: 500,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (error) {
      console.error("Registration failed", error);
      // Handle registration failure (e.g., show an error message).
    }
  };

  return (
    <div className="signin">
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold" }}
          >
            Welcome to JMIG.
          </Typography>
          <Typography component="h1" variant="body1" color="textSecondary">
            Create your account by filling the form below.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="_fName"
                  label="First Name"
                  fullWidth
                  onChange={handleChange}
                  value={formData._fName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="_lName"
                  label="Last Name"
                  fullWidth
                  onChange={handleChange}
                  value={formData._lName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="_userName"
                  label="Username"
                  fullWidth
                  onChange={handleChange}
                  value={formData._userName}
                  required
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="_email"
                  label="Email Address"
                  fullWidth
                  onChange={handleChange}
                  value={formData._email}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="_pwd"
                  label="Password"
                  fullWidth
                  type="password"
                  onChange={handleChange}
                  value={formData._pwd}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreeToTerms" color="primary" />}
                  label="I agree to the terms and conditions."
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
