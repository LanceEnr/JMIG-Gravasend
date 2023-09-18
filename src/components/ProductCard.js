import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const MyCard = ({ card }) => (
  <Grid item key={card.name} xs={12} sm={6} md={3}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ":hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia component="div" sx={{ pt: "56.25%" }} image={card.image} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="body1"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          {card.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: "#bd8512" }} variant="subtitle2">
            ₱{card.price.toLocaleString()} per cu. mt.
          </Typography>
          <Chip
            label={card.status}
            color={card.status === "Available" ? "success" : "error"}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          sx={{ color: "#004aad" }}
          endIcon={<VisibilityOutlinedIcon />}
        >
          View
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default MyCard;
