import React, { useState, useEffect, useCallback } from "react";
import { Paper, Box } from "@mui/material";
import { rowsFleetInformation } from "./helpers/data";
import Typography from "../../components/common/Typography";
import FleetDataGrid from "./components/FleetDataGrid";

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
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      hidden: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "bodyNo",
      headerName: "BODY NO.",
      flex: 1.5,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "plateNo",
      headerName: "TRACTOR NO.",
      flex: 2,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "plateNo2",
      headerName: "TRAILER NO.",
      flex: 2,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "chassisNo",
      headerName: "CHASSIS NO.",
      flex: 2.5,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "engineNo",
      headerName: "ENGINE NO.",
      flex: 2.5,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "model",
      headerName: "MODEL",
      flex: 1.5,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "mileage",
      headerName: "MILEAGE",
      flex: 2,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "driverName",
      headerName: "DRIVER",
      flex: 3,
      editable: true,
      type: "singleSelect",
      valueOptions: drivers,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1.5,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "location",
      headerName: "LOCATION",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pandi", "Mindanao Ave"],
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ my: 14 }}>
      <Typography
        variant="h3"
        marked="left"
        style={{ fontWeight: "bold", fontSize: "30px" }}
        gutterBottom
      >
        Fleet Information
      </Typography>
      <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
        <FleetDataGrid
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
    </Box>
  );
}

export default FleetInformation;
