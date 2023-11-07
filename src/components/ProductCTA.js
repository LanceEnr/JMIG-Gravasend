import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { TextField, Button, Snackbar } from "@mui/material";
import Typography from "../components/common/Typography";
import ImageDots from "../assets/productCTAImageDots.webp";
import Catalog from "../assets/cta.webp";

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ pt: 10, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "#EBDAB7",
              py: 8,
              px: 3,
              borderRadius: 4, // Adjust the value to control the roundness
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                maxWidth: 400,
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                style={{ fontWeight: "bold" }}
                gutterBottom
              >
                GET IN TOUCH
              </Typography>
              <Typography variant="subtitle1">
                Send us a message and we'll get in touch with you!
              </Typography>
              <TextField
                fullWidth
                label="Name"
                name="_name"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="_email"
                margin="normal"
                required
                type="email"
              />

              <TextField
                fullWidth
                label="Message"
                name="_message"
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="primary"
                type="submit"
                sx={{
                  mt: 2,
                  width: "100px", // adjust this value as needed
                  backgroundColor: "#004aad",
                  color: "#fff", // adjust text color as needed
                  "&:hover": {
                    backgroundColor: "#003882", // darker shade for hover state
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
              background: `url(${ImageDots})`, // Use the imported image
            }}
          />
          <Box
            component="img"
            src={Catalog}
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
              borderRadius: 4, // Adjust the value to control the roundness
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
