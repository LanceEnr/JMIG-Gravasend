import React, { useState, useEffect } from "react";
import axios from "axios";
import Gravel1 from "../assets/Gravel1.webp";
import Gravel2 from "../assets/Gravel2.webp";
import Gravel3 from "../assets/Gravel3.webp";
import Sand1 from "../assets/Sand1.webp";
import Sand2 from "../assets/Sand2.webp";
import Sand3 from "../assets/Sand3.webp";
import backhoe from "../assets/backhoe.webp";
import trailerbed from "../assets/trailerbed.webp";
import loader from "../assets/loader.webp";
import dumptruck from "../assets/dumptruck.webp";

const fetchListingData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/get-listing");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchStocks = async (productName) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/get-listing-stocks",
      {
        params: { productName },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return [];
  }
};

const transformListingData = async (data) => {
  const transformedData = await Promise.all(
    data.map(async (item) => {
      const imageFileName =
        item._imgPath && item._imgPath.length > 0
          ? item._imgPath[0].substring(item._imgPath[0].lastIndexOf("\\") + 1)
          : "defaultImage.jpg";

      try {
        const stocks = await fetchStocks(item._listingName);
        console.log(stocks);

        return {
          name: item._listingName,
          image: require(`../images/listings/${imageFileName}`),
          price: item._listingPrice,
          //status: stocks && stocks.length > 0 ? "Available" : "Out of Stock",
        };
      } catch (error) {
        console.error("Error fetching stocks:", error);
        return {
          name: item._listingName,
          image: require(`../images/listings/${imageFileName}`),
          price: item._listingPrice,
          //status: "Error fetching stocks",
        };
      }
    })
  );

  return transformedData;
};

const MenuList = await transformListingData(await fetchListingData());

export { MenuList };

export const ServicesList = [
  {
    name: "Dump Truck",
    image: dumptruck,
    price: 2000,
    status: "Available",
  },
  {
    name: "Loader",
    image: loader,
    price: 2500,
    status: "Available",
  },
  {
    name: "Back Hoe",
    image: backhoe,
    price: 3000,
    status: "Available",
  },
  {
    name: "Trailer Bed",
    image: trailerbed,
    price: 4000,
    status: "Available",
  },
];
