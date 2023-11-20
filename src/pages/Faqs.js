import React from "react";
import CustomizedAccordions, {
  items,
} from "../components/CustomizedAccordions";
import "../styles/Faqs.css";
import { Container, Box } from "@mui/material";
import Banner from "../components/FAQBanner";
import { rowsFaqs, fetchBannerDataFAQ } from "./cmshelper/cms";

import BannerImage from "../assets/faqs1.webp";
import ProductSmokingHero from "../components/ProductSmokingHero";

function Faqs() {
  return (
    <div className="faqs">
      <Banner />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CustomizedAccordions items={rowsFaqs} />
      </Container>
      <ProductSmokingHero />
    </div>
  );
}

export default Faqs;
