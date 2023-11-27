import React, { useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import BannerImage from "../../assets/contact.webp";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, Link } from "react-router-dom";

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

export default function AdminRegister() {
  const [emailUsed, setEmailUsed] = useState(false);
  const [usernameUsed, setUsernameUsed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? "password" : "text");
  };
  const calculateEighteenYearsAgo = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    return currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
  };
  const [formData, setFormData] = useState({
    _fName: "",
    _lName: "",
    _email: "",
    _pwd: "",
    _userName: "",
    _phone: "",
    _bday: "",
    _address: "",
    _adminCode: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAgreeToTermsChange = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleOpenTermsDialog = () => {
    setOpenTermsDialog(true);
  };

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false);
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
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/adminRegister",
        formData
      );
      console.log("Registration successful", response.data);
      toast.success("Registration successful", {
        autoClose: 500,
        onClose: () => {
          navigate("/adminLogin");
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        const { field } = error.response.data;
        if (field === "email") {
          setEmailUsed(true);
        } else if (field === "username") {
          setUsernameUsed(true);
        }
      } else {
        console.error("Registration failed", error);
        toast.error("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <container>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "#83948a", fontWeight: "bold" }}
              >
                Admin Sign Up
              </Typography>
              <Typography component="h1" variant="body1" color="textSecondary">
                Create your account by filling the form below.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="_fName"
                      label="First Name"
                      onChange={handleChange}
                      value={formData._fName}
                      fullWidth
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="_phone"
                      label="Phone Number"
                      fullWidth
                      onChange={handleChange}
                      value={formData._phone}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      name="_bday"
                      label="Birthday"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleChange}
                      value={formData._bday}
                      required
                      inputProps={{
                        max: calculateEighteenYearsAgo(), // Set the max date to 18 years ago
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="_address"
                      label="Address"
                      fullWidth
                      required
                      onChange={handleChange}
                      value={formData._address}
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
                      autoComplete="userName"
                      error={usernameUsed}
                      helperText={
                        usernameUsed ? "Username is already used" : ""
                      }
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
                      autoComplete="email"
                      error={emailUsed}
                      helperText={emailUsed ? "Email is already used" : ""}
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <TextField
                      name="_pwd"
                      label="Password"
                      fullWidth
                      type={passwordInputType}
                      onChange={handleChange}
                      value={formData._pwd}
                      required
                      autoComplete="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleShowPasswordToggle}
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="_adminCode"
                      label="Admin Code"
                      fullWidth
                      required
                      autoComplete="_adminCode"
                      onChange={handleChange}
                      value={formData._adminCode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreeToTerms}
                          onChange={handleAgreeToTermsChange}
                          value="agreeToTerms"
                          color="primary"
                        />
                      }
                      label="I agree to the terms and conditions."
                      required
                      onClick={handleOpenTermsDialog} // Open terms dialog when clicked
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#83948a" }}
                >
                  Sign Up
                </Button>
              </form>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/adminlogin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </container>
      <Dialog open={openTermsDialog} onClose={handleCloseTermsDialog}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              <strong>Terms and Conditions</strong>
            </p>
            <p>
              By creating an account with JMIG, you agree to the following terms
              and conditions:
            </p>
            <ol>
              <li>
                <strong>Eligibility:</strong>
                <ul>
                  <li>
                    You must be at least 18 years of age to register for an
                    account on JMIG.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Account Information:</strong>
                <ul>
                  <li>
                    You are responsible for providing accurate and complete
                    information during registration.
                  </li>
                  <li>
                    You must choose a secure password and keep it confidential.
                  </li>
                </ul>
              </li>
              <li>
                <strong>User Conduct:</strong>
                <ul>
                  <li>
                    You agree not to engage in any unlawful, abusive, or harmful
                    behavior on JMIG.
                  </li>
                  <li>
                    You will not use JMIG for any unauthorized or illegal
                    purposes.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Privacy:</strong>
                <ul>
                  <li>
                    JMIG may collect and use your personal information as
                    described in our Privacy Policy.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Account Termination:</strong>
                <ul>
                  <li>
                    JMIG reserves the right to terminate or suspend your account
                    at any time for violations of these terms and conditions.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Disclaimer:</strong>
                <ul>
                  <li>
                    JMIG is provided "as is" without any warranties or
                    guarantees.
                  </li>
                  <li>
                    JMIG is not responsible for any user-generated content or
                    actions.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Changes to Terms:</strong>
                <ul>
                  <li>
                    JMIG may update these terms and conditions from time to
                    time. It is your responsibility to review them periodically.
                  </li>
                </ul>
              </li>
            </ol>
            <p>
              By clicking "I agree to the terms and conditions," you acknowledge
              that you have read and accept these terms.
            </p>
            <p>Last Updated: [Date]</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
