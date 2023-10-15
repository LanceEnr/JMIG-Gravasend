import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Paper,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Title from "./Title";

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
  const [randomString, setRandomString] = useState(getRandomString(6));

  const handleGenerate = () => {
    setRandomString(getRandomString(6));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(randomString);
  };

  return (
    <Paper sx={{ my: 2, p: 2, display: "flex", flexDirection: "column" }}>
      <Title>Generate Access Code</Title>
      <TextField
        label="Access Code"
        variant="outlined"
        value={randomString}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopy}>
                <FileCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        sx={{ mt: 2 }}
      >
        Generate
      </Button>
    </Paper>
  );
}
