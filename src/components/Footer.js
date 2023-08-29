import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <InstagramIcon /> <TwitterIcon /> <FacebookIcon />
      </div>
      <div className="footerLinks">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p> &copy; 2023 JMIG Gravel and Sand Supply</p>
    </div>
  );
}

export default Footer;
