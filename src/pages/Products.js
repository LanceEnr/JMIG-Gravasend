import React from "react";
import { MenuList } from "../helpers/MenuList";
import MyCards from "../components/ProductCard";
import "../styles/Products.css";
import Banner from "../components/Banner";
import BannerImage from "../assets/catalog.webp";

function Products() {
  return (
    <div className="menu">
      <Banner
        bannerImage={BannerImage}
        title="PRODUCT CATALOG"
        text="Solid foundations begin with quality gravel and sand

        "
      />
      <MyCards cards={MenuList} />
    </div>
  );
}

export default Products;
