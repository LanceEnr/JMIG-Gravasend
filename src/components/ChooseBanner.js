import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BannerImage from "../assets/choose.webp";

function ChooseBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Box
        sx={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // center items vertically
          padding: "2rem", // add some padding
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
          backgroundSize: "cover", // ensure the image covers the entire box
          color: "#fafbf5",
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h3"}
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Why Choose Us?
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ width: isMobile ? "100%" : "50%", mb: 2, textAlign: "center" }}
        >
          Our products are sourced responsibly and sustainably. We believe in
          doing our part for the environment, and we ensure that our operations
          have minimal impact on the natural world.
        </Typography>
        <Typography
          variant="caption"
          gutterBottom
          sx={{
            width: isMobile ? "100%" : "50%",
            mb: 2,
            textAlign: "center",
          }}
        >
          By choosing us, you’re not just getting superior materials - you’re
          also contributing to a greener planet.
        </Typography>
      </Box>
    </div>
  );
}

export default ChooseBanner;
