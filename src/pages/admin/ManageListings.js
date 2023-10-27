import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  Switch,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Title from "./components/Title";

const fetchListingData = async () => {
  try {
    const response = await axios.get("http://localhost:3001/get-listing");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformListingData = (data) => {
  return data.map((item) => ({
    id: item._listingID,
    name: item._listingName,
    category: item._listingCategory,
    price: item._listingPrice,
    published: item._isPublished,
  }));
};

const rowsListing = transformListingData(await fetchListingData());

export default function ManageListings() {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const handleClickOpen = (action) => {
    setAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (action === "save") {
      // Handle save changes action here
      console.log("Save changes");
    } else if (action === "delete") {
      // Handle delete row action here
      console.log("Delete row");
    }
    // Close the dialog after handling the action
    handleClose();
  };
  const columnsListing = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "published",
      headerName: "Published",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.published}
          onClick={() => handleClickOpen("save")}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <React.Fragment>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />

          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => handleClickOpen("delete")}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Title>Manage Listings</Title>

        <Button variant="contained" sx={{ ml: 1 }}>
          Add Listing
        </Button>
      </Box>
      <DataGrid
        rows={rowsListing}
        columns={columnsListing}
        pageSize={5}
        disableColumnFilter
        disableColumnSelector
        density="compact"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action === "save"
              ? "Do you want to save changes?"
              : "Do you want to delete this row?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
