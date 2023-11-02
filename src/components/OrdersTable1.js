import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  ListItem,
  Tooltip,
  Typography,
  Avatar,
  Paper,
  Box,
  Pagination,
  useMediaQuery,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserDrawer from "./common/UserDrawer";

const getColor = (status) => {
  switch (status) {
    case "Available for pickup-PANDI":
      return { main: "success.main", lighter: "#8dd290" };
    case "Available for pickup-MindanaoAve.":
      return { main: "success.main", lighter: "#8dd290" };
    case "Delayed":
      return { main: "error.main", lighter: "#f5c9c9" };
    case "Cancelled":
      return { main: "error.main", lighter: "#f5c9c9" };
    case "Pending":
      return { main: "warning.main", lighter: "#ffc890" };
    case "Fetch from quarry":
      return { main: "warning.main", lighter: "#ffc890" };
    case "Arrived at Pandi":
      return { main: "warning.main", lighter: "#ffc890" };
    case "Arrived at MindanaoAve.":
      return { main: "warning.main", lighter: "#ffc890" };
    default:
      return { main: "", lighter: "" };
  }
};

export default function OrdersTable1(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    if (storedUsername) {
      axios
        .get(`http://localhost:3001/order?userName=${storedUsername}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, []);
  return (
    <div>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#004aad", fontWeight: "bold", my: 1 }}
          >
            <ShoppingCartIcon sx={{ mr: 2, verticalAlign: "middle" }} />
            Orders
          </Typography>
          {isMobile && (
            <UserDrawer
              onActiveComponentChange={props.onActiveComponentChange}
            />
          )}
        </Box>
        {orders
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item, index) => (
            <Paper elevation={2} sx={{ my: 1 }} key={item.orderNumber}>
              <ListItem>
                <ListItemAvatar>
                  <Tooltip title={item._status}>
                    <Avatar
                      sx={{
                        bgcolor: getColor(item._status).lighter,
                        color: getColor(item._status).main,
                      }}
                    >
                      {item._status === "Available for pickup-PANDI" && (
                        <CheckIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Available for pickup-MindanaoAve." && (
                        <CheckIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Delayed" && (
                        <CloseIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Cancelled" && (
                        <CloseIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Pending" && (
                        <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Fetch from quarry" && (
                        <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Arrived at Pandi" && (
                        <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                      )}
                      {item._status === "Arrived at MindanaoAve." && (
                        <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                      )}
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="subtitle1">{`Receipt No. ${item._orderNum}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {item._status} - {item._date}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        PHP
                        {Number(item._price * item._quantity).toLocaleString(
                          "en-US"
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {item._materialType} - {item._quantity} cu. mt.
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      PHP
                      {Number(item._price * item._quantity).toLocaleString(
                        "en-US"
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      noWrap
                    >
                      {item._orderDet}
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
        />
      </Box>
    </div>
  );
}
