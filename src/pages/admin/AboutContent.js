import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

export default function AboutContent() {
  const [formData, setFormData] = useState({});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valueData = {
      _vision: formData._vision,
      _mission: formData._mission,
    };

    // Send data to the server using Axios (update the URL)
    try {
      const response = await axios.put(
        "http://localhost:3001/update-about",
        valueData
      );
      toast.success("About edited successfully!");
      console.log("About submitted:", response.data);
    } catch (error) {
      toast.error("Error submitting about");
      console.error("Error submitting about:", error);
    }
  };

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12}>
                  <Typography>Vision</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="_vision"
                    name="_vision"
                    label="Vision"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    value={formData._vision}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Mission</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="_mission"
                    label="Mission"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    value={formData._mission}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
