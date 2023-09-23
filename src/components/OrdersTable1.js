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
} from "@mui/material";
import MainCard from "./common/MainCard";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const data = [
  {
    status: "Pending",
    orderNumber: "#002434",
    date: "5 August, 1:45 PM",
    materialType: "Gravel",
    quantity: 100,
    price: 50000,
  },
  {
    status: "Failed",
    orderNumber: "#002435",
    date: "6 August, 2:45 PM",
    materialType: "Sand",
    quantity: 200,
    price: 40000,
  },
  {
    status: "Arrived",
    orderNumber: "#002436",
    date: "7 August, 3:45 PM",
    materialType: "Gravel",
    quantity: 300,
    price: 30000,
  },
  {
    status: "Arrived",
    orderNumber: "#002436",
    date: "7 August, 3:45 PM",
    materialType: "Gravel",
    quantity: 300,
    price: 30000,
  },
  {
    status: "Arrived",
    orderNumber: "#002436",
    date: "7 August, 3:45 PM",
    materialType: "Gravel",
    quantity: 300,
    price: 30000,
  },
  {
    status: "Arrived",
    orderNumber: "#002436",
    date: "7 August, 3:45 PM",
    materialType: "Gravel",
    quantity: 300,
    price: 30000,
  },
  {
    status: "Arrived",
    orderNumber: "#002436",
    date: "7 August, 3:45 PM",
    materialType: "Gravel",
    quantity: 300,
    price: 30000,
  },
];

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

export default function OrdersTable1() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch users from the backend when the component mounts
    axios.get("http://localhost:3001/order").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <MainCard sx={{ mt: 2 }} content={false}>
      <List
        component="nav"
        sx={{
          px: 0,
          py: 0,
          border: "1px solid",
          borderColor: "#E6EBF1",
          borderRadius: 1,
        }}
      >
        {orders.map((item, index) => (
          <ListItem key={item._id} divider={index !== orders.length - 1}>
            <ListItemAvatar>
              <Tooltip title={item.status}>
                <Avatar
                  sx={{
                    bgcolor: getColor(item._status).lighter,
                    color: getColor(item._status).main,
                  }}
                >
                  {item._status === "Arrived" && (
                    <CheckIcon sx={{ pointerEvents: "none" }} />
                  )}
                  {item._status === "Failed" && (
                    <CloseIcon sx={{ pointerEvents: "none" }} />
                  )}
                  {item._status === "Pending" && (
                    <AccessTimeIcon sx={{ pointerEvents: "none" }} />
                  )}
                </Avatar>
              </Tooltip>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography variant="subtitle1">{`Order ${item._id}`}</Typography>
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
        ))}
      </List>
    </MainCard>
  );
}
