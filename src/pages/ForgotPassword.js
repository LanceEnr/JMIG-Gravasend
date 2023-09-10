import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../styles/Login.css";
import { useTheme } from "@mui/material/styles";

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
            backgroundColor: theme.palette.background.paper, // set background color
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold" }}
          >
            Reset your Password
          </Typography>
          <Typography component="h1" variant="body1" color="textSecondary">
            Provide your email below.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#004aad" }}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Return to login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
