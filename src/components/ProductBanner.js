// ProductBanner.js
import React, { useRef, useEffect } from "react";
import { Button, Box, Hidden } from "@mui/material";
import Typography from "../components/common/Typography";
import ProductBannerLayout from "./ProductBannerLayout";
import { fetchBannerDataProduct } from "../components/cms";

import productImage from "../assets/excavator.webp";
const valuesData = await fetchBannerDataProduct();

//import productImage from `${valuesData}`;
export default function ProductBanner() {
  const productListSectionRef = useRef(null);

  useEffect(() => {
    // Calculate the height of the ProductList section and set it as a variable
    const productListSection = productListSectionRef.current;
    const productListHeight = productListSection
      ? productListSection.clientHeight
      : 0;
    setProductListHeight(productListHeight);
  }, []);

  function scrollToProductListSection() {
    window.scrollTo({
      top: productListHeight,
      behavior: "smooth",
    });
  }

  const [productListHeight, setProductListHeight] = React.useState(0);
  return (
    <div ref={productListSectionRef}>
      <ProductBannerLayout
        sxBackground={{
          backgroundColor: "#fff", // Set the background color to white
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          <Box flex={1} textAlign={{ xs: "center", sm: "left" }}>
            <Typography
              variant="subtitle2"
              sx={{
                marginTop: {
                  sm: "80px",
                },
                color: "#004aad",
                width: "100%",
              }}
            >
              {valuesData._heading}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
              style={{
                fontWeight: "bold",
                marginTop: 8,
                width: "100%",
              }}
            >
              {valuesData._subheading}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                marginTop: 4,
                maxWidth: 200,
                backgroundColor: "#004aad",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#003882",
                },
              }}
              onClick={scrollToProductListSection}
            >
              Order Now
            </Button>
          </Box>
          <Hidden mdDown>
            <Box>
              {/* Add your product image */}
              <img
                src={productImage}
                alt="Product"
                style={{ width: "100%", marginTop: "20px" }}
              />
            </Box>
          </Hidden>
        </Box>
      </ProductBannerLayout>
    </div>
  );
}
