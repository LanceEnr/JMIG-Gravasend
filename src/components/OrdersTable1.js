import React, { useState } from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MainCard from "./common/MainCard";
import CircleIcon from "@mui/icons-material/Circle";

const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

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
      return { main: "success.main", lighter: "success.lighter" };
    case "Failed":
      return { main: "error.main", lighter: "error.lighter" };
    case "Pending":
      return { main: "warning.main", lighter: "warning.lighter" };
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
          "& .MuiListItemButton-root": {
            py: 1.5,
            "& .MuiAvatar-root": avatarSX,
            "& .MuiListItemSecondaryAction-root": {
              ...actionSX,
              position: "relative",
            },
          },
        }}
      >
        {data.map((item) => (
          <ListItem divider key={item.orderNumber}>
            <ListItemAvatar>
              <Tooltip title={item.status}>
                <CircleIcon
                  sx={{
                    color: getColor(item.status).main,
                    bgcolor: getColor(item.status).lighter,
                    "&:hover": {
                      color: getColor(item.status).main,
                    },
                  }}
                />
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
                  &nbsp;{item.materialType} - &nbsp;{item.quantity} cu. mt.
                </Typography>
                <Typography variant="h6" color="primary" noWrap>
                  PHP{Number(item.price).toLocaleString("en-US")}
                </Typography>
              </Stack>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </MainCard>
  );
}
