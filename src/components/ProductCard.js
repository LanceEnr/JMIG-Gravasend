import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Chip,
} from "@mui/material";

const MyCard = ({ card }) => (
  <Grid item key={card.name} xs={12} sm={6} md={4} lg={3}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px", // Adjust this value as needed
      }}
    >
      <CardActionArea
        component={Link}
        to={`/productdetails?productName=${encodeURIComponent(card.name)}`}
      >
        <CardMedia
          component="img"
          sx={{
            height: 250,
            transition: "transform 0.3s ease-in-out", // Add transition for smooth zoom effect
            ":hover": {
              transform: "scale(1.015)", // Scale the image up to 105% when hovered
            },
          }}
          image={card.image}
          alt={card.name}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            {card.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: "#bd8512" }}>
              ₱{card.price.toLocaleString()} per cu. mt.
            </Typography>
            <Chip
              label={card.status}
              size="small"
              sx={{
                color:
                  card.status === "Available" ? "success.dark" : "error.dark",
                bgcolor: card.status === "Available" ? "#8dd290" : "#f5c9c9",
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

export default MyCard;
