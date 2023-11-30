import React from "react";
import "../styles/Banner.css";
import Typography from "./common/Typography";
import BannerImage from "../assets/faqs1.webp";
import { fetchBannerDataFAQ } from "./cms";
import image from "../images/banner/uploads/FAQS Page.png";

const valuesData = await fetchBannerDataFAQ();
const imagePath = valuesData._image;
//const filename = imagePath.substring(imagePath.lastIndexOf("\\") + 1);
const path = `../images/banner/uploads/${filename}`;
const Banner = () => {
  return (
    <div
      className="aboutImage"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        marked="center"
        style={{ fontWeight: "bold" }}
        gutterBottom
      >
        {valuesData._heading}
      </Typography>
    </div>
  );
};

export default Banner;
