import * as React from "react";
import { Avatar, Button } from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/common/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CurvyLines from "../assets/appCurvyLines.webp";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function ContactValues() {
  return (
    <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
      <Container sx={{ mt: 10, mb: 15, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src={CurvyLines} // Use the imported image here
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />

        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <LocationOnOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Locations
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Main Branch:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                5440B Mindanao Avenue, Ugong, Valenzuela City, 1440 Metro Manila
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Satellite Branch:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                5440B Mindanao Avenue, Ugong, Valenzuela City, 1440 Metro Manila
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <LocalPhoneOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Contact Numbers
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Sun:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                0943422055
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Globe:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                09054222988
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Landline:
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center", marginBottom: 16 }}
              >
                025175562
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <EmailOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Email
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                jmiggravelandsand@gmail.com
              </Typography>
              <a href="mailto:jmiggravelandsand@gmail.com">
                <Button
                  variant="primary"
                  sx={{
                    mt: 2,
                    width: "100px", // adjust this value as needed
                    backgroundColor: "#004aad",
                    color: "#fff", // adjust text color as needed
                    "&:hover": {
                      backgroundColor: "#003882", // darker shade for hover state
                    },
                  }}
                >
                  Email Us
                </Button>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactValues;
