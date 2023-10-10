import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ChangePassword from "../components/ChangePassword";
import EnterOTP from "../components/EnterOtp";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [_email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/check-email", {
        _email: _email,
      });

      if (response.data.exists === true) {
        const otpResponse = await axios.post("http://localhost:3001/send-otp", {
          _email: _email,
        });

        if (otpResponse.data.success) {
          toast.success("OTP sent to your email.");
          setOtpSent(true);
          setOtp(otpResponse.data.otp);
        } else {
          toast.error("Failed to send OTP.");
        }
      } else {
        toast.error("Email not found.");
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
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
          {!otpSent ? (
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
            <EnterOTP email={_email} otp={otp} />
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
