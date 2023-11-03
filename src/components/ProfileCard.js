import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ProfileCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt="Tim Cook" src="/static/images/avatar/1.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5" component="div">
              Tim Cook
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              CEO of Apple
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Opportunities applied: 32</Typography>
          <Typography variant="body2">Opportunities won: 26</Typography>
          <Typography variant="body2">Current opportunities: 6</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
