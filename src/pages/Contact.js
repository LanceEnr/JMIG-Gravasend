import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BannerImage from "../assets/contact.webp";
import Banner from "../components/Banner";
import "../styles/Contact.css";
import { toast } from "react-toastify";
import { fetchContactData } from "./cmshelper/cms";

function Contact() {
  const [inquiryData, SetInquiryData] = useState({
    _name: "",
    _email: "",
    _message: "",
  });
  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    SetInquiryData({
      ...inquiryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _name, _email, _message } = inquiryData;

    try {
      const response = await axios.post("http://localhost:3001/inquiry", {
        ...inquiryData,
        _date: formattedDate,
      });
      console.log("Inquiry submitted successfully", response.data);
      toast.success("Inquiry submitted successfully", {
        autoClose: 500,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      console.error("Registration failed", error);
      // Handle registration failure (e.g., show an error message).
    }
  };

  const [address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchContactData()
      .then((data) => {
        if (data) {
          setAddress(data._address);
          setphone(data._contactNo);
          setEmail(data._email);
        } else {
          console.error("Contact image data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, []);

  return (
    <div className="contact">
      <Banner bannerImage={BannerImage} title="CONTACT US" text="Talk to us!" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.336009504322!2d121.0196
6503907859!3d14.693580674853429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b
13a6371ac9d%3A0x8828bdfef721a44c!2sJMIG%20Gravel%20and%20Sand%20Supply!5e0!3m2!1sen!2s
ph!4v1693048413304!5m2!1sen!2sph"
          width={1200}
          height={450}
          sx={{ border: "none", borderRadius: "5px", mb: "20px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
        <Typography variant="h5" align="left" mb={2}>
          Get in Touch
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={8}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="_name"
                onChange={handleChange}
                value={inquiryData._name}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="_email"
                onChange={handleChange}
                value={inquiryData._email}
                margin="normal"
                required
                type="email"
              />

              <TextField
                fullWidth
                label="Message"
                name="_message"
                onChange={handleChange}
                value={inquiryData._message}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="primary"
                type="submit"
                sx={{
                  mt: 2,
                  width: "100px", // adjust this value as needed
                  backgroundColor: "#004aad",
                  color: "#fff", // adjust text color as needed
                  "&:hover": {
                    backgroundColor: "#003882", // darker shade for hover state
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              height="100%"
            >
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "20px" }}
              >
                <Grid item xs={2}>
                  <HomeIcon style={{ fontSize: 30, color: "#808080" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h7">{address}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "20px" }}
              >
                <Grid item xs={2}>
                  <HomeIcon style={{ fontSize: 30, color: "#808080" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h7">
                    Branch 2 5440B Mindanao Avenue, Ugong, Valenzuela City, 1440
                    Metro Manila
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "20px" }}
              >
                <Grid item xs={2}>
                  <PhoneIcon style={{ fontSize: 30, color: "#808080" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h7">{phone}</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "20px" }}
              >
                <Grid item xs={2}>
                  <EmailIcon style={{ fontSize: 30, color: "#808080" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h7">{email}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Contact;
