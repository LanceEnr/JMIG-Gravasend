import React, { useState, useEffect, useCallback } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/MaintenanceDataGrid";
import FullFeaturedCrudGrid2 from "./components/MaintenanceRecordDataGrid";
import Title from "./components/Title";
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
          const plates = Object.keys(data).map((key) => data[key].plateNo2);
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
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "plateNo",
      headerName: "Tractor No.",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: plates,
    },
    { field: "service", headerName: "Service", flex: 2, editable: true },

    {
      field: "frequency",
      headerName: "Frequency",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["1000", "3000", "5000", "10000", "15000", "20000"],
    },
    {
      field: "mileage",
      headerName: "Start Mileage",
      flex: 1,
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
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "Overdue", "Completed"],
    },
  ];

  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Maintenance</Title>
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
    </div>
  );
}

export default Maintenance;
