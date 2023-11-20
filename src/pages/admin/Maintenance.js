import React, { useState, useEffect, useCallback } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/MaintenanceDataGrid";
import FullFeaturedCrudGrid2 from "./components/MaintenanceRecordDataGrid";
import Typography from "../../components/common/Typography";
import axios from "axios";
import {
  rowsMaintenanceScheduling,
  columnsMaintenanceRecords,
  rowsMaintenanceRecords,
} from "./helpers/data";

function Maintenance() {
  const [value, setValue] = useState(0);
  const [plates, setPlates] = useState([]);

  useEffect(() => {
    async function fetchPlates() {
      try {
        const response = await fetch("http://localhost:3001/fetch-trucks");
        if (response.ok) {
          const data = await response.json();
          const plates = Object.keys(data).map((key) => data[key].plateNo);
          setPlates(plates);
        } else {
          console.error("Failed to fetch plates");
        }
      } catch (error) {
        console.error("Error fetching plates:", error);
      }
    }

    fetchPlates();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columnsMaintenanceScheduling = [
    {
      field: "id",
      headerName: "ID",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "plateNo",
      headerName: "Tractor No.",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: plates,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "service",
      headerName: "Service",
      flex: 2,
      editable: true,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "frequency",
      headerName: "Frequency",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["1000", "3000", "5000", "10000", "15000", "20000"],
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "mileage",
      headerName: "Start Mileage",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "nextDueMileage",
      headerName: "Next Due Mileage",
      flex: 2,
      valueGetter: (params) => {
        const mileage = params.row.mileage;
        const frequency = params.row.frequency;
        return parseInt(frequency) + parseInt(mileage);
      },
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "Completed"],
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
  ];

  return (
    <div>
      <Box sx={{ my: 12, mx: 6 }}>
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Maintenance
        </Typography>
        <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
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
              <FullFeaturedCrudGrid2
                columns={columnsMaintenanceRecords}
                rows={rowsMaintenanceRecords}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Maintenance;
