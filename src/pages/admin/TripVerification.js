import React, { useState, useEffect, useRef } from "react";
import {
  DataGrid,
  gridClasses,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import { Typography, Chip, Divider, Modal } from "@mui/material";
import { green, red } from "@mui/material/colors";
import Signature from "../../assets/white.jpg";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

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

const transformTripOngoing = (data, data2, data3, data4) => {
  const transformedData = [];

  if (data && data2 && data3 && data4) {
    for (const uid in data) {
      const userData = data[uid];
      const userData2 = data2[uid];
      const userData3 = data3[uid];
      const userData4 = data4[uid];
      const mappedData = {
        id: uid,
        driver: userData.driverName,
        datetime: userData.dateTime,
      };

      if (userData2) {
        mappedData.cargoType = userData2.cargoType;
        mappedData.cargoWeight = userData2.cargoWeight;
      } else {
        mappedData.cargoType = "No Cargo Type";
        mappedData.cargoWeight = "No Cargo Weight";
      }

      if (
        userData2 &&
        userData2.cargoType &&
        userData2.cargoWeight &&
        userData3.driversLicenseChecked &&
        userData3.localTransportPermitChecked &&
        userData3.orcrChecked &&
        userData4.brake &&
        userData4.lights &&
        userData4.safetyequipment &&
        userData4.steering &&
        userData4.suspension &&
        userData4.tireswheels
      ) {
        mappedData.status = "complete";
      } else {
        mappedData.status = "incomplete";
      }

      transformedData.push(mappedData);
    }
  }

  return transformedData;
};

export default function TripVerification() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [documentChecklist, setDocumentChecklist] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [id, setId] = useState(null);
  const [sign, setSignature] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [documentChecklistData, setDocumentChecklistData] = useState({
    driversLicenseChecked: false,
    localTransportPermitChecked: false,
    orcrChecked: false,
  });
  const [SafetyChecklistData, setSafetyChecklistData] = useState({
    suspension: false,
    brake: false,
    steering: false,
    tireswheels: false,
    safetyequipment: false,
    lights: false,
  });

  const fetchTripOngoing = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-tripDash");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchCargo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetch-cargo");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/fetch-documentCheck"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchSafetyCheck = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/fetch-schecklist"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchDocumentChecklist = async (id) => {
    try {
      setDocumentChecklistData({
        driversLicenseChecked: false,
        localTransportPermitChecked: false,
        orcrChecked: false,
      });

      const response = await axios.get(
        `http://localhost:3001/fetch-documentCheck/${id}`
      );
      const checklistData = response.data;

      setDocumentChecklistData((prevState) => ({
        ...prevState,
        driversLicenseChecked: checklistData.driversLicenseChecked,
        localTransportPermitChecked: checklistData.localTransportPermitChecked,
        orcrChecked: checklistData.orcrChecked,
      }));

      return checklistData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchsetSafetyChecklistData = async (id) => {
    try {
      setSafetyChecklistData({
        suspension: false,
        brake: false,
        steering: false,
        tireswheels: false,
        safetyequipment: false,
        lights: false,
      });

      const response = await axios.get(
        `http://localhost:3001/fetch-safetychecklist/${id}`
      );
      const checklistData = response.data;
      setSafetyChecklistData((prevState) => ({
        ...prevState,
        suspension: checklistData.suspension,
        brake: checklistData.brake,
        steering: checklistData.steering,
        tireswheels: checklistData.tireswheels,
        safetyequipment: checklistData.safetyequipment,
        lights: checklistData.lights,
      }));
      console.log(SafetyChecklistData);
      return checklistData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchSignatureImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/fetch-signature/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching signature image:", error);
      return Signature;
    }
  };
  useEffect(() => {
    fetchSignatureImage(selectedID)
      .then((imageLocation) => {
        if (imageLocation) {
          setSignature(imageLocation);
        }
        setIsLoadingImage(false);
      })
      .catch((error) => {
        console.error("Error fetching signature image:", error);
        setIsLoadingImage(false);
      });
  }, [selectedID]);

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripOngoing();
      const cargoData = await fetchCargo();
      const documentData = await fetchDocuments();
      const safetyData = await fetchSafetyCheck();

      const updatedData = transformTripOngoing(
        tripData,
        cargoData,
        documentData,
        safetyData
      );

      setRows(updatedData);
    };

    fetchData();
  }, []);

  const handleClickOpen = (id) => {
    setSelectedID(id);
    setId(id);
    fetchDocumentChecklist(id)
      .then((data) => {
        setDocumentChecklist(data);
      })
      .catch((error) => {
        console.error("Error fetching document checklist:", error);
        setDocumentChecklist([]);
      });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleDialogOpen = (id) => {
    setSelectedID(id);
    setId(id);
    fetchsetSafetyChecklistData(id)
      .then((data) => {
        setSafetyChecklistData(data);
      })
      .catch((error) => {
        console.error("Error fetching document checklist:", error);
        setSafetyChecklistData([]);
      });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const columns = [
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
      field: "driver",
      headerName: "DRIVER NAME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "datetime",
      headerName: "DATE AND TIME",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "cargoType",
      headerName: "CARGO TYPE",
      flex: 2,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "cargoWeight",
      headerName: "CARGO WEIGHT",
      flex: 2,
      valueFormatter: (params) => `${params.value.toLocaleString()} cu. mt.`,
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "documents",
      headerName: "DOCUMENTS",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleClickOpen(params.row.id)}
        >
          <Visibility />
        </IconButton>
      ),
      renderHeader: (params) => (
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "12px" }}>
          {params.colDef.headerName}
        </Typography>
      ),
    },
    {
      field: "safetyChecks",
      headerName: "SAFETY CHECKS",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleDialogOpen(params.row.id)}
        >
          <Visibility />
        </IconButton>
      ),
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
      renderCell: (params) => {
        return params.value === "complete" ? (
          <Chip
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "success.dark",
                }}
              >
                Complete
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
                Incomplete
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
  ];

  return (
    <Box style={{ width: "100%" }}>
      <StripedDataGrid
        sx={{
          border: 1,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            fontWeight: "bold",
          },
        }}
        rows={rows}
        columns={columns}
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
      <Modal onClose={handleClose} open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",

            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Document Check
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider style={{ borderStyle: "dashed", borderColor: "#bd8512" }} />

          <List>
            {[
              {
                documentName: "Driver's License",
                approved: documentChecklistData.driversLicenseChecked,
              },
              {
                documentName: "OR/CR",
                approved: documentChecklistData.orcrChecked,
              },
              {
                documentName: "Local Transport Permit",
                approved: documentChecklistData.localTransportPermitChecked,
              },
            ].map(({ documentName, approved }, index) => (
              <ListItem key={index}>
                <ListItemIcon style={{ pointerEvents: "none" }}>
                  {approved ? (
                    <CheckCircleIcon
                      style={{ color: green[500], fontSize: "30px" }}
                    />
                  ) : (
                    <CancelIcon style={{ color: red[500], fontSize: "30px" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={documentName} />
              </ListItem>
            ))}
            {isLoadingImage ? (
              <div>Loading...</div>
            ) : sign ? (
              <Box
                component="img"
                sx={{
                  mt: 2,
                  height: "150px", // Adjust as needed
                  width: "450px", // Adjust as needed
                  border: "1px solid black",
                  maxWidth: "100%",
                  borderRadius: 2,
                }}
                alt="E-Signature"
                src={sign}
              />
            ) : (
              <Typography variant="caption" color="textSecondary">
                No image available
              </Typography>
            )}
          </List>
        </Box>
      </Modal>

      <Modal onClose={handleDialogClose} open={isDialogOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "8px",

            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Safety Checklist
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider style={{ borderStyle: "dashed", borderColor: "#bd8512" }} />

          <List>
            {[
              {
                documentName: "Suspension System",
                approved: SafetyChecklistData.suspension,
                image: SafetyChecklistData.suspensionPic,
              },
              {
                documentName: "Brake System",
                approved: SafetyChecklistData.brake,
                image: SafetyChecklistData.brakePic,
              },
              {
                documentName: "Steering System",
                approved: SafetyChecklistData.steering,
                image: SafetyChecklistData.steeringPic,
              },
              ,
              {
                documentName: "Tires and Wheels",
                approved: SafetyChecklistData.tireswheels,
                image: SafetyChecklistData.tirewheelsPic,
              },
              ,
              {
                documentName: "Safety Equipments",
                approved: SafetyChecklistData.safetyequipment,
                image: SafetyChecklistData.safetyequipmentPic,
              },
              ,
              {
                documentName: "Lights and Reflectors",
                approved: SafetyChecklistData.lights,
                image: SafetyChecklistData.lightsPic,
              },
            ].map(({ documentName, approved, image }, index) => (
              <ListItem key={index}>
                <ListItemIcon style={{ pointerEvents: "none" }}>
                  {approved ? (
                    <CheckCircleIcon
                      style={{ color: green[500], fontSize: "30px" }}
                    />
                  ) : (
                    <CancelIcon style={{ color: red[500], fontSize: "30px" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={documentName} />
                <div
                  style={{
                    width: "160px",
                    height: "70px",
                    border: "1px solid black",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Rectangle Picture"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      No image available
                    </Typography>
                  )}
                </div>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </Box>
  );
}
