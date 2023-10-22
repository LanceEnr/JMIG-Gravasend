import React, { useState, useEffect } from "react";
import axios from "axios";

export async function fetchBannerData() {
  try {
    const response = await axios.get("http://localhost:3001/fetch-banner");
    return response.data;
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error;
  }
}

export async function fetchTestimonialData() {
  try {
    const response = await axios.get(
      "http://localhost:3001/fetch-testimonials"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}

export async function fetchValuesData() {
  try {
    const response = await axios.get("http://localhost:3001/fetch-values");
    return response.data;
  } catch (error) {
    console.error("Error fetching values:", error);
    throw error;
  }
}

export async function fetchAboutData() {
  try {
    const response = await axios.get("http://localhost:3001/fetch-about");
    return response.data;
  } catch (error) {
    console.error("Error fetching about:", error);
    throw error;
  }
}

export async function fetchContactData() {
  try {
    const response = await axios.get("http://localhost:3001/fetch-contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
}
