import React from "react";
import { Grid } from "@mui/material";
import MyCard from "./ServiceCard";

const MoreServices = ({ cards }) => (
  <Grid container spacing={4}>
    {cards.slice(0, 4).map((card) => (
      <MyCard card={card} />
    ))}
  </Grid>
);
export default MoreServices;
