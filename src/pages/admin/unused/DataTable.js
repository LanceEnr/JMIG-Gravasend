import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import Title from "../components/Title";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const columns = [
  { field: "id", headerName: "ID", width: 90, sortable: true },
  { field: "plateNo", headerName: "Plate No.", flex: 1, sortable: true },
  { field: "chassisNo", headerName: "Chassis No.", flex: 1, sortable: true },
  { field: "engineNo", headerName: "Engine No.", flex: 1, sortable: true },
  { field: "gvwr", headerName: "GVWR", flex: 1, sortable: true },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    flex: 1,
    sortable: true,
  },
  { field: "model", headerName: "Model", flex: 1, sortable: true },
  { field: "mileage", headerName: "Mileage", flex: 1, sortable: true },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => <MoreOptionsMenu row={params.row} />,
    width: 90,
  },
];

const rows = [
  {
    id: "1",
    plateNo: "ABC123",
    chassisNo: "XYZ456",
    engineNo: "DEF789",
    gvwr: "5000kg",
    manufacturer: "Toyota",
    model: "Corolla",
    mileage: "10000km",
  },
  {
    id: "2",
    plateNo: "DEF456",
    chassisNo: "ABC123",
    engineNo: "XYZ789",
    gvwr: "4000kg",
    manufacturer: "Honda",
    model: "Civic",
    mileage: "20000km",
  },
  {
    id: "3",
    plateNo: "GHI789",
    chassisNo: "DEF456",
    engineNo: "ABC123",
    gvwr: "6000kg",
    manufacturer: "Ford",
    model: "Mustang",
    mileage: "30000km",
  },
  {
    id: "4",
    plateNo: "JKL012",
    chassisNo: "GHI789",
    engineNo: "DEF456",
    gvwr: "3500kg",
    manufacturer: "Chevrolet",
    model: "Camaro",
    mileage: "40000km",
  },
  {
    id: "5",
    plateNo: "MNO345",
    chassisNo: "JKL012",
    engineNo: "GHI789",
    gvwr: "5500kg",
    manufacturer: "Dodge",
    model: "Charger",
    mileage: "50000km",
  },
  {
    id: "6",
    plateNo: "PQR678",
    chassisNo: "MNO345",
    engineNo: "JKL012",
    gvwr: "4500kg",
    manufacturer: "Nissan",
    model: "Skyline GTR R34",
    mileage: "60000km",
  },
  {
    id: "7",
    plateNo: "STU901",
    chassisNo: "PQR678",
    engineNo: "MNO345",
    gvwr: "7000kg",
    manufacturer: "Subaru",
    model: "Impreza WRX STI ",
    mileage: "70000km",
  },
  {
    id: "8",
    plateNo: "VWX234",
    chassisNo: "STU901",
    engineNo: "PQR678",
    gvwr: "6500kg",
    manufacturer: "Mitsubishi ",
    model: "Lancer Evolution IX ",
    mileage: "80000km",
  },
  {
    id: "9",
    plateNo: "YZA567",
    chassisNo: "VWX234",
    engineNo: "STU901 ",
    gvwr: "7500kg ",
    manufacturer: "BMW ",
    model: "M3 E46 ",
    mileage: "90000km",
  },
  {
    id: "10 ",
    plateNo: "BCD890 ",
    chassisNo: "YZA567 ",
    engineNo: "VWX234 ",
    gvwr: "8000kg ",
    manufacturer: "Mercedes-Benz ",
    model: "AMG GT R ",
    mileage: "100000km",
  },
];

function MoreOptionsMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { row } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log(`Editing row with ID: ${row.id}`);
    setOpenEditModal(true);
    handleClose();
  };

  const handleRemove = () => {
    console.log(`Removing row with ID: ${row.id}`);
    setOpenRemoveDialog(true);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit Details</MenuItem>
        <MenuItem onClick={handleRemove} sx={{ color: "error.main" }}>
          Remove
        </MenuItem>
      </Menu>

      <Dialog
        open={openRemoveDialog}
        onClose={() => setOpenRemoveDialog(false)}
      >
        <DialogTitle>Remove Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(`Row with ID: ${row.id} removed`);
              setOpenRemoveDialog(false);
            }}
            sx={{ color: "error.main" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {/* Add your form fields here */}
          <TextField
            margin="dense"
            label="Plate No."
            defaultValue={row.plateNo}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Chassis No."
            defaultValue={row.chassisNo}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Engine No.."
            defaultValue={row.engineNo}
            fullWidth
          />
          <TextField
            margin="dense"
            label="GVWR"
            defaultValue={row.gvwr}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Manufacturer"
            defaultValue={row.manufacturer}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Model"
            defaultValue={row.model}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mileage."
            defaultValue={row.mileage}
            fullWidth
          />

          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(`Row with ID: ${row.id} edited`);
              setOpenEditModal(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function DataTable() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const removeSelectedRows = () => {
    setOpenRemoveDialog(true);
  };

  const confirmRemoveRows = () => {
    console.log(`Removing rows with IDs: ${selectionModel}`);
    // Add your logic to remove the selected rows from your data
    setOpenRemoveDialog(false);
  };

  const addNewRow = () => {
    console.log(`Adding new row: ${JSON.stringify(newRow)}`);
    // Add your logic to add the new row to your data
    setOpenAddDialog(false);
  };

  return (
    <Box style={{ minHeight: 400, width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Title>Fleet Information</Title>
        <Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: "error.main",
              color: "error.main",
              "&:hover": {
                borderColor: "error.dark",
                color: "error.dark",
              },
              "&:active": {
                borderColor: "error.light",
                color: "error.light",
              },
            }}
            onClick={removeSelectedRows}
          >
            Remove Selected Rows
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add New Row
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel);
        }}
      />
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Truck</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Plate No."
            onChange={(e) => setNewRow({ ...newRow, plateNo: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Chassis No."
            onChange={(e) =>
              setNewRow({ ...newRow, chassisNo: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Engine No.."
            onChange={(e) => setNewRow({ ...newRow, engineNo: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="GVWR"
            onChange={(e) => setNewRow({ ...newRow, gvwr: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Manufacturer"
            onChange={(e) =>
              setNewRow({ ...newRow, manufacturer: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            label="Model"
            onChange={(e) => setNewRow({ ...newRow, model: e.target.value })}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mileage"
            onChange={(e) => setNewRow({ ...newRow, mileage: e.target.value })}
            fullWidth
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={addNewRow}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRemoveDialog}
        onClose={() => setOpenRemoveDialog(false)}
      >
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove row/s?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveDialog(false)}>Cancel</Button>
          <Button sx={{ color: "error.main" }} onClick={confirmRemoveRows}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
