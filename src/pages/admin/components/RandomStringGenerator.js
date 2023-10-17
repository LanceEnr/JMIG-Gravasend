import React, { useState } from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import Title from "./Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const rows = [
  {
    id: 1,
    accessCode: "F2pmpD",
    datetime: "2023-09-30 19:59",
  },
  // Add more rows as needed
];

export default function RandomStringGenerator() {
  const navigate = useNavigate();
  const [randomString, setRandomString] = useState(getRandomString(6));

  const handleGenerate = () => {
    setRandomString(getRandomString(6));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(randomString);
  };

  const handleGenerateAndPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/generateCode", {
        accessCode: randomString,
      });
      console.log("Generated code successfully", response.data);
      toast.success("Generated code successfully");
      handleGenerate();
    } catch (error) {
      console.error("Generate code failed", error);
      toast.error("Generate code failed");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "accessCode", headerName: "Access Code", flex: 1 },
    { field: "datetime", headerName: "Date and Time Generated", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <React.Fragment>
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label="Copy"
            sx={{
              color: "primary.main",
            }}
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Remove"
            className="textPrimary"
            color="inherit"
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <div>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Generate Admin Access Code</Title>
        <TextField
          label="Access Code"
          variant="outlined"
          value={randomString}
          sx={{ mt: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleGenerate}>
                  <RefreshIcon />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateAndPost} // Handle POST request
                >
                  Generate Code
                </Button>
              </InputAdornment>
            ),
          }}
          readOnly
        />
      </Paper>
      <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Generated Access Codes</Title>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableColumnFilter
          disableColumnSelector
          density="compact"
        />
      </Paper>
    </div>
  );
}
