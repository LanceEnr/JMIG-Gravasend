import React from "react";
import CustomizedAccordions, {
  items,
} from "../components/CustomizedAccordions";
import "../styles/Faqs.css";
import { Container, Box } from "@mui/material";
import Banner from "../components/Banner";
import { rowsFaqs } from "./cmshelper/cms";

import BannerImage from "../assets/faqs1.webp";
import ProductSmokingHero from "../components/ProductSmokingHero";

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
          <CustomizedAccordions items={rowsFaqs} />
        </Box>
      </Container>
      <ProductSmokingHero />
    </div>
  );
}

export default Faqs;
