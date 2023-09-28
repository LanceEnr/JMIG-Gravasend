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
    case "Arrived":
      return { main: "success.main", lighter: "#8dd290" };
    case "Failed":
      return { main: "error.main", lighter: "#f5c9c9" };
    case "Pending":
      return { main: "warning.main", lighter: "#ffc890" };
    default:
      return { main: "", lighter: "" };
  }
};

export default function OrdersTable1(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 10; // Set your desired items per page
  const [page, setPage] = useState(1); // Set the initial page number
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event, value) => {
    // Handle page change here, e.g., update the displayed data
    setPage(value);
  };

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get("http://localhost:3001/order").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
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
          <UserDrawer onActiveComponentChange={props.onActiveComponentChange} />
        )}
      </Box>
      {orders
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((item, index) => (
          <Paper elevation={2} sx={{ my: 1 }}>
            <ListItem key={item.orderNumber}>
              <ListItemAvatar>
                <Tooltip title={item.status}>
                  <Avatar
                    sx={{
                      bgcolor: getColor(item.status).lighter,
                      color: getColor(item.status).main,
                    }}
                  >
                    {item.status === "Arrived" && (
                      <CheckIcon sx={{ pointerEvents: "none" }} />
                    )}
                    {item.status === "Failed" && (
                      <CloseIcon sx={{ pointerEvents: "none" }} />
                    )}
                    {item.status === "Pending" && (
                      <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                    )}
                  </Avatar>
                </Tooltip>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle1">{`Order ${item._orderNum}`}</Typography>
                }
                secondary={item._date}
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    PHP{Number(item._price).toLocaleString("en-US")}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" noWrap>
                     {item._materialType} -  {item._quantity} cu. mt.
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
        />
      </Box>
    </List>
  );
}
