import React, { useState, useEffect, useCallback } from "react";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/MaintenanceDataGrid";
import Title from "./components/Title";
import {
  rowsMaintenanceScheduling,
  columnsMaintenanceRecords,
  rowsMaintenanceRecords,
} from "./helpers/data";

function Maintenance() {
  const [value, setValue] = useState(0);
  const [plates, setPlates] = useState([]);
  const [selectedPlateMileage, setSelectedPlateMileage] = useState(null);
  const [selectedPlateNo, setSelectedPlateNo] = useState("");

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
  const fetchPlateMileage = async (plateNo) => {
    console.log("this");
    try {
      const response = await fetch(
        `http://localhost:3001/fetch-mileage?plateNo=${plateNo}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedPlateMileage(data.mileage);
      } else {
        console.error("Failed to fetch mileage for plate:", plateNo);
      }
    } catch (error) {
      console.error("Error fetching mileage for plate:", plateNo, error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0 && plates.length > 0) {
      fetchPlateMileage(selectedPlateNo);
    }
  };
  const handlePlateSelectChange = (event) => {
    const newPlateNo = event.target.value;
    setSelectedPlateNo(newPlateNo);
    fetchPlateMileage(newPlateNo);
    console.log("working");
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
      field: "nextDueMileage",
      headerName: "Next Due Mileage",
      flex: 2,
      value: selectedPlateMileage,
    },
  ];
  const handleEditCellChange = (params) => {
    if (params.field === "plateNo") {
      setSelectedPlateNo(params.props.value);
      fetchPlateMileage(params.props.value);
    }
  };
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
            <DataGrid
              checkboxSelection
              disableColumnFilter
              disableColumnSelector
              density="compact"
              columns={columnsMaintenanceRecords}
              rows={rowsMaintenanceRecords}
              onEditCellChange={handleEditCellChange}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default Maintenance;
