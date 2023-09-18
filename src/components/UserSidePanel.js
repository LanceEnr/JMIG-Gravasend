import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { withStyles } from "@mui/styles";

const ColoredBadge = withStyles({
  badge: {
    backgroundColor: "#bd8512",
    color: "#fafbf5",
    marginRight: 4,
  },
})(Badge);
function SidePanel() {
  return (
    <Paper elevation={2} sx={{ pt: 2, pb: 2 }}>
      {" "}
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            DASHBOARD
          </ListSubheader>
        }
      >
        <ListItem
          button
          onClick={() => {
            console.log("Orders clicked");
          }}
          sx={{ "&:hover": { borderLeft: "4px solid #004aad" } }}
        >
          <ShoppingCartIcon
            color="action"
            sx={{ mr: 1, pointerEvents: "none" }}
          />
          <ListItemText primary="Orders" />
          <ColoredBadge badgeContent={4} />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            console.log("Appointments clicked");
          }}
          sx={{ "&:hover": { borderLeft: "4px solid #004aad" } }}
        >
          <EventNoteIcon color="action" sx={{ mr: 1, pointerEvents: "none" }} />
          <ListItemText primary="Appointments" />
          <ColoredBadge badgeContent={3} />
        </ListItem>
      </List>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            ACCOUNT SETTINGS
          </ListSubheader>
        }
      >
        <ListItem
          button
          onClick={() => {
            console.log("Profile Info clicked");
          }}
          sx={{ "&:hover": { borderLeft: "4px solid #004aad" } }}
        >
          <AccountCircleIcon
            color="action"
            sx={{ mr: 1, pointerEvents: "none" }}
          />
          <ListItemText primary="Profile Info" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            console.log("Edit Profile clicked");
          }}
          sx={{ "&:hover": { borderLeft: "4px solid #004aad" } }}
        >
          <EditIcon color="action" sx={{ mr: 1, pointerEvents: "none" }} />
          <ListItemText primary="Edit Profile" />
        </ListItem>
      </List>
    </Paper>
  );
}

export default SidePanel;
