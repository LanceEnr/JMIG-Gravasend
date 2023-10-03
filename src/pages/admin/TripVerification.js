import React, { useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { green, red } from "@mui/material/colors";
import Signature from "../../assets/e-signature.webp";
import DriveEtaIcon from "@mui/icons-material/DriveEta"; // Icon for Driver's License
import DescriptionIcon from "@mui/icons-material/Description"; // Icon for OR/CR
import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // Icon for Local Transport Permit
import EditIcon from "@mui/icons-material/Edit"; // Icon for Driver E-Signature
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"; // Icon for Oil Levels
import OpacityIcon from "@mui/icons-material/Opacity"; // Icon for Coolant Levels
import AirIcon from "@mui/icons-material/Air"; // Icon for Air Pressure
import LinkIcon from "@mui/icons-material/Link"; // Icon for Steering Linkage and Suspension
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"; // Icon for Brakes
import ConstructionIcon from "@mui/icons-material/Construction"; // Icon for Dumpbed Operation
import Title from "./components/Title";

const rows = [
  {
    id: 1,
    driver: "John Doe",
    datetime: "2023-09-30 19:59",
    cargoType: "Type1",
    cargoWeight: "1000kg",
  },
  // Add more rows as needed
];

export default function TripVerification() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "driver", headerName: "Driver name", flex: 1 },
    { field: "datetime", headerName: "Date and Time", flex: 1 },
    { field: "cargoType", headerName: "Cargo Type", flex: 1 },
    { field: "cargoWeight", headerName: "Cargo Weight", flex: 1 },
    {
      field: "documents",
      headerName: "Documents",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <IconButton color="primary" onClick={handleClickOpen}>
          <Visibility />
        </IconButton>
      ),
    },
    {
      field: "safetyChecks",
      headerName: "Safety Checks",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <IconButton color="primary" onClick={handleDialogOpen}>
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
    <Box style={{ width: "100%" }}>
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
        <DialogTitle>Document Check</DialogTitle>
        <List>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <DriveEtaIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Driver's License" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="OR/CR" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <LocalShippingIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Local Transport Permit" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CancelIcon style={{ color: red[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Driver E-Signature" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              {/* Replace with CheckCircleIcon or CancelIcon as needed */}
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>

          {/* Image Box for E-Signature */}
          <Box
            component="img"
            sx={{
              m: 2,
              height: 233,
              width: 350,
              maxWidth: "100%",
              borderRadius: 1,
            }}
            alt="The alt text for your image"
            src={Signature}
          />
        </List>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>Safety Checks</DialogTitle>
        <List>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <LocalGasStationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Oil Levels" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <OpacityIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Coolant Levels" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <AirIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Air Pressure" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <LinkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Steering Linkage and Suspension" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <AutoFixHighIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Brakes" />
            <ListItemSecondaryAction style={{ pointerEvents: "none" }}>
              <CheckCircleIcon style={{ color: green[500] }} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemAvatar style={{ pointerEvents: "none" }}>
              <Avatar>
                <ConstructionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Dumpbed Operation" />
            <CancelIcon style={{ color: red[500] }} />
          </ListItem>
        </List>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
