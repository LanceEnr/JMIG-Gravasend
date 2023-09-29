import * as React from "react";
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
import BannerImage from "../../assets/contact.webp";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
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
            sx={{ color: "#004aad", fontWeight: "bold" }}
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
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="_lName" label="Last Name" fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="_phone"
                  label="Phone Number"
                  fullWidth
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
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Address" fullWidth required />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="_userName"
                  label="Username"
                  fullWidth
                  required
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="_email"
                  label="Email Address"
                  fullWidth
                  required
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="_pwd"
                  label="Password"
                  fullWidth
                  type="password"
                  required
                  autoComplete="email"
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#004aad" }}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/adminlogin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
