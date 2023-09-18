import React from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { withStyles } from "@mui/styles";
import Sand1 from "../assets/Sand1.webp";
import { Container } from "react-bootstrap";
import "../styles/UserDashboard.css";
import { MenuList } from "../helpers/MenuList";
import MoreProducts from "../components/MoreProducts";

const ColoredLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#f5f0e0", // Lighter color
  },
  barColorPrimary: {
    backgroundColor: "#bd8512", // Darker color
  },
})(LinearProgress);

const ProductDetails = () => {
  const stocksLeft = 50;
  const totalStocks = 100;

  return (
    <div className="userDashboard">
      <Container>
        <Box width="80%" m="80px auto">
          <Box display="flex" flexWrap="wrap" columnGap="40px">
            <Box
              flex="1 1 40%"
              mb="40px"
              style={{ borderRadius: "5px", overflow: "hidden" }}
            >
              <img
                alt="Sand"
                src={Sand1}
                width="100%"
                height="100%"
                style={{ objectFit: "contain", transform: "scale(1.1)" }}
              />
            </Box>

            <Box flex="1 1 50%" mb="40px">
              <Box display="flex" justifyContent="space-between">
                <Box>Products/Sand</Box>
                <Box>Prev Next</Box>
              </Box>

              <Box m="10px 0 25px 0">
                <Typography variant="h3" sx={{ color: "#004aad" }}>
                  Concrete Sand
                </Typography>
                <Typography sx={{ color: "#bd8512" }}>
                  ₱4,000 per cu. mt.
                </Typography>
                <Typography sx={{ mt: "20px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  pellentesque metus vel lectus pellentesque, eget ullamcorper
                  est vestibulum. Donec interdum tincidunt dui, ut condimentum
                  metus faucibus nec. Maecenas accumsan justo nunc, finibus
                  pharetra velit rhoncus tempor. Nunc dignissim nulla est, et
                  scelerisque erat consectetur in. Integer molestie ultricies
                  nibh, ac euismod velit. Maecenas volutpat, est id eleifend
                  dignissim, metus urna imperdiet risus, non dignissim magna
                  ante ut nibh. Cras augue elit, faucibus bibendum dui a, semper
                  suscipit libero. Maecenas faucibus id neque sit amet sodales.
                  In tincidunt venenatis magna, at bibendum ante tempor ut.
                  Vivamus eu neque felis. Ut a ex non felis placerat sodales vel
                  vitae eros. Aenean molestie tellus pulvinar mi ultricies
                  scelerisque. Aliquam vitae sagittis libero, et porta sapien.
                  Praesent id mi ut leo tristique suscipit eget sed odio.
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
                    style={{ height: "8px", borderRadius: "10px" }} // Add this line
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
