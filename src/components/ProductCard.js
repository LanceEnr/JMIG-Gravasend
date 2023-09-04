import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import Gravel1 from "../assets/Gravel1.webp";
import Gravel2 from "../assets/Gravel2.webp";
import Gravel3 from "../assets/Gravel3.webp";
import Sand1 from "../assets/Sand1.webp";
import Sand2 from "../assets/Sand2.webp";
import Sand3 from "../assets/Sand3.webp";

export const MenuList = [
  {
    name: "Pea Gravel",
    image: Gravel1,
    price: 3000,
  },
  {
    name: "Crushed Stone",
    image: Gravel2,
    price: 4000,
  },
  {
    name: "Quarry Process",
    image: Gravel3,
    price: 5000,
  },
  {
    name: "Concrete Sand",
    image: Sand1,
    price: 4000,
  },
  {
    name: "Masonry Sand",
    image: Sand2,
    price: 3400,
  },
  {
    name: "Crushed Sand",
    image: Sand3,
    price: 3400,
  },
];

const MyCard = ({ card }) => (
  <Grid item key={card.name} xs={12} sm={6} md={4}>
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="div" sx={{ pt: "56.25%" }} image={card.image} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          {card.name}
        </Typography>
        <Typography color="primary" variant="subtitle1">
          PHP {card.price.toLocaleString()} per cu. mt.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          endIcon={<VisibilityOutlinedIcon />}
        >
          View
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

const MyCards = ({ cards }) => (
  <Container sx={{ py: 8 }} maxWidth="md">
    <Grid container spacing={4}>
      {cards.map((card) => (
        <MyCard card={card} />
      ))}
    </Grid>
  </Container>
);

export default MyCards;
