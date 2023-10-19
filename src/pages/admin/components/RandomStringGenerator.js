import React, { useState, useEffect } from "react";
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

export default function RandomStringGenerator() {
  const navigate = useNavigate();
  const [randomString, setRandomString] = useState(getRandomString(6));
  const [rows, setRows] = useState([]);
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

  useEffect(() => {
    // Fetch data from your database and update the rows state
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/accessCodes");
        const rowsWithIds = response.data.map((row) => ({
          ...row,
          id: row._codeID,
        }));
        setRows(rowsWithIds);
      } catch (error) {
        console.error("Error fetching access codes", error);
      }
    };

    fetchData();
  }, []);

  const handleGenerate = () => {
    setRandomString(getRandomString(6));
  };

  const handleCopyAccessCode = (accessCode) => {
    // Copy the access code to the clipboard
    navigator.clipboard.writeText(accessCode);
    toast.success("Access code copied to clipboard");
  };

  const handleDeleteRow = async (adminCode) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/accessCodes/${adminCode}`
      );
      if (response.status === 204) {
        setRows((prevRows) =>
          prevRows.filter((row) => row._adminCode !== adminCode)
        );
        toast.success("Code deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting row", error);
      toast.error("Error deleting code");
    }
  };

  const handleGenerateAndPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/generateCode", {
        accessCode: randomString,
        formattedDate,
      });

      const generatedCode = response.data;
      const newRow = {
        ...generatedCode,
        id: generatedCode._codeID,
      };
      setRows((prevRows) => [...prevRows, newRow]);

      toast.success("Generated code successfully");
      handleGenerate();
    } catch (error) {
      console.error("Generate code failed", error);
      toast.error("Generate code failed");
    }
  };

  const columns = [
    { field: "_codeID", headerName: "ID", flex: 1 },
    { field: "_adminCode", headerName: "Access Code", flex: 1 },
    { field: "_isRedeem", headerName: "Redemption Status", flex: 1 },
    { field: "_dateTime", headerName: "Date and Time Generated", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <React.Fragment>
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label="Copy"
            sx={{
              color: "primary.main",
            }}
            onClick={() => handleCopyAccessCode(params.row._adminCode)}
          />
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Remove"
            className="textPrimary"
            color="inherit"
            onClick={() => handleDeleteRow(params.row._adminCode)}
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
