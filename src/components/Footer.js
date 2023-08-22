import React from "react";
import Logo from "../assets/JMIGlogo.png";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <img src={Logo} />
        {""}
        <button>Book Appointment</button>
      </div>
      <hr />
      <div className="container">
        <div className="about">
          <h4>About</h4>
          <p>
            JMIG supplies aggregates to a broad spectrum of construction
            industry covering everything from one load of sand for a backyard
            repair to tons and tons of base gravels to build roads and
            infrastructures.
          </p>
        </div>
        <div className="contact">
          <h4>Contact</h4>
          <p>1008, Manila, Philippines</p>
          <p>+63 97745485284</p>
          <p>jmig@gmail.com</p>
        </div>
        <div className="quickLinks">
          <h4>Quick Links</h4>
          <Link to="/about">About us</Link>
          <Link to="/productsandservices">Products</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <hr />
      <div className="container">
        <p>&copy; 2023 JMIG Gravel and Sand Supply</p>
        <div className="socialMedia">
          <InstagramIcon /> <TwitterIcon /> <FacebookIcon />
        </div>
      </div>
    </div>
  );
}

export default Footer;
