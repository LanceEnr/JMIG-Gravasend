import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import CoverPhoto from "../../assets/coverphoto.png";
import ProfilePic from "../../assets/formal1x1.jpg";

const Img = styled("img")({
  height: "140px",
  width: "100%",
  objectFit: "cover",
});

export default function ProfileCard({ profile }) {
  return (
    <Card sx={{ width: "100%", position: "relative" }}>
      <Img alt={profile.name} src={CoverPhoto} />
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative", // Add position relative to the container
        }}
      >
        <Avatar
          alt={profile.name}
          src={ProfilePic}
          sx={{
            width: 100,
            height: 100,
            top: -60,
            position: "absolute", // Set position to absolute
            marginBottom: -10,
            border: "4px solid white", // Add a white border with a width of 3px
          }}
        />

        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              mt: 3,
              mb: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontWeight: "bold" }}
              component="div"
            >
              {profile.name}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: "#004aad", fontWeight: "bold" }}
            >
              @lanceenr
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.city}
            </Typography>
          </Box>
        </CardContent>
        <Divider
          sx={{
            position: "absolute", // Set position to absolute
            bottom: 80, // Position it at the bottom
            width: "100%", // Make it full width
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 1,
          }}
        >
          <div style={{ textAlign: "center", margin: "0 10px" }}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "#bd8512" }}
            >
              20
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Orders
            </Typography>
          </div>

          <div style={{ textAlign: "center", margin: "0 10px" }}>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "#bd8512" }}
            >
              20
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Appointments
            </Typography>
          </div>
        </Box>
      </Box>
    </Card>
  );
}
