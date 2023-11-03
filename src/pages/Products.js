// Products.js
import React from "react";
import { MenuList } from "../helpers/MenuList";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import ProductSmokingHero from "../components/ProductSmokingHero";
import ProductBanner from "../components/ProductBanner";

function Products() {
  return (
    <div>
      <div id="product-list-section">
        <ProductBanner />
        <ProductList cards={MenuList} />
      </div>
      <ProductSmokingHero />
    </div>
  );
}

export default Products;
