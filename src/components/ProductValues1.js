import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Values, { fetchValuesData } from "../pages/cmshelper/cms";
const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 2,
};

function ProductValues1() {
  const [heading1, setHeading1] = useState("");
  const [subheading1, setSubheading1] = useState("");
  const [heading2, setHeading2] = useState("");
  const [subheading2, setSubheading2] = useState("");
  const [heading3, setHeading3] = useState("");
  const [subheading3, setSubheading3] = useState("");

  useEffect(() => {
    fetchValuesData()
      .then((data) => {
        if (data) {
          setHeading1(data._valueHeading1);
          setHeading2(data._valueHeading2);
          setHeading3(data._valueHeading3);
          setSubheading1(data._valueSubheading1);
          setSubheading2(data._valueSubheading2);
          setSubheading3(data._valueSubheading3);
        } else {
          console.error("Banner image data not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching banner:", error);
      });
  }, []);

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
              <Typography variant="h6" sx={{ my: 2, color: "#83948a" }}>
                {heading1}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                {subheading1}
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
              <Typography variant="h6" sx={{ my: 2, color: "#83948a" }}>
                {heading2}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                {subheading2}
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
              <Typography variant="h6" sx={{ my: 2, color: "#83948a" }}>
                {heading3}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ textAlign: "center" }}
              >
                {subheading3}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues1;
