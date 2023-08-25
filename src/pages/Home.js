import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/homeBG.webp";
import "../styles/Home.css";

function Home() {
  return (
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
          JMIG supplies aggregates to a broad spectrum of construction industry
          covering everything from one load of sand for a backyard repair to
          tons and tons of base gravels to build roads and infrastructures.
        </p>
        <Link to="/about">
          <button>Learn More</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
