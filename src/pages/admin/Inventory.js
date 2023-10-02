import React, { useState } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/CustomDataGrid";
import Title from "./components/Title";
import {
  columnsCurrentInventory,
  rowsCurrentInventory,
  columnsIncomingInventory,
  rowsIncomingInventory,
  columnsOutgoingInventory,
  rowsOutgoingInventory,
} from "./helpers/data";

function Inventory() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Inventory</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Maintenance"
            >
              <Tab label="Current" />
              <Tab label="Incoming" />
              <Tab label="Outgoing" />
            </Tabs>
          </Box>
          {value === 0 && (
            <FullFeaturedCrudGrid
              columns={columnsCurrentInventory}
              rows={rowsCurrentInventory}
            />
          )}
          {value === 1 && (
            <FullFeaturedCrudGrid
              columns={columnsIncomingInventory}
              rows={rowsIncomingInventory}
            />
          )}
          {value === 2 && (
            <FullFeaturedCrudGrid
              columns={columnsOutgoingInventory}
              rows={rowsOutgoingInventory}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default Inventory;
