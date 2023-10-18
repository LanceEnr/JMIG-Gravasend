import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";

import CompanyValues from "./CompanyValues";
import EditTestimonials from "./EditTestimonials";
import EditBanners from "./EditBanners";
import { FaqsTable } from "./FaqsTable";
function Content() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Banners" />
              <Tab label="Testimonials" />
              <Tab label="Company Values" />
              <Tab label="FAQs" />
            </Tabs>
          </Box>
          {value === 0 && <EditBanners />}
          {value === 1 && <EditTestimonials />}
          {value === 2 && <CompanyValues />}
          {value === 3 && <FaqsTable />}
        </Box>
      </Paper>
    </div>
  );
}

export default Content;
