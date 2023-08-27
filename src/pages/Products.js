import React from "react";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
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
      <div className="menuList">
        {MenuList.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
