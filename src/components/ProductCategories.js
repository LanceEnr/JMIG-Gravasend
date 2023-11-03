import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../components/common/Typography";
import Gravel1 from "../assets/Gravel1.webp";
import Gravel2 from "../assets/Gravel2.webp";
import Gravel3 from "../assets/Gravel3.webp";
import Sand1 from "../assets/Sand1.webp";
import Sand2 from "../assets/Sand2.webp";
import Sand3 from "../assets/Sand3.webp";
import backhoe from "../assets/backhoe.webp";
import trailerbed from "../assets/trailerbed.webp";
import loader from "../assets/loader.webp";
import dumptruck from "../assets/dumptruck.webp";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: theme.spacing(1), // Apply borderRadius to create rounded corners
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
    borderRadius: theme.spacing(1), // Apply borderRadius for the imageTitle as well
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    borderRadius: theme.spacing(1), // Apply borderRadius to create rounded corners
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: Gravel1,
    title: "Vibro Sand",
    width: "40%",
  },
  {
    url: Sand1,
    title: "G1",
    width: "20%",
  },
  {
    url: Gravel3,
    title: "Lahar",
    width: "40%",
  },
  {
    url: backhoe,
    title: "Backhoe",
    width: "38%",
  },
  {
    url: dumptruck,
    title: "Dumptruck",
    width: "38%",
  },
  {
    url: loader,
    title: "Loader",
    width: "24%",
  },
  {
    url: Sand3,
    title: "Escombro",
    width: "40%",
  },
  {
    url: Gravel2,
    title: "White Sand",
    width: "20%",
  },
  {
    url: Sand2,
    title: "Gravel 3/8",
    width: "40%",
  },
];

export default function ProductCategories() {
  return (
    <Container
      component="section"
      sx={{
        pt: 8,
        pb: 4,
      }}
    >
      <Typography
        variant="h4"
        marked="center"
        align="center"
        component="h2"
        style={{ fontWeight: "bold" }}
      >
        SOME OF OUR OFFERINGS
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
