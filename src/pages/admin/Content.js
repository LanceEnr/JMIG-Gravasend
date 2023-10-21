import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";

import CompanyValues from "./CompanyValues";
import EditTestimonials from "./EditTestimonials";
import EditBanners from "./EditBanners";
import { columnsFaqs, rowsFaqs } from "./helpers/data";
import FaqTable from "./components/FaqTable";
import AboutContent from "./AboutContent";
import ContactContent from "./ContactContent";
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
              <Tab label="Values" />
              <Tab label="About" />
              <Tab label="Contact" />
              <Tab label="FAQs" />
            </Tabs>
          </Box>
          {value === 0 && <EditBanners />}
          {value === 1 && <EditTestimonials />}
          {value === 2 && <CompanyValues />}
          {value === 3 && <AboutContent />}
          {value === 4 && <ContactContent />}
          {value === 5 && <FaqTable columns={columnsFaqs} rows={rowsFaqs} />}
        </Box>
      </Paper>
    </div>
  );
}

export default Content;
