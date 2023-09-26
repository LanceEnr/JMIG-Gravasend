import React, { useState } from "react";
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
import BannerImage from "../assets/about.webp";
import Banner from "../components/Banner";
import "../styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
              />

              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                  <Typography variant="h7">
                    5440B Mindanao Avenue, Ugong, Valenzuela City, 1440 Metro
                    Manila
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
                  <Typography variant="h7">+63 9774548585</Typography>
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
                  <Typography variant="h7">jmig@gmail.com</Typography>
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
