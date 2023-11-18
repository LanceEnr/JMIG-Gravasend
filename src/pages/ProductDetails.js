import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const carouselRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    carouselRef.current.goToSlide(index);
  };

  const handleBeforeChange = (nextSlide) => {
    setSelectedImageIndex(nextSlide);
  };
  const images = [Sand1, Sand2, Sand3];

  const [productDetails, setProductDetails] = useState(null);
  const [pandiStocks, setPandiStocks] = useState([]);
  const [mindanaoStocks, setMindanaoStocks] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    const productName = url.searchParams.get("productName");

    async function fetchProductDetails() {
      try {
        const response = await axios.get(
          "http://localhost:3001/get-listing-details",
          {
            params: { productName }, // Use the 'params' property to pass parameters
          }
        );

        const productDetailsData = response.data;

        if (productDetailsData) {
          setProductDetails(productDetailsData);
        } else {
          console.error("Product details not found");
        }
        window.scrollTo({ top: 0 });
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    }
    async function fetchStocks() {
      try {
        const response = await axios.get(
          "http://localhost:3001/get-listing-stocks",
          {
            params: { productName },
          }
        );

        const stocks = response.data;

        if (stocks) {
          // Filter stocks for Pandi
          const pandiStocks = stocks.filter(
            (stock) => stock._location.toLowerCase() === "pandi"
          );
          setPandiStocks(pandiStocks);

          // Filter stocks for Mindanao
          const mindanaoStocks = stocks.filter(
            (stock) => stock._location.toLowerCase() === "mindanao ave."
          );
          setMindanaoStocks(mindanaoStocks);
        } else {
          console.error("Stocks not found");
        }
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    }
    fetchStocks();
    fetchProductDetails();
  }, [navigate, window.location.href]);

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
                  <Link underline="hover" color="inherit" to="/">
                    Home
                  </Link>
                  <Link underline="hover" color="inherit" to="/products">
                    Products
                  </Link>
                  <Typography color="text.primary">
                    {productDetails && productDetails._listingName}
                  </Typography>
                </Breadcrumbs>

                <Typography variant="h4" sx={{ fontWeight: "bold", my: 2 }}>
                  {productDetails && productDetails._listingName}
                </Typography>
                <Typography sx={{ mb: 2 }}>Aggregate Materials</Typography>
                <Typography sx={{ color: "#bd8512", mb: 2 }}>
                  ₱{productDetails && productDetails._listingPrice} per cubic
                  mt.
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: "20px" }}>
                  {productDetails && productDetails._listingDescription}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="body1" color="text.secondary">
                  Stocks:
                </Typography>

                <Box
                  display="flex"
                  flexDirection="column"
                  p={2}
                  borderRadius={4}
                  mt={1}
                  style={{
                    backgroundColor:
                      pandiStocks.map((stock) => stock._quantity) ||
                      mindanaoStocks.map((stock) => stock._quantity) > 0
                        ? "#8dd290"
                        : "#f5c9c9",
                  }}
                >
                  <Typography variant="body" color="text.secondary">
                    <strong>Pandi:</strong>{" "}
                    {pandiStocks.map((stock) => stock._quantity) > 0
                      ? `${pandiStocks.map((stock) => stock._quantity)} cu. mt.`
                      : "Out of Stocks"}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  p={2}
                  borderRadius={4}
                  mt={1}
                  style={{
                    backgroundColor:
                      mindanaoStocks.map((stock) => stock._quantity) > 0
                        ? "#8dd290"
                        : "#f5c9c9",
                  }}
                >
                  <Typography variant="body" color="text.secondary">
                    <strong>Mindanao Ave:</strong>{" "}
                    {mindanaoStocks.map((stock) => stock._quantity) > 0
                      ? `${mindanaoStocks.map(
                          (stock) => stock._quantity
                        )} cu. mt.`
                      : "Out of Stocks"}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px" mt={2}>
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
                  onClick={() => navigate("/contact")}
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
