import React from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import backhoe from "../assets/backhoe.webp";
import { Container } from "react-bootstrap";
import "../styles/UserDashboard.css";
import { ServicesList } from "../helpers/MenuList";
import MoreProducts from "../components/MoreProducts";

const ServiceDetails = () => {
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
                alt="Backhoe"
                src={backhoe}
                width="100%"
                height="100%"
                style={{ objectFit: "contain", transform: "scale(1.1)" }}
              />
            </Box>

            <Box flex="1 1 50%" mb="40px">
              <Box m="10px 0 25px 0">
                <Typography variant="h3" sx={{ color: "#004aad" }}>
                  Backhoe
                </Typography>
                <Typography sx={{ color: "#bd8512" }}>
                  ₱3,000 per hour
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
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  label="Available"
                  color="success"
                  size="large"
                  variant="outlined"
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
              <MoreProducts cards={ServicesList} />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ServiceDetails;
