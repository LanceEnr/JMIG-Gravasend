import React, { useState } from "react";
import Typography from "../../../components/common/Typography";
import Chip from "@mui/material/Chip";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { rowsManageOrders } from "../helpers/data";
import { Link } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

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
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#EAECEA",
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function NewManageOrders() {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const columnsManageOrders = [
    {
      field: "id",
      headerName: "ORDER NO.",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "customerName",
      headerName: "CUSTOMER NAME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "product",
      headerName: "PRODUCT NAME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "price",
      headerName: "PRICE",
      flex: 1,
      valueFormatter: (params) => `₱${params.value.toLocaleString()}`,
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
      field: "total",
      headerName: "TOTAL",
      flex: 1,
      valueGetter: (params) => {
        const price = params.row.price;
        const quantity = params.row.quantity;
        return price * quantity;
      },
      valueFormatter: (params) => `₱${params.value.toLocaleString()}`,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "orderDet",
      headerName: "ORDER DETAILS",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "lastUpdated",
      headerName: "LAST UPDATED",
      type: "datetime",
      flex: 1,
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
      renderCell: (params) => {
        if (params.value === "Available for Pick-up (Pandi)") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "success.dark",
                  }}
                >
                  Available for Pick-up (Pandi)
                </Typography>
              }
              sx={{ bgcolor: "#8dd290" }}
              size="small"
            />
          );
        } else if (params.value === "Available for Pick-up (Mindanao Ave.)") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "success.dark",
                  }}
                >
                  Available for Pick-up (Mindanao Ave.)
                </Typography>
              }
              sx={{ bgcolor: "#8dd290" }}
              size="small"
            />
          );
        } else if (params.value === "Arrived (Pandi)") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "info.dark",
                  }}
                >
                  Arrived (Pandi)
                </Typography>
              }
              sx={{ bgcolor: "#90caf9" }}
              size="small"
            />
          );
        } else if (params.value === "Arrived (Mindanao Ave.)") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "info.dark",
                  }}
                >
                  Arrived (Mindanao Ave.)
                </Typography>
              }
              sx={{ bgcolor: "#90caf9" }}
              size="small"
            />
          );
        } else if (params.value === "Fetch from Quarry") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "info.dark",
                  }}
                >
                  Fetch from Quarry
                </Typography>
              }
              sx={{ bgcolor: "#90caf9" }}
              size="small"
            />
          );
        } else if (params.value === "Delayed") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "warning.dark",
                  }}
                >
                  Delayed
                </Typography>
              }
              sx={{ bgcolor: "#ffc890" }}
              size="small"
            />
          );
        } else if (params.value === "Cancelled") {
          return (
            <Chip
              label={
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "error.dark",
                  }}
                >
                  Cancelled
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

    {
      field: "actions",
      headerName: "ACTIONS",
      sortable: false,
      flex: 1.5,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <React.Fragment>
          <Link to="/admineditorder" className="unstyled-link">
            <GridActionsCellItem
              icon={<EditIcon />}
              className="textPrimary"
              color="inherit"
            />
          </Link>

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
    <Box sx={{ my: 14, mx: 12 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography
          variant="h3"
          marked="left"
          style={{ fontWeight: "bold", fontSize: "30px" }}
          gutterBottom
        >
          Orders
        </Typography>
        <Button
          component={Link}
          to={"/adminaddorder"}
          variant="contained"
          sx={{ ml: 1 }}
          startIcon={<AddIcon />}
        >
          Add an Order
        </Button>
      </Box>
      <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
        <StripedDataGrid
          sx={{
            border: 1,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              fontWeight: "bold",
            },
          }}
          rows={rowsManageOrders}
          columns={columnsManageOrders}
          pageSize={5}
          disableColumnFilter
          disableColumnSelector
          density="comfortable"
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
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
            <Button color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
