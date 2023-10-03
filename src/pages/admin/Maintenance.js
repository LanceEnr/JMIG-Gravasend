import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/CustomDataGrid";
import Title from "./components/Title";
import {
  columnsMaintenanceScheduling,
  rowsMaintenanceScheduling,
  columnsMaintenanceRecords,
  rowsMaintenanceRecords,
} from "./helpers/data";

function Maintenance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Maintenance</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Maintenance"
            >
              <Tab label="Scheduling" />
              <Tab label="Records" />
            </Tabs>
          </Box>
          {value === 0 && (
            <FullFeaturedCrudGrid
              columns={columnsMaintenanceScheduling}
              rows={rowsMaintenanceScheduling}
            />
          )}
          {value === 1 && (
            <DataGrid
              checkboxSelection
              disableColumnFilter
              disableColumnSelector
              density="compact"
              columns={columnsMaintenanceRecords}
              rows={rowsMaintenanceRecords}
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

export default Maintenance;
