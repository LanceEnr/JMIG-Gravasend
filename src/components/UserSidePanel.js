import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Badge,
  ListItemButton,
  ListItemIcon,
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
    marginRight: 12,
  },
})(Badge);

function SidePanel({ setActiveComponent }) {
  const [selected, setSelected] = useState("");

  const userName = localStorage.getItem("userName");
  const [counts, setCounts] = useState({
    totalOrders: "",
    totalAppointments: "",
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    axios
      .get(`http://localhost:3001/get-counts?userName=${storedUsername}`)
      .then((response) => {
        setCounts(response.data);

        if (response.data.length > 0) {
          const user = response.data[0];

          setCounts({
            totalOrders: user.totalOrders,
            totalAppointments: user.totalCounts,
          });
        }
      });
  }, []);

  const badgeContentMap = {
    Orders: counts.totalOrders,
    Appointments: counts.totalAppointments,
  };

  const handleClick = (text) => {
    setActiveComponent(text);
    setSelected(text);
  };

  return (
    <Paper elevation={2} sx={{ pt: 2, pb: 2, width: "100%" }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            DASHBOARD
          </ListSubheader>
        }
      >
        {["Orders", "Appointments"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleClick(text)}
            sx={{
              borderLeft: text === selected ? "4px solid #004aad" : "none",
            }}
          >
            <ListItemButton sx={{ justifyContent: "space-between" }}>
              <ListItemIcon
                sx={{
                  pointerEvents: "none",
                  color: text === selected ? "#004aad" : "#808080",
                }}
              >
                {index % 2 === 0 ? <ShoppingCartIcon /> : <EventNoteIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: text === selected ? "#004aad" : "inherit" }}
              />
              <ColoredBadge badgeContent={badgeContentMap[text]} />
            </ListItemButton>
          </ListItem>
        ))}
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
        {["Profile Info", "Edit Profile"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleClick(text)}
            sx={{
              borderLeft: text === selected ? "4px solid #004aad" : "none",
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  pointerEvents: "none",
                  color: text === selected ? "#004aad" : "#808080",
                }}
              >
                {index % 2 === 0 ? <AccountCircleIcon /> : <EditIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: text === selected ? "#004aad" : "inherit" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default SidePanel;
