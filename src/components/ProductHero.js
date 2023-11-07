import React, { useState, useEffect } from "react";
import { Button, useMediaQuery } from "@mui/material";
import Typography from "../components/common/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

import homeBGImage from "../assets/homeBG.webp";
import catalogImage from "../assets/catalog.webp";
import contactImage from "../assets/contact.webp";

const backgroundImages = [homeBGImage, catalogImage, contactImage];

export default function ProductHero() {
  const isXsScreen = useMediaQuery("(max-width:600px)"); // Define the screen width for xs screens

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeBackgroundWithFade = () => {
    const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    setCurrentImageIndex(nextImageIndex);
  };

  useEffect(() => {
    const interval = setInterval(changeBackgroundWithFade, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        backgroundColor: "#7fc7d9",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Add this line
        transition: "background-image 2s ease-in-out",
      }}
    >
      <img
        style={{ display: "none" }}
        src={backgroundImages[currentImageIndex]}
        alt="Preload"
      />
      <Typography
        color="inherit"
        align="center"
        variant={isXsScreen ? "h4" : "h2"} // Change to "h3" on xs screens, otherwise use "h2"
        marked="center"
        style={{
          fontWeight: "900",
          marginTop: "100px",
          letterSpacing: "0.05em",
        }}
      >
        BUILD STRONG FOUNDATIONS
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h6"
        sx={{
          mb: 4,
          mt: { xs: 4, sm: 10 },
        }}
      >
        JMIG supplies aggregates to a broad spectrum of construction industry.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          minWidth: 200,
          backgroundColor: "#004aad",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#003882",
          },
        }}
        component="a"
        href="/about"
      >
        Learn More
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover us
      </Typography>
    </ProductHeroLayout>
  );
}
