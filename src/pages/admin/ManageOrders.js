import React from "react";
import { Paper } from "@mui/material";
import FullFeaturedCrudGrid from "./components/CustomDataGrid";
import { columnsManageOrders, rowsManageOrders } from "./helpers/data";

function ManageOrders() {
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <FullFeaturedCrudGrid
          title="Manage Orders"
          columns={columnsManageOrders}
          rows={rowsManageOrders}
        />
      </Paper>
    </div>
  );
}

export default ManageOrders;
