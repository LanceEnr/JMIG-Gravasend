import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import EmailIcon from "@mui/icons-material/Email";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <FacebookIcon /> <MapsUgcIcon />
        <EmailIcon />
      </div>
      <div className="footerLinks">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p> &copy; 2023 JMIG Gravel and Sand Supply</p>
    </div>
  );
}

export default Footer;
