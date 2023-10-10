import React from "react";
import { Grid } from "@mui/material";
import MyCard from "./ServiceCard";

const MoreProducts = ({ cards }) => (
  <Grid container spacing={4}>
    {cards.slice(0, 4).map((card) => (
      <MyCard card={card} width={100} />
    ))}
  </Grid>
);
export default MoreProducts;
