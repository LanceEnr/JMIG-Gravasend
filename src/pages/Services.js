import React from "react";
import { ServicesList } from "../helpers/MenuList";
import ServiceList from "../components/ServiceList";
import "../styles/Products.css";

import ProductSmokingHero from "../components/ProductSmokingHero";
import ServiceBanner from "../components/ServiceBanner";

function Services() {
  return (
    <div>
      <div className="menu" id="product-list-section">
        <ServiceBanner />

        <ServiceList cards={ServicesList} />
      </div>

      <ProductSmokingHero />
    </div>
  );
}

export default Services;
