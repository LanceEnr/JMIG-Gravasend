import React from "react";
import "../styles/Banner.css";
import Typography from "./common/Typography";

const Banner = ({ bannerImage, title, text }) => {
  return (
    <div
      className="aboutImage"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${require(`../images/banner/uploads/${bannerImage}`)})`,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        marked="center"
        style={{ fontWeight: "bold" }}
        gutterBottom
      >
        {title}
      </Typography>
    </div>
  );
};

export default Banner;
