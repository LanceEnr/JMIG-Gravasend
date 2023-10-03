import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import Title from "./components/Title";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const rows = [
  {
    id: 1,
    driver: "John Doe",
    datetime: "2023-09-30 19:59",
  },
  // Add more rows as needed
];

export default function TripOngoing() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "driver", headerName: "Driver name", flex: 1 },
    { field: "datetime", headerName: "Date and Time", flex: 1 },
    {
      field: "track",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
          Monitor Delivery
        </Button>
      ),
    },
  ];

  return (
    <Box style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableColumnFilter
        disableColumnSelector
        density="compact"
      />
    </Box>
  );
}
