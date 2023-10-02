import React from "react";
import { Paper } from "@mui/material";
import DataGridDriverManagement from "./components/DataGridDriverManagement";
import { columnsUserManagement, rowsUserManagement } from "./helpers/data";

function UserManagement() {
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <DataGridDriverManagement
          title="User Management"
          columns={columnsUserManagement}
          rows={rowsUserManagement}
        />
      </Paper>
    </div>
  );
}

export default UserManagement;
