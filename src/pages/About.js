import React, { useState, useEffect } from "react";
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
import AboutData, { fetchAboutData } from "./cmshelper/cms";

function About() {
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");

  useEffect(() => {
    fetchAboutData()
      .then((data) => {
        if (data) {
          setVision(data._vision);
          setMission(data._mission);
        } else {
          console.error("Banner image data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, []);
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
            Vision
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            ={vision}
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
            Mission
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            {mission}
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
