import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Badge, IconButton, Avatar } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import axios from "axios";
import { toast } from "react-toastify";

import Title from "./Title";
import {
  GridRowModes,
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={props.handleClick}
        >
          Add record
        </Button>
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

export default function DataGridDriverManagement(props) {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [actionId, setActionId] = React.useState(null);

  const [driverName, setdriverName] = React.useState("");
  const [contact, setcontact] = React.useState("");
  const [date, setdate] = React.useState("");
  const [status, setStatus] = React.useState("unassigned");
  const [plateNo, setPlateNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [licenseNo, setLicenseNo] = React.useState("");

  const [isEditing, setIsEditing] = React.useState(false);

  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleDialogConfirm = () => {
    if (action === "save") {
      setRowModesModel({
        ...rowModesModel,
        [actionId]: { mode: GridRowModes.View },
      });
    } else if (action === "delete") {
      deleteRecord(actionId);
      setRows(rows.filter((row) => row.id !== actionId));
    }
    setOpen(false);
  };

  const generateRandomId = () => {
    // Generate a random 6-digit number
    const randomId = Math.floor(Math.random() * 1000000);
    return randomId.toString().padStart(6, "0");
  };

  const handleClick = async () => {
    const id2 = generateRandomId();
    const newRow = {
      id: id2,
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setActionId(id2);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  //FIX THIS
  const handleSaveClick =
    (id, driverName, contact, date, status, plateNo, email, licenseNo) =>
    () => {
      const existingRow = rows.find((row) => row.id === id);

      if (!existingRow) {
        toast.error("No row with the specified ID found");
        return;
      }

      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.Edit },
      });
      setAction("save");
      setActionId(id);
      setdriverName(driverName);
      setcontact(contact);
      setdate(date);
      setStatus(status);
      setPlateNo(plateNo);
      setEmail(email);
      setLicenseNo(licenseNo);
      setOpen(true);
    };

  //FIX

  const handleSaveConfirmed = async (e) => {
    e.preventDefault();
    if (
      !actionId ||
      !driverName ||
      !contact ||
      !date ||
      !status ||
      !plateNo ||
      !email ||
      !licenseNo
    ) {
      toast.error("Please fill in all required fields");
      setOpen(false);
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [actionId]: { mode: GridRowModes.View },
    });

    try {
      const response = await axios.post("http://localhost:3001/addDriver", {
        driverName: driverName,
        contact: contact,
        date: date,
        status: status,
        email: email,
        licenseNo,
      });

      console.log("Driver added successfully", response.data);
      toast.success("Driver added successfully");

      setRowModesModel({
        ...rowModesModel,
        [actionId]: { mode: GridRowModes.View },
      });

      const updatedRows = rows.map((row) =>
        row.id === actionId
          ? {
              ...row,
              driverName,
              contact,
              date,
              status,
              plateNo,
              email,
              licenseNo,
            }
          : row
      );
      setRows(updatedRows);
      setOpen(false);
    } catch (error) {
      console.error("Driver add failed", error);
      setOpen(false);
      toast.error("Driver not yet registered!");
    }
  };

  const deleteRecord = async (id) => {
    try {
      const _driverID = id;
      const response = await axios.post(
        "http://localhost:3001/deleteDriverRecord/",
        {
          _driverID: _driverID,
        }
      );

      if (response.status === 200) {
        setRows(rows.filter((row) => row.id !== id));
        setOpen(false);
        toast.success("Record deleted successfully");
      } else if (response.status === 404) {
        toast.error("Record not found");
      } else {
        toast.error("Failed to delete the record");
      }
    } catch (error) {
      console.error("Error deleting record", error);
      toast.error("An error occurred while deleting the record");
    }
  };

  //END

  const handleDeleteClick = (id) => () => {
    setAction("delete");
    setActionId(id);
    setOpen(true);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  let columns = [...props.columns];

  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: props.actionWidth || 100,
    cellClassName: "actions",
    getActions: (params) => {
      //edit
      const {
        id,
        driverName,
        contact,
        date,
        status,
        plateNo,
        email,
        licenseNo,
      } = params.row;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            //fix
            onClick={handleSaveClick(
              id,
              driverName,
              contact,
              date,
              status,
              plateNo,
              email,
              licenseNo
            )}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            //fix
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  });

  return (
    <Box
      sx={{
        minHeight: props.height || "500",
        width: props.width || "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Title>{props.title}</Title>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        checkboxSelection
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        density="comfortable"
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, handleClick },
        }}
      />
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {action === "save"
              ? "Do you want to save changes?"
              : "Do you want to delete this row?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={
              action === "save" ? handleSaveConfirmed : handleDialogConfirm
            }
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
