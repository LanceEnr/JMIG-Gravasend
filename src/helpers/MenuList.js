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

export const MenuList = [
  {
    name: "Vibro Sand",
    image: Gravel1,
    price: 3000,
    status: "Available",
  },
  {
    name: "White Sand",
    image: Gravel2,
    price: 4000,
    status: "Available",
  },
  {
    name: "Lahar",
    image: Gravel3,
    price: 5000,
    status: "Available",
  },
  {
    name: "Escombro",
    image: Sand1,
    price: 4000,
    status: "Available",
  },
  {
    name: "S1",
    image: Sand2,
    price: 3400,
    status: "Unavailable",
  },
  {
    name: "Gravel 3/8",
    image: Sand3,
    price: 3400,
    status: "Unavailable",
  },
  {
    name: "Gravel 3/4",
    image: Gravel1,
    price: 3000,
    status: "Available",
  },
  {
    name: "G1",
    image: Gravel2,
    price: 4000,
    status: "Available",
  },
];

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
