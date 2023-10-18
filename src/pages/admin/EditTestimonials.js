import React from "react";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";

import Title from "./components/Title";

export default function EditTestimonials() {
  const [value, setValue] = React.useState(5);

  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography>Card 1</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography component="legend" color="text.secondary">
                  Rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Professional Title"
                  name="professionalTitle"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="testimonial"
                  label="Testimonial"
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography>Card 2</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend" color="text.secondary">
                  Rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Professional Title"
                  name="professionalTitle"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="testimonial"
                  label="Testimonial"
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography>Card 3</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend" color="text.secondary">
                  Rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Professional Title"
                  name="professionalTitle"
                  type="name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="testimonial"
                  label="Testimonial"
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
