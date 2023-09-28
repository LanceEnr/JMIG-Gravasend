import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BannerImage from "../assets/faqs.webp";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <Box
      sx={{
        height: "40vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
        backgroundSize: "cover",
        padding: { xs: "0 10%", sm: "0 23%" }, // reduce the horizontal padding
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          textAlign: { xs: "center", sm: "left" },
          fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" }, // smaller font size on small screens
        }}
      >
        Are you looking for a supplier?
      </Typography>
      <Link to="/contact">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#004aad",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#003882",
            },
            mt: { xs: 2, sm: 0 }, // add top margin on small screens
          }}
        >
          Contact Us
        </Button>
      </Link>
    </Box>
  );
}
