import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../styles/Login.css";
import { useTheme } from "@mui/material/styles";

export default function ForgetPassword() {
  const [_email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [resetInProgress, setResetInProgress] = useState(false);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/check-email", {
        _email: _email,
      });
      if (response.data.exists) {
        const otpResponse = await axios.post("http://localhost:3001/send-otp", {
          _email: _email,
        });
        if (otpResponse.data.success) {
          setMessage("OTP sent to your email.");
        } else {
          setMessage("Failed to send OTP.");
        }
      } else {
        setMessage("Email not found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleResetPasswordSubmit = async (event) => {
    event.preventDefault();
    setResetInProgress(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/reset-password",
        {
          _email,
          newPassword,
          otp,
        }
      );
      if (response.data.success) {
        setMessage("Password reset successfully.");
        // Redirect to login page or handle success as needed
      } else {
        setMessage(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to reset password.");
    } finally {
      setResetInProgress(false);
    }
  };

  const theme = useTheme();

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
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold" }}
          >
            Reset your Password
          </Typography>
          {message && (
            <Typography variant="body1" color="textSecondary">
              {message}
            </Typography>
          )}
          {!otp ? (
            <>
              <Typography variant="body1" color="textSecondary">
                Provide your email below.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleEmailSubmit}
                sx={{ mt: 3, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="_email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#004aad" }}
                >
                  Send OTP
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" color="textSecondary">
                Enter the OTP received on your email and set your new password.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleResetPasswordSubmit}
                sx={{ mt: 3, width: "100%" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      required
                      fullWidth
                      id="newPassword"
                      label="New Password"
                      name="newPassword"
                      autoComplete="new-password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#004aad" }}
                  disabled={resetInProgress}
                >
                  Reset Password
                </Button>
              </Box>
            </>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Return to login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
