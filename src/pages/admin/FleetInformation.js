import React, { useState, useEffect, useCallback } from "react";
import { Paper } from "@mui/material";
import FullFeaturedCrudGrid from "./components/FleetDataGrid";
import { rowsFleetInformation } from "./helpers/data";

function FleetInformation() {
  const [drivers, setDrivers] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await fetch(
          "http://localhost:3001/fetch-driver-available"
        );
        if (response.ok) {
          const data = await response.json();
          const driverNames = Object.keys(data).map(
            (key) => data[key].driverName
          );
          setDrivers(driverNames);
        } else {
          console.error("Failed to fetch drivers");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchDrivers();
  }, []);

  const columnsFleetInformation = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "bodyNo",
      headerName: "Body No.",
      flex: 1,
      flex: 1,
      editable: true,
    },
    { field: "plateNo", headerName: "Tractor No.", flex: 1, editable: true },
    { field: "plateNo2", headerName: "Trailer No.", flex: 1, editable: true },
    { field: "chassisNo", headerName: "Chassis No.", flex: 1, editable: true },
    { field: "engineNo", headerName: "Engine No.", flex: 1, editable: true },
    { field: "model", headerName: "Model", flex: 2, editable: true },
    {
      field: "mileage",
      headerName: "Mileage",
      flex: 2,
      editable: true,
    },
    {
      field: "driverName",
      headerName: "Driver",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: drivers,
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "location",
      headerName: "Location",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pandi", "Mindanao Ave"],
    },
  ];
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
