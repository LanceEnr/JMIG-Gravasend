import React from "react";
import { MenuList } from "../helpers/MenuList";
import ProductList from "../components/ProductList";
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
      <ProductList cards={MenuList} />
    </div>
  );
}

export default Products;
