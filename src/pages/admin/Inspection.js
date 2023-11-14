import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Paper, Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FullFeaturedCrudGrid from "./components/InspectionDataGrid";
import Title from "./components/Title";
import {
  rowsInspectionScheduling,
  columnsInspectionRecords,
  rowsInspectionRecords,
} from "./helpers/data";

function Inspection() {
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
  const columnsInspectionScheduling = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "plateNo",
      headerName: "Plate No.",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: plates,
    },
    {
      field: "inspectionType",
      headerName: "Inspection Type",
      flex: 2,
      editable: true,
    },
    {
      field: "nextInspectionDate",
      headerName: "Inspection Date",
      type: "date",
      flex: 3,
      editable: true,
    },
    {
      field: "verdict",
      headerName: "Verdict",
      flex: 2,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Pending", "On Going", "Pass", "Failed"],
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Inspection</Title>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Scheduling" />
              <Tab label="Records" />
            </Tabs>
          </Box>
          {value === 0 && (
            <FullFeaturedCrudGrid
              columns={columnsInspectionScheduling}
              rows={rowsInspectionScheduling}
            />
          )}
          {value === 1 && (
            <DataGrid
              checkboxSelection
              disableColumnFilter
              disableColumnSelector
              density="compact"
              columns={columnsInspectionRecords}
              rows={rowsInspectionRecords}
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

export default Inspection;
