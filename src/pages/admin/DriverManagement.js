import React from "react";
import { Paper } from "@mui/material";
import DataGridDriverManagement from "./components/DataGridDriverManagement";
import { columnsDriverManagement, rowsDriverManagement } from "./helpers/data";

function DriverManagement() {
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <DataGridDriverManagement
          title="Driver Management"
          columns={columnsDriverManagement}
          rows={rowsDriverManagement}
        />
      </Paper>
    </div>
  );
}

export default DriverManagement;
