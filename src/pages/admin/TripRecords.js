import React, { useState, useEffect, useRef } from "react";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
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
import { Divider, Modal, ListItemIcon } from "@mui/material";

import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import { green, red } from "@mui/material/colors";
import Signature from "../../assets/white.jpg";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

import { alpha, styled } from "@mui/material/styles";

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

const transformTripOngoing = (data, data2, data3) => {
  const transformedData = [];

  if (data && data2 && data3) {
    for (const uid in data) {
      const userData = data[uid];
      const userData2 = data2[uid];
      const userData3 = data3[uid];

      for (const id in userData) {
        if (userData.hasOwnProperty(id)) {
          const mappedData = {
            uid: uid,
            id: id,
            driver: userData[id].driverName,
            datetime: userData[id].dateTime,
            cargoType: userData[id].cargo,
            cargoWeight: userData[id].weight,
          };

          transformedData.push(mappedData);
        }
      }
    }
  }

  return transformedData;
};

export default function TripVerification() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [documentChecklist, setDocumentChecklist] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [driver, setDriver] = useState(null);
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
      const response = await axios.get(
        "http://localhost:3001/fetch-tripHistory"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/fetch-documentCheckRecord"
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
        "http://localhost:3001/fetch-schecklistrecord"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const fetchDocumentChecklist = async (id, driver) => {
    try {
      setDocumentChecklistData({
        driversLicenseChecked: false,
        localTransportPermitChecked: false,
        orcrChecked: false,
      });

      const response = await axios.get(
        `http://localhost:3001/fetch-documentCheckRecord/${id}/${driver}`
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
  const fetchsetSafetyChecklistData = async (id, driver) => {
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
        `http://localhost:3001/fetch-sCheckRecord/${id}/${driver}`
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
  const fetchSignatureImage = async (id, driver) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/fetch-signaturerecord/${id}/${driver}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching signature image:", error);
      return Signature;
    }
  };
  useEffect(() => {
    fetchSignatureImage(selectedID, driver)
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
  }, [selectedID, driver]);

  useEffect(() => {
    const fetchData = async () => {
      const tripData = await fetchTripOngoing();
      const documentData = await fetchDocuments();
      const safetyData = await fetchSafetyCheck();

      const updatedData = transformTripOngoing(
        tripData,
        documentData,
        safetyData
      );

      setRows(updatedData);
    };

    fetchData();
  }, []);

  const handleClickOpen = (id, driver) => {
    setSelectedID(id);
    setDriver(driver);
    setId(id);
    fetchDocumentChecklist(id, driver)
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

  const handleDialogOpen = (id, driver) => {
    setSelectedID(id);
    setId(id);
    fetchsetSafetyChecklistData(id, driver)
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
          onClick={() => handleClickOpen(params.row.id, params.row.driver)}
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
          onClick={() => handleDialogOpen(params.row.id, params.row.driver)}
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
        disableColumnFilter
        disableColumnSelector
        checkboxSelection
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
                    width: "120px",
                    height: "90px", // Adjusted for 4:3 aspect ratio
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
                      style={{
                        width: "100%",
                        height: "100%", // Added to maintain aspect ratio
                        objectFit: "cover", // Added to maintain aspect ratio
                      }}
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
