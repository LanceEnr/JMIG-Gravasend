import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Choose from "../assets/choose.webp";
import Catalog from "../assets/catalog.webp";

import Contact from "../assets/contact.webp";

import Faqs from "../assets/faqs.webp";
import "../styles/Home.css";
import Banner, { fetchBannerData } from "./cmshelper/cms";
import ProductValues from "../components/ProductValues1";
import img from "../images/banner/uploads/Homepage Full Banner.jpg";

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
  const [heading, setHeading] = useState("");
  const [subheading, setSubeading] = useState("");
  const [imageURL, setImageURL] = useState(""); // Dynamically set the image URL

  useEffect(() => {
    fetchBannerData()
      .then((data) => {
        if (data) {
          setHeading(data._heading);
          setSubeading(data._subheading);

          const convertedPath = `../${data._image.replace(/\\/g, "/")}`;
          setImageURL(convertedPath);
        } else {
          console.error("Banner image data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, []);

  console.log(imageURL);
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2rem",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img})`,
          backgroundSize: "cover",
          color: "#fafbf5",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{ fontWeight: "bold", width: "50%" }}
        >
          {heading}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ width: isMobile ? "100%" : "50%", mb: 2 }}
        >
          {subheading}
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
