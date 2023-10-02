import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";

import Title from "./components/Title";
import TripVerification from "./TripVerification";
import TripOngoing from "./TripOngoing";
import TripRecords from "./TripRecords";
function Inspection() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Trips</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Verification" />
              <Tab label="Ongoing" />
              <Tab label="Records" />
            </Tabs>
          </Box>
          {value === 0 && <TripVerification />}
          {value === 1 && <TripOngoing />}
          {value === 2 && <TripRecords />}
        </Box>
      </Paper>
    </div>
  );
}

export default Inspection;
