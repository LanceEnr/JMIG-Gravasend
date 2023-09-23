import React from "react";
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
        {data.map((item, index) => (
          <ListItem key={item.orderNumber} divider={index !== data.length - 1}>
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
                <Typography variant="subtitle1">{`Order ${item.orderNumber}`}</Typography>
              }
              secondary={item.date}
            />
            <ListItemSecondaryAction>
              <Stack alignItems="flex-end">
                <Typography variant="subtitle1" noWrap>
                  PHP{Number(item.price).toLocaleString("en-US")}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" noWrap>
                   {item.materialType} -  {item.quantity} cu. mt.
                </Typography>
              </Stack>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
        />
      </Box>
    </List>
  );
}
