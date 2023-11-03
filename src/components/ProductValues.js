import * as React from "react";
import { Avatar } from "@mui/material";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/common/Typography";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import CurvyLines from "../assets/appCurvyLines.webp";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "#e8f2ff" }}
    >
      <Container sx={{ mt: 15, mb: 25, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src={CurvyLines} // Use the imported image here
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />

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
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
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
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
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
                <HandymanOutlinedIcon
                  fontSize="large"
                  style={{ color: "#bd8512" }}
                />
              </Avatar>
              <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Reliable Heavy Equipment
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                We provide top-quality construction machinery and heavy
                equipment solutions, ensuring the reliability and efficiency of
                your projects.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
