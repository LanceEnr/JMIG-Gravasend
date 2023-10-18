import React from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import Title from "./components/Title";

export default function CompanyValues() {
  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography>Values 1</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Heading"
                  name="heading"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="subheading"
                  label="Subheading"
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>Values 2</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Heading"
                  name="heading"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="subheading"
                  label="Subheading"
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>Values 3</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Heading"
                  name="heading"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="subheading"
                  label="Subheading"
                  multiline
                  rows={2}
                  variant="outlined"
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
      </Box>
    </div>
  );
}
