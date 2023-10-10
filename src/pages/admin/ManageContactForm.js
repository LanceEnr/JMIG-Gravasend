import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
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

import Title from "./components/Title";

const rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    datetime: "2023-10-10T00:00",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur tellus eget eleifend vulputate. Donec sodales mauris sed risus lacinia iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam pellentesque elit nec ante sagittis, non congue nibh tincidunt. Nulla ex magna, vehicula ac condimentum vitae, cursus eu libero. ",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    datetime: "2023-10-11T00:00",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur tellus eget eleifend vulputate. Donec sodales mauris sed risus lacinia iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam pellentesque elit nec ante sagittis, non congue nibh tincidunt. Nulla ex magna, vehicula ac condimentum vitae, cursus eu libero. ",
  },
];

export default function ManageContactForm() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClickOpen = (rowData) => {
    setMessage(rowData.message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 }, // Add this line
    { field: "datetime", headerName: "Date and Time", flex: 1 },
    {
      field: "message",
      headerName: "Message",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleClickOpen(params.row)}>
          <Visibility />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
      <Box style={{ width: "100%" }}>
        <Title>Contact Form Submissions</Title>
        <DataGrid
          rows={rows}
          columns={columns}
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
  );
}
