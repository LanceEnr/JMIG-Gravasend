import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
  Grid,
} from "@mui/material";
import Rating from "@mui/material/Rating";
const testimonies = [
  {
    name: "Alice",
    text: "The quality of gravel supplied for my construction project was top-notch. Delivery was timely and the customer service was excellent.",
    avatar: "A",
    rating: 5,
  },
  {
    name: "Bob",
    text: "I have been ordering gravel and sand supplies from this website for my various construction projects. The quality has always been consistent and the prices are competitive.",
    avatar: "B",
    rating: 4,
  },
  {
    name: "Charlie",
    text: "I have been ordering gravel and sand supplies from this website for my various construction projects. ",
    avatar: "C",
    rating: 4,
  },
];
export default function TestimoniesHero() {
  return (
    <Container sx={{ my: 16 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        What Our Clients Say
      </Typography>
      <Grid container spacing={2} justifyContent="space-around">
        {testimonies.map((testimony, index) => (
          <Grid item key={index}>
            <Card
              elevation={2}
              sx={{
                minHeight: 325,
                width: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    marginBottom: 2,
                  }}
                >
                  {testimony.avatar}
                </Avatar>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ pb: 2, textAlign: "center" }}
                >
                  "{testimony.text}"
                </Typography>
                <Rating name="read-only" value={testimony.rating} readOnly />
                <Typography variant="h6" component="div" sx={{ pt: 2 }}>
                  {testimony.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
