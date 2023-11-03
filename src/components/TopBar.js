import React from "react";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box } from "@mui/material";

export default function TopBar() {
  return (
    <Box
      sx={{
        backgroundColor: "#004aad",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <div style={{ display: "flex" }}>
          <Chip
            label="HOT"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#EBDAB7",
              color: "#bd8512",
              height: "18px",
              marginRight: 1,
            }}
          />
          <Typography
            variant="caption"
            component="div"
            style={{ color: "#f6f9fc", fontWeight: "bold" }}
          >
            Book an appointment now!
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Avatar
            sx={{
              backgroundColor: "#EBDAB7",
              marginRight: 1,
              width: "20px",
              height: "20px",
            }}
          >
            <PhoneIcon style={{ color: "#bd8512", fontSize: "16px" }} />
          </Avatar>
          <Typography
            variant="caption"
            component="div"
            style={{ color: "#f6f9fc", fontWeight: "bold" }}
          >
            +639774548584
          </Typography>
        </div>
      </Container>
    </Box>
  );
}
