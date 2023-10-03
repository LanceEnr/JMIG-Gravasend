import React from "react";
import { Paper } from "@mui/material";
import FullFeaturedCrudGrid from "./components/CustomDataGrid";
import { columnsFleetInformation, rowsFleetInformation } from "./helpers/data";

function FleetInformation() {
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <FullFeaturedCrudGrid
          title="Fleet Information"
          columns={columnsFleetInformation}
          rows={rowsFleetInformation}
          newRow={{
            plateNo: "",
            chassisNo: "",
            engineNo: "",
            gvwr: "",
            manufacturer: "",
            model: "",
            mileage: "",
          }}
          fieldToFocus="plateNo"
        />
      </Paper>
    </div>
  );
}

export default FleetInformation;
