import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/InspectionDataGrid";
import Title from "./components/Title";
import {
  columnsInspectionScheduling,
  rowsInspectionScheduling,
  columnsInspectionRecords,
  rowsInspectionRecords,
} from "./helpers/data";

function Inspection() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Inspection</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Scheduling" />
              <Tab label="Records" />
            </Tabs>
          </Box>
          {value === 0 && (
            <FullFeaturedCrudGrid
              columns={columnsInspectionScheduling}
              rows={rowsInspectionScheduling}
            />
          )}
          {value === 1 && (
            <DataGrid
              checkboxSelection
              disableColumnFilter
              disableColumnSelector
              density="compact"
              columns={columnsInspectionRecords}
              rows={rowsInspectionRecords}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default Inspection;
