import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/homeBG.webp";
import BannerImage2 from "../assets/faqs.webp";
import "../styles/Home.css";
import ProductValues from "../components/ProductValues";
import { Box, Button } from "@mui/material";
import ContactBanner from "../components/ContactBanner";
import TestimoniesHero from "../components/TestimoniesHero";

function Home() {
  return (
    <div>
      <div
        className="home"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
        }}
      >
        <div className="headerContainer">
          <h1>Delivering Quality Materials</h1>
          <h1>Building Strong Foundations</h1>
          <p>
            JMIG supplies aggregates to a broad spectrum of construction
            industry covering everything from one load of sand for a backyard
            repair to tons and tons of base gravels to build roads and
            infrastructures.
          </p>
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
        </div>
      </div>
      <Box sx={{ py: 16, bgcolor: "#fafbf5" }}>
        <ProductValues />
      </Box>
      <div
        className="homeLower"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage2})`,
        }}
      >
        <div className="footerContainer">
          <h1>Build Strong Foundations Today</h1>
          <Link to="/products">
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
              View Products
            </Button>
          </Link>
        </div>
      </div>
      <Box sx={{ py: 3, bgcolor: "#fafbf5" }}>
        <TestimoniesHero />
      </Box>
      <ContactBanner />
    </div>
  );
}

export default Home;
