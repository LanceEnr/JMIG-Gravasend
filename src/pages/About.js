import React from "react";
import BannerImage from "../assets/about.webp";
import Banner from "../components/Banner";
import "../styles/About.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ChooseBanner from "../components/ChooseBanner";
import ProductValues from "../components/ProductValues";
import TestimoniesHero from "../components/TestimoniesHero";
import ContactBanner from "../components/ContactBanner";

function About() {
  return (
    <div>
      <div className="about">
        <Banner
          bannerImage={BannerImage}
          title="ABOUT US"
          text="Discover our expertise"
        />
      </div>
      <Box
        sx={{
          pt: 16,
          bgcolor: "#fafbf5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              position: "relative",
              textAlign: "center",
            }}
          >
            Mission
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            posuere elementum orci ac fermentum. Vestibulum tempor consequat
            eros, non ultricies sapien pharetra eget. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Nulla at auctor quam, eu
            cursus odio. Sed lacinia mollis ex, vitae accumsan enim porta quis.
            Nam lobortis scelerisque cursus. Donec id vestibulum felis. Morbi
            augue diam, ornare quis ipsum at, aliquet feugiat orci. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Vestibulum posuere
            elementum orci ac fermentum. Vestibulum tempor consequat eros, non
            ultricies sapien pharetra eget. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Nulla at auctor quam, eu cursus odio. Sed
            lacinia mollis ex, vitae accumsan enim porta quis. Nam lobortis
            scelerisque cursus. Donec id vestibulum felis. Morbi augue diam,
            ornare quis ipsum at, aliquet feugiat orci.
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          py: 16,
          bgcolor: "#fafbf5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              position: "relative",
              textAlign: "center",
            }}
          >
            Vision
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            posuere elementum orci ac fermentum. Vestibulum tempor consequat
            eros, non ultricies sapien pharetra eget. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Nulla at auctor quam, eu
            cursus odio. Sed lacinia mollis ex, vitae accumsan enim porta quis.
            Nam lobortis scelerisque cursus. Donec id vestibulum felis. Morbi
            augue diam, ornare quis ipsum at, aliquet feugiat orci. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Vestibulum posuere
            elementum orci ac fermentum. Vestibulum tempor consequat eros, non
            ultricies sapien pharetra eget. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Nulla at auctor quam, eu cursus odio. Sed
            lacinia mollis ex, vitae accumsan enim porta quis. Nam lobortis
            scelerisque cursus. Donec id vestibulum felis. Morbi augue diam,
            ornare quis ipsum at, aliquet feugiat orci.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ py: 1, bgcolor: "#fafbf5" }}>
        <ProductValues />
      </Box>
      <Box sx={{ py: 1, bgcolor: "#fafbf5" }}>
        <TestimoniesHero />
      </Box>
      <ContactBanner />
    </div>
  );
}

export default About;
