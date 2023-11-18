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

const transformListingData = (data) => {
  return data.map((item) => ({
    name: item._listingName,
    image: Gravel1,
    price: item._listingPrice,
    status: "Available",
  }));
};

const MenuList = transformListingData(await fetchListingData());

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
