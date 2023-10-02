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
    driver: "John Doe",
    datetime: new Date(),
    status: "Upcoming",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur tellus eget eleifend vulputate. Donec sodales mauris sed risus lacinia iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam pellentesque elit nec ante sagittis, non congue nibh tincidunt. Nulla ex magna, vehicula ac condimentum vitae, cursus eu libero. ",
    approval: "Approved",
  },
  {
    id: 2,
    driver: "Jane Smith",
    datetime: new Date(),
    status: "Upcoming",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur tellus eget eleifend vulputate. Donec sodales mauris sed risus lacinia iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam pellentesque elit nec ante sagittis, non congue nibh tincidunt. Nulla ex magna, vehicula ac condimentum vitae, cursus eu libero. ",
    approval: "Pending",
  },
  // Add more data as needed
];
export default function ManageAppointments() {
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
    { field: "driver", headerName: "Name", flex: 1 },
    { field: "datetime", headerName: "Date and Time", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
    {
      field: "approval",
      headerName: "Approval",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <React.Fragment>
          <GridActionsCellItem
            icon={<CheckCircleIcon />}
            label="Approve"
            sx={{
              color: "primary.main",
            }}
          />
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            color="inherit"
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
      <Box style={{ width: "100%" }}>
        <Title>Manage Appointments</Title>
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
