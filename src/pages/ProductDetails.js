import React, { useState, useRef } from "react";
import { Box, Button, Typography, LinearProgress, Link } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sand1 from "../assets/Sand1.webp";
import Sand2 from "../assets/Sand2.webp";
import Sand3 from "../assets/Sand3.webp";
import "../styles/UserDashboard.css";
import { MenuList } from "../helpers/MenuList";
import MoreProducts from "../components/MoreProducts";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const ColoredLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#f5f0e0", // Lighter color
  },
  barColorPrimary: {
    backgroundColor: "#bd8512", // Darker color
  },
})(LinearProgress);

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

const ProductDetails = () => {
  const stocksLeft = 50;
  const totalStocks = 100;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    carouselRef.current.goToSlide(index);
  };

  const handleBeforeChange = (nextSlide) => {
    setSelectedImageIndex(nextSlide);
  };
  const images = [Sand1, Sand2, Sand3]; // Add your image paths to this array

  return (
    <div className="userDashboard">
      <Container>
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            <Box flex="1 1 40%" mb="40px" style={{ overflow: "hidden" }}>
              <Carousel
                responsive={responsive}
                ref={carouselRef}
                beforeChange={(nextSlide) => handleBeforeChange(nextSlide)}
                className="carousel" // Add this line
              >
                {images.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    {" "}
                    {/* Add this line */}
                    <img
                      alt="Sand"
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
                    Products
                  </Link>
                  <Typography color="text.primary">Sand</Typography>
                </Breadcrumbs>

                <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
                  Sand
                </Typography>
                <Typography sx={{ mb: 2 }}>Aggregate Materials</Typography>
                <Typography sx={{ color: "#bd8512", mb: 2 }}>
                  ₱3,000 per cubic mt.
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
              <Box display="flex" alignItems="center">
                <Typography variant="body1" color="text.secondary">
                  Stocks left:
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" minHeight="50px">
                <Box width="100%" mr={1}>
                  <ColoredLinearProgress
                    variant="determinate"
                    value={(stocksLeft / totalStocks) * 100}
                    style={{ height: "8px", borderRadius: "10px" }}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body2" color="text.secondary">
                    {`${Math.round((stocksLeft / totalStocks) * 100)}%`}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px">
                <Button
                  sx={{
                    minWidth: "150px",
                    padding: "10px 40px",
                    backgroundColor: "#004aad",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#003882",
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
              More Products
            </Typography>
            <Box mt="20px">
              <MoreProducts cards={MenuList} />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ProductDetails;
