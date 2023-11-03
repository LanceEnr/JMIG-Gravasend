import React, { useState, useEffect } from "react";
import BannerImage from "../assets/about1.webp";
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
import Mission from "../components/Mission";
import Vision from "../components/Vision";

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
      <Banner bannerImage={BannerImage} title="ABOUT US" />

      <Mission />
      <Vision />
    </div>
  );
}

export default About;
