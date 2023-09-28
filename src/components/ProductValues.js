import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 2,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "#fafbf5" }}
    >
      <Container sx={{ display: "flex", position: "relative" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <LocalShippingOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, color: "#004aad" }}>
                Premium Gravel and Sand
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Supplying the highest quality gravel and sand for all your
                construction needs. Just a few clicks away from delivery to your
                site.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <VerifiedOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, color: "#004aad" }}>
                Quality Guarantee
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                We guarantee the highest quality in all our products to meet
                your construction needs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Avatar
                style={{
                  backgroundColor: "#EBDAB7",
                  height: "70px",
                  width: "70px",
                }}
              >
                <SupportAgentOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, color: "#004aad" }}>
                Reliable Customer Service
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                Our customer service team is always ready to assist you with
                your needs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
