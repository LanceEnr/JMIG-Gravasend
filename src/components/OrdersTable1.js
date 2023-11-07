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
  Grid,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  ListItemIcon,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserDrawer from "./common/UserDrawer";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

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
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = ["Processing", "In Transport", "Completed"];
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const modalBody = (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid
        item
        xs={11}
        sm={8}
        md={6}
        lg={4}
        component={Box}
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              Receipt
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", ml: 1 }}
            >
              #51
            </Typography>
            {!fullScreen && (
              <Chip
                label="Available"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#8dd290",
                  color: "success.main",
                  ml: 1,
                }}
              />
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {!fullScreen && (
          <Box sx={{ width: "100%", py: 2 }}>
            <Stepper activeStep={2}>
              {steps.map((label, index) => (
                <Step key={label} completed={index <= 2}>
                  <StepLabel
                    StepIconProps={{
                      style: { color: index <= 2 ? "#bd8512" : "" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Lance Enriquez" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Gravel - 32 cu. mt." />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="To Pay - ₱54,000" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ color: "success.main" }}>
                Your order is ready to be picked up at Mindanao Ave. Branch
              </Typography>
            }
          />
        </ListItem>
      </Grid>
    </Grid>
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
              <ListItem
                onClick={openModal}
                sx={{ cursor: "pointer" }} // This line adds the pointer
              >
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
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant="subtitle1"
                    >{`Receipt #${item._orderNum}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ color: "#004aad" }}
                        variant="body2"
                        noWrap
                      >
                        {item._date}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "#bd8512" }}
                      noWrap
                    >
                      ₱
                      {Number(item._price * item._quantity).toLocaleString(
                        "en-US"
                      )}
                    </Typography>
                    <Typography
                      sx={{ color: "#004aad" }}
                      variant="body2"
                      noWrap
                    >
                      {item._materialType} - {item._quantity} cu. mt.
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
      </List>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBody}
      </Modal>
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
