import React from "react";
import { MenuList } from "../helpers/MenuList";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import Banner from "../components/Banner";
import BannerImage from "../assets/catalog.webp";
import ContactBanner from "../components/ContactBanner";

function Products() {
  return (
    <div>
      <div className="menu">
        <Banner
          bannerImage={BannerImage}
          title="AGGREGATE MATERIALS"
          text="Solid foundations begin with quality gravel and sand

        "
        />
        <ProductList cards={MenuList} />
      </div>
      <ContactBanner />
    </div>
  );
}

export default Products;
