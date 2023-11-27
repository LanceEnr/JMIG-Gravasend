import React from "react";
import { Paper } from "@mui/material";
import DataGridDriverManagement from "./components/DataGridDriverManagement";
import { columnsDriverManagement, rowsDriverManagement } from "./helpers/data";

function DriverManagement() {
  return (
    <div>
      <DataGridDriverManagement
        title="Driver Management"
        columns={columnsDriverManagement}
        rows={rowsDriverManagement}
      />
    </div>
  );
}

export default DriverManagement;
