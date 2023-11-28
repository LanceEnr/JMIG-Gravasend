import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Typography from "../../components/common/Typography";

import Title from "./components/Title";
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

export default function ManageContactForm() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [rows, setRows] = useState([]);

  const handleClickOpen = (rowData) => {
    if (rowData) {
      console.log("message " + rowData);
      setMessage(rowData);
      setOpen(true);
    } else {
      setMessage("null");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Fetch data from the API using Axios
    axios
      .get("http://localhost:3001/get-inquiry")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);
  const getRowId = (row) => row._inquiryID;
  const columns = [
    { field: "_inquiryID", headerName: "ID", flex: 1 },
    { field: "_name", headerName: "Name", flex: 2 },
    { field: "_email", headerName: "Email", flex: 2 },
    { field: "_date", headerName: "Date and Time", flex: 2 },
    {
      field: "_message",
      headerName: "Message",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleClickOpen(params.row._message)}
        >
          <Visibility />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ my: 14, mx: 12 }}>
      <Typography
        variant="h3"
        marked="left"
        style={{ fontWeight: "bold", fontSize: "30px" }}
        gutterBottom
      >
        Contact Form Submissions
      </Typography>
      <Paper sx={{ mt: 3, p: 2, display: "flex", flexDirection: "column" }}>
        <Box style={{ width: "100%" }}>
          <StripedDataGrid
            sx={{
              border: 1,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                fontWeight: "bold",
              },
            }}
            checkboxSelection
            rows={rows}
            columns={columns}
            pageSize={5}
            disableColumnFilterslotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
              },
            }}
            disableColumnSelector
            density="comfortable"
            getRowId={getRowId}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                printOptions: { disableToolbarButton: true },
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
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>User Message</DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Box>
  );
}
