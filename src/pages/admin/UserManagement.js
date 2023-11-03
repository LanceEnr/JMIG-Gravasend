import React from "react";
import { Paper } from "@mui/material";
import DataGridCustomer from "./components/DataGridCustomer";
import { columnsUserManagement, rowsUserManagement } from "./helpers/data";

function UserManagement() {
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <DataGridCustomer
          title="Customer Lists"
          columns={columnsUserManagement}
          rows={rowsUserManagement}
        />
      </Paper>
    </div>
  );
}

export default UserManagement;
