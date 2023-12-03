import React, { useState, useEffect } from "react";
import Typography from "../../components/common/Typography";
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
//import { rowsDriverManagement } from "./helpers/data";
import { Link, useNavigate } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import AssessmentIcon from "@mui/icons-material/Assessment";

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
import FleetInformation from "./FleetInformation";
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
const transformDriverData = (data) => {
  const transformedData = [];
  console.log(data);
  if (data) {
    for (const uid in data) {
      if (data.hasOwnProperty(uid)) {
        const userData = data[uid];

        const mappedData = {
          id: uid,
          contact: userData.contact,
          date: userData.date,
          driverName: userData.driverName,
          email: userData.email,
          licenseNo: userData.licenseNo,
          plateNo: userData.plateNo,
          status: userData.status,
          profilePicture: userData.ProfileImageURL,
        };

        transformedData.push(mappedData);
      }
    }
  }

  return transformedData;
};

const fetchDriverInformation = async () => {
  try {
    const response = await axios.get("http://localhost:3001/fetch-driver");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
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

export default function NewDriverManagement() {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [id, setId] = useState(null);
  const [rowsDriverManagement, setrowsDriverManagement] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = (action, row) => {
    setAction(action);
    setOpen(true);
    setSelectedRow(row);
    setId(row.id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDriverInformation();
        const transformedData = transformDriverData(data);
        setrowsDriverManagement(transformedData);
      } catch (error) {
        console.error("Error fetching and transforming data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDialogConfirm = () => {
    deleteRecord();
    setOpen(false);
  };

  const deleteRecord = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/deleteDriverRecord",
        { _driverID: id }
      );

      if (response.status === 200) {
        toast.success("Driver deleted successfully");
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

  const columnsDriverManagement = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "profilePicture",
      headerName: "PICTURE",
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <img
          src={
            isValidUrl(params.row.profilePicture)
              ? params.row.profilePicture
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={"Picture"}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "driverName",
      headerName: "NAME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "contact",
      headerName: "CONTACT",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "HIRE DATE",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "licenseNo",
      headerName: "LICENSE NO.",
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      flex: 2,
    },

    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => {
        return params.value === "assigned" ? (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "success.dark",
                }}
              >
                Assigned
              </Typography>
            }
            sx={{ bgcolor: "#8dd290" }}
            size="small"
          />
        ) : (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "info.dark",
                }}
              >
                Unassigned
              </Typography>
            }
            sx={{ bgcolor: "#90caf9" }}
            size="small"
          />
        );
      },
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "performance",
      headerName: "PERFORMANCE",
      flex: 1.5,
      renderCell: (params) => {
        return params.value === "excellent" ? (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "success.dark",
                }}
              >
                Satisfactory
              </Typography>
            }
            sx={{ bgcolor: "#8dd290" }}
            size="small"
          />
        ) : (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "error.dark",
                }}
              >
                Unsatisfactory
              </Typography>
            }
            sx={{ bgcolor: "#f5c9c9" }}
            size="small"
          />
        );
      },
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      sortable: false,
      flex: 1,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
      renderCell: (params) => (
        <React.Fragment>
          <Link
            to={`/admineditdriver?id=${params.row.id}`}
            className="unstyled-link"
          >
            <GridActionsCellItem
              icon={<EditIcon />}
              className="textPrimary"
              color="info"
            />
          </Link>

          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="error"
            onClick={() => handleClickOpen("delete", params.row)}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <Box sx={{ my: 14 }}>
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
          Driver Management
        </Typography>
        <Box display="flex">
          <Button
            variant="contained"
            sx={{ ml: 1 }}
            color="secondary"
            startIcon={<AssessmentIcon />}
            component={Link}
            to={"/admindriversreport"}
          >
            Generate Report
          </Button>
          <Button
            component={Link}
            to={"/adminadddriver"}
            variant="contained"
            sx={{ ml: 1 }}
            startIcon={<AddIcon />}
          >
            Add a Driver
          </Button>
        </Box>
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
          rows={rowsDriverManagement}
          columns={columnsDriverManagement}
          pageSize={5}
          disableColumnFilter
          checkboxSelection
          disableColumnSelector
          density="comfortable"
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
            <Button color="primary" onClick={handleDialogConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
