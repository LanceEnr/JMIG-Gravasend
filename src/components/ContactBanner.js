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
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
        backgroundSize: "cover",
        padding: { xs: "0 10%", sm: "0 23%" }, // reduce the horizontal padding
      }}
    >
      <Typography
        variant="h4"
        sx={{
          width: "70%",
          color: "#fff",
          textAlign: { xs: "center", sm: "left" },
          fontSize: { xs: "h6.fontSize", sm: "h4.fontSize" }, // smaller font size on small screens
        }}
      >
        Looking for a supplier? Set an appointment with us!
      </Typography>
      <Link to="/contact">
        <Button
          variant="contained"
          size={window.innerWidth <= 600 ? "small" : "large"}
          sx={{
            backgroundColor: "#83948a",
            color: "#fff",

            mt: { xs: 2, sm: 0 }, // add top margin on small screens
          }}
        >
          Contact Us
        </Button>
      </Link>
    </Box>
  );
}
