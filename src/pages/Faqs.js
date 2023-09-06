import React from "react";
import CustomizedAccordions, {
  items,
} from "../components/CustomizedAccordions";
import "../styles/Faqs.css";
import { Typography, Container, Box } from "@mui/material";

function Faqs() {
  return (
    <div className="faqs">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "#004aad", fontWeight: "bold" }}
        >
          Frequently Asked Questions
        </Typography>
        <Box mt={2}>
          <CustomizedAccordions items={items} />
        </Box>
      </Container>
    </div>
  );
}

export default Faqs;
