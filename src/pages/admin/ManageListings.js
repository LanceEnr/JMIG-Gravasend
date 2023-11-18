import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";

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

export default function ManageListings({ onAddClick, onEditClick }) {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowsListing, setRowsListing] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchListingData();
      const transformedData = transformListingData(data);
      setRowsListing(transformedData);
    };

    fetchData();
  }, []);

  const handleClickOpen = (action, row) => {
    setAction(action);
    setOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteRecord = async (id) => {
    try {
      const _listingId = parseInt(id, 10);
      const response = await axios.post(
        "http://localhost:3001/delete-listing",
        { _listingId }
      );

      if (response.status === 200) {
        toast.success("Listing deleted successfully");
      } else if (response.status === 404) {
        toast.error("Record not found");
      } else {
        toast.error("Failed to delete the listing");
      }
    } catch (error) {
      console.error("Error deleting record", error);
      toast.error("An error occurred while deleting the record");
    }
  };

  const handleConfirm = () => {
    if (action === "save") {
      console.log("Save changes");
    } else if (action === "delete") {
      setRowsListing((prevRows) =>
        prevRows.filter((row) => row.id !== selectedRow.id)
      );
      deleteRecord(selectedRow.id);
    }

    handleClose();
  };

  const columnsListing = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "published",
      headerName: "Published",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.published}
          onClick={() => handleClickOpen("save", params.row)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <React.Fragment>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => onEditClick(params.row)}
          />

          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={() => handleClickOpen("delete", params.row)}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <Paper sx={{ m: 2, p: 2, display: "flex", flexDirection: "column" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Title>Manage Listings</Title>

        <Button variant="contained" sx={{ ml: 1 }} onClick={onAddClick}>
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
