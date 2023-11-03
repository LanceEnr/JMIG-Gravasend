import React, { useState, useRef } from "react";
import { Box, Button, Typography, Chip, Link } from "@mui/material";
import backhoe from "../assets/backhoe.webp";
import dumptruck from "../assets/dumptruck.webp";
import trailerbed from "../assets/trailerbed.webp";

import { Container } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import Carousel from "react-multi-carousel"; // Import the carousel component
import { ServicesList } from "../helpers/MenuList";
import MoreServices from "../components/MoreServices";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

const ServiceDetails = () => {
  const images = [backhoe, dumptruck, trailerbed]; // Add more images if needed
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    carouselRef.current.goToSlide(index);
  };

  return (
    <div className="userDashboard">
      <Container>
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            <Box flex="1 1 40%" mb="40px" style={{ overflow: "hidden" }}>
              <Carousel
                responsive={responsive}
                ref={carouselRef}
                beforeChange={(nextSlide) => setSelectedImageIndex(nextSlide)}
              >
                {images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img
                      alt="Service Image"
                      src={image}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain", transform: "scale(1.1)" }}
                    />
                  </div>
                ))}
              </Carousel>
              <Box display="flex" justifyContent="center" mt="20px">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      selectedImageIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img src={image} alt="Thumbnail" />
                  </div>
                ))}
              </Box>
            </Box>

            <Box flex="1 1 50%" mb="40px">
              <Box m="10px 0 25px 0">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    Home
                  </Link>
                  <Link underline="hover" color="inherit" href="#">
                    Services
                  </Link>
                  <Typography color="text.primary">Backhoe</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
                  Back Hoe
                </Typography>
                <Typography sx={{ mb: 2 }}>Heavy Equipments</Typography>

                <Typography sx={{ color: "#bd8512", mb: 2 }}>
                  ₱3,000 per hour
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: "20px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  pellentesque metus vel lectus pellentesque, eget ullamcorper
                  est vestibulum. Donec interdum tincidunt dui, ut condimentum
                  metus faucibus nec. Maecenas accumsan justo nunc, finibus
                  pharetra velit rhoncus tempor. Nunc dignissim nulla est, et
                  scelerisque erat consectetur in. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi pellentesque metus vel
                  lectus pellentesque, eget ullamcorper est vestibulum.
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  label="Available"
                  sx={{
                    color: "success.dark",
                    bgcolor: "#8dd290",
                  }}
                  size="large"
                  variant="contained"
                />
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px">
                <Button
                  sx={{
                    minWidth: "150px",
                    padding: "10px 40px",
                    backgroundColor: "#004aad",
                    color: "#fff", // adjust text color as needed
                    "&:hover": {
                      backgroundColor: "#003882", // darker shade for hover state
                    },
                  }}
                >
                  REQUEST ORDER
                </Button>
              </Box>
            </Box>
          </Box>

          <Box mt="50px" width="100%">
            <Typography variant="h4" fontWeight="bold">
              More Services
            </Typography>
            <Box mt="20px">
              <MoreServices cards={ServicesList} />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ServiceDetails;
