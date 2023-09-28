import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/homeBG.webp";
import "../styles/Home.css";
import ProductValues from "../components/ProductValues";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ContactBanner from "../components/ContactBanner";
import TestimoniesHero from "../components/TestimoniesHero";
import ChooseBanner from "../components/ChooseBanner";

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center", // center items vertically
          padding: "2rem", // add some padding
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
          backgroundSize: "cover", // ensure the image covers the entire box
          color: "#fafbf5",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Delivering Quality Materials
        </Typography>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Building Strong Foundations
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ width: isMobile ? "100%" : "50%", mb: 2 }}
        >
          JMIG supplies aggregates to a broad spectrum of construction industry
          covering everything from one load of sand for a backyard repair to
          tons and tons of base gravels to build roads and infrastructures.
        </Typography>
        <Link to="/about">
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#004aad",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#003882",
              },
            }}
          >
            Learn More
          </Button>
        </Link>
      </Box>
      <Box sx={{ py: 16, bgcolor: "#fafbf5" }}>
        <ProductValues />
      </Box>
      <ChooseBanner />
      <Box sx={{ bgcolor: "#fafbf5" }}>
        <TestimoniesHero />
      </Box>
      <ContactBanner />
    </div>
  );
}

export default Home;
