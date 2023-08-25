import React from "react";
import { MenuList } from "../helpers/MenuList";
import MenuItem from "../components/MenuItem";
import "../styles/Products.css";
import BannerImage from "../assets/catalog.webp";

function Products() {
  return (
    <div className="menu">
      <div
        className="menuImage"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BannerImage})`,
        }}
      >
        <h1 className="menuTitle">PRODUCT CATALOG</h1>
        <p className="menuText">
          Solid foundations begin with quality gravel and sand
        </p>
      </div>
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
