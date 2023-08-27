import React from "react";
import "../styles/Banner.css";

const Banner = ({ bannerImage, title, text }) => {
  return (
    <div
      className="aboutImage"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bannerImage})`,
      }}
    >
      <h1 className="aboutTitle">{title}</h1>
      <p className="aboutText">{text}</p>
    </div>
  );
};

export default Banner;
