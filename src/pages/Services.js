import React from "react";
import { ServicesList } from "../helpers/MenuList";
import ServiceList from "../components/ServiceList";
import "../styles/Products.css";
import Banner from "../components/Banner";
import BannerImage from "../assets/services.webp";
import ContactBanner from "../components/ContactBanner";

function Services() {
  return (
    <div>
      <div className="menu">
        <Banner
          bannerImage={BannerImage}
          title="SERVICES"
          text="We offer a range of services including dump truck and heavy equipment operations
        "
        />
        <ServiceList cards={ServicesList} />
      </div>
      <ContactBanner />
    </div>
  );
}

export default Services;
