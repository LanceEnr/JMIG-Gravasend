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

export default function FullFeaturedCrudGrid(props) {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [actionId, setActionId] = React.useState("");
  const [plateNo, setplateNo] = React.useState("");
  const [inspectionType, setinspectionType] = React.useState("");
  const [nextInspectionDate, setnextInspectionDate] = React.useState("");
  const [verdict, setverdict] = React.useState("");

  const [isEditing, setIsEditing] = React.useState(false);

  const [rows, setRows] = React.useState(props.rows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  const handleDialogClose = () => {
    setOpen(false);
    console.log("closed");
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
    handleDialogClose();

    setIsEditing(false);
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/generateMaintenanceId"
      );
      if (response.data.id) {
        const newRow = {
          id: response.data.id,
        };

        setRows((prevRows) => [...prevRows, newRow]);
        setActionId(response.data.id);
      }
    } catch (error) {
      console.error("Failed to generate an ID", error);
      toast.error("Failed to generate an ID");
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick =
    (id, plateNo, inspectionType, nextInspectionDate, verdict) => () => {
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
      setplateNo(plateNo);
      setinspectionType(inspectionType);
      setnextInspectionDate(nextInspectionDate);
      setverdict(verdict);
      setOpen(true);
    };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveConfirmed = async (e) => {
    e.preventDefault();
    if (
      !actionId ||
      !plateNo ||
      !inspectionType ||
      !nextInspectionDate ||
      !verdict
    ) {
      toast.error("Please fill in all required fields");

      setRowModesModel({
        ...rowModesModel,
        [actionId]: { mode: GridRowModes.View },
      });
      setOpen(false);
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [actionId]: { mode: GridRowModes.View },
    });

    try {
      const response = await axios.post("http://localhost:3001/addInspection", {
        actionId: actionId,
        plateNo: plateNo,
        inspectionType: inspectionType,
        nextInspectionDate: nextInspectionDate,
        verdict: verdict,
      });

      console.log("Inspection Schedule added successfully", response.data);
      toast.success(response.data.message);

      setRowModesModel({
        ...rowModesModel,
        [actionId]: { mode: GridRowModes.View },
      });

      setOpen(false);
    } catch (error) {
      console.error("Inspection add failed", error);
      setOpen(false);
      toast.error("Inspection name already exists!");
    }
  };

  const deleteRecord = async (id) => {
    try {
      const _inspectionId = parseInt(id, 10);
      const response = await axios.post(
        "http://localhost:3001/deleteInspection",
        { _inspectionId }
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
      const { id, plateNo, inspectionType, nextInspectionDate, verdict } =
        params.row;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(
              id,
              plateNo,
              inspectionType,
              nextInspectionDate,
              verdict
            )}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
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
          onClick={handleEditClick(
            id,
            plateNo,
            inspectionType,
            nextInspectionDate,
            verdict
          )}
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
        density="compact"
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