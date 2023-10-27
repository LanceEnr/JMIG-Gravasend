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
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
export default function ContactContent() {
  const [formData, setFormData] = useState({});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valueData = {
      _address: formData._address,
      _contactNo: formData._contactNo,
      _email: formData._email,
      _fb: formData._fb,
      _messenger: formData._messenger,
    };

    try {
      const response = await axios.put(
        "http://localhost:3001/update-contact",
        valueData
      );
      toast.success("Contact edited successfully!");
      console.log("Contact submitted:", response.data);
    } catch (error) {
      toast.error("Error submitting values");
      console.error("Error submitting values:", error);
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
                  <Typography>Business Contact Information</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="_address"
                    label="Address 1"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._address}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="_address"
                    label="Address 2"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._address}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="contact-no"
                    name="_contactNo"
                    label="Contact No."
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._contact}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="_email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._email}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Footer Social Links</Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="facebook-link"
                    name="_fb"
                    label="Facebook Link"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._fb}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="messenger-link"
                    name="_messenger"
                    label="Messenger Link"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData._messenger}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapsUgcIcon />
                        </InputAdornment>
                      ),
                    }}
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
