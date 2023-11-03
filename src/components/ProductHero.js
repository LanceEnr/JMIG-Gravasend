import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Typography from "../components/common/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

import homeBGImage from "../assets/homeBG.webp";
import catalogImage from "../assets/catalog.webp";
import contactImage from "../assets/contact.webp";

const backgroundImages = [homeBGImage, catalogImage, contactImage];

export default function ProductHero() {
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
        variant="h3"
        marked="center"
        style={{ fontWeight: "bold", marginTop: "100px" }}
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
