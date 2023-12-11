import axios from "axios";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Chip } from "@mui/material";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
export const columnsDriverManagement = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "profilePicture",
    headerName: "Picture",
    flex: 1,
    renderCell: (params) => (
      <img
        src={
          isValidUrl(params.row.profilePicture)
            ? params.row.profilePicture
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt={"Picture"}
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />
    ),
  },
  { field: "driverName", headerName: "Name", flex: 1, editable: true },
  { field: "contact", headerName: "Contact", flex: 1, editable: true },
  {
    field: "date",
    headerName: "Hire Date",
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  { field: "email", headerName: "Email", flex: 1, editable: true },
  { field: "licenseNo", headerName: "License", flex: 1, editable: true },
];

export const columnsInspectionRecords = [
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
    headerName: "PLATE NO.",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "inspectionType",
    headerName: "INSPECTION TYPE",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },

  {
    field: "nextInspectionDate",
    headerName: "INSPECTION DATE",
    type: "date",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },

  {
    field: "verdict",
    headerName: "VERDICT",
    flex: 1.5,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
    renderCell: (params) => {
      if (params.value === "Passed") {
        return (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "success.dark",
                }}
              >
                Passed
              </Typography>
            }
            sx={{ bgcolor: "#8dd290" }}
            size="small"
          />
        );
      } else if (params.value === "On-going") {
        return (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "info.dark",
                }}
              >
                On-going
              </Typography>
            }
            sx={{ bgcolor: "#90caf9" }}
            size="small"
          />
        );
      } else if (params.value === "Failed") {
        return (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "error.dark",
                }}
              >
                Failed
              </Typography>
            }
            sx={{ bgcolor: "#f5c9c9" }}
            size="small"
          />
        );
      } else {
        return (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "warning.dark",
                }}
              >
                Pending
              </Typography>
            }
            sx={{ bgcolor: "#ffc890" }}
            size="small"
          />
        );
      }
    },
  },
];

export const columnsTripVerification = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "driverName", headerName: "Plate No.", flex: 2 },
  {
    field: "dateTime",
    headerName: "Date and Time",
    type: "datetime",
    flex: 2,
  },
  {
    field: "approval",
    headerName: "Approval",
    type: "singleSelect",
    valueOptions: ["Approved", "Rejected", "Pending"],
  },
  {
    field: "verdict",
    headerName: "Verdict",
    flex: 2,
  },
];

export const columnsCurrentInventory = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 2,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity (cub. mt.)",
    flex: 2,
    editable: true,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 2,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Pandi", "Mindanao Ave."],
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    type: "datetime",
    flex: 3,
  },
];

export const columnsIncomingInventory = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "itemName",
    headerName: "ITEM NAME",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },

  {
    field: "quantity",
    headerName: "QUANTITY",
    flex: 1,
    valueFormatter: (params) => `${params.value} cu. mt.`,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "name",
    headerName: "DRIVER NAME",
    flex: 2,
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
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "date",
    headerName: "DATE ORDERED",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
];

export const columnsOutgoingInventory = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "itemName",
    headerName: "ITEM NAME",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },

  {
    field: "quantity",
    headerName: "QUANTITY",
    flex: 1,
    valueFormatter: (params) => `${params.value} cu. mt.`,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "name",
    headerName: "DRIVER NAME",
    flex: 2,
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
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
  {
    field: "date",
    headerName: "DATE ORDERED",
    flex: 2,
    renderHeader: (params) => (
      <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
        {params.colDef.headerName}
      </Typography>
    ),
  },
];

export const columnsUserManagement = [
  { field: "id", headerName: "Username", flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "contact", headerName: "Contact", flex: 2 },
  { field: "orderCount", headerName: "Order Count", flex: 1 },
  { field: "clv", headerName: "Customer Lifetime Value", flex: 2 },
];
