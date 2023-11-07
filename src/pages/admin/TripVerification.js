import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";

const transformTripOngoing = (data, data2, data3, data4) => {
  const transformedData = [];

  if (data && data2 && data3 && data4) {
    for (const uid in data) {
      const userData = data[uid];
      const userData2 = data2[uid];
      const userData3 = data3[uid];
      const userData4 = data4[uid];
      console.log(userData);
      console.log(userData2);

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
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleClickOpen(params.row.id)}
        >
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
              <ListItemAvatar style={{ pointerEvents: "none" }}>
                <Avatar>
                  {approved ? (
                    <CheckCircleIcon style={{ color: green[500] }} />
                  ) : (
                    <CancelIcon style={{ color: red[500] }} />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={documentName} />
            </ListItem>
          ))}
          {isLoadingImage ? (
            <div>Loading...</div>
          ) : (
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
              src={sign}
            />
          )}
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
