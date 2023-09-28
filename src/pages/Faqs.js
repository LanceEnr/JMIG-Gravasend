import React from "react";
import CustomizedAccordions, {
  items,
} from "../components/CustomizedAccordions";
import "../styles/Faqs.css";
import { Container, Box } from "@mui/material";
import Banner from "../components/Banner";

import BannerImage from "../assets/faqs.webp";

function Faqs() {
  return (
    <div className="faqs">
      <Banner
        bannerImage={BannerImage}
        title="FREQUENTLY ASKED QUESTIONS"
        text="Search for answers below"
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box mt={2}>
          <CustomizedAccordions items={items} />
        </Box>
      </Container>
    </div>
  );
}

export default Faqs;
