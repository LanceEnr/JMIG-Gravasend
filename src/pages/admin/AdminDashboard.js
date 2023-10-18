import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReportIcon from "@mui/icons-material/Report";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WebIcon from "@mui/icons-material/Web";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdminProfileInfo from "./AdminProfileInfo";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FleetInformation from "./FleetInformation";
import Maintenance from "./Maintenance";
import Inspection from "./Inspection";
import Trips from "./Trips";
import Inventory from "./Inventory";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import ManageOrders from "./ManageOrders";
import DriverManagement from "./DriverManagement";
import UserManagement from "./UserManagement";
import ManageContactForm from "./ManageContactForm";
import DeliveryMonitoring from "./DeliveryMonitoring";
import JobOrderSystem from "./JobOrderSystem";
import Reports from "./Reports";
import ManageAppointments from "./ManageAppointments";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RandomStringGenerator from "./components/RandomStringGenerator";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddProduct from "./AddProduct";
import Content from "./Content";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {" JMIG Gravel and Sand Supply."}
    </Typography>
  );
}

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    overflowY: "auto", // Add this line
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const notifications = [
  {
    icon: EventIcon,
    heading: "Upcoming Appointment",
    text: "You have an appointment with JMIG tomorrow.",
  },
  {
    icon: CheckCircleIcon,
    heading: "Order Acknowledged",
    text: "Your order has been received and is being processed.",
  },
];

const settings = ["Settings", "Logout"];

export default function AdminDashboard() {
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState(null);
  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    if (open) {
      setOpenFleetManagement(false);
    }
  };
  const [openFleetManagement, setOpenFleetManagement] = useState(false);
  const handleClickFleetManagement = () => {
    setOpenFleetManagement(!openFleetManagement);
    if (!open) {
      setOpen(true);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUserName");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout successfully", {
      autoClose: 50,
      onClose: () => {
        navigate("/adminLogin");
        window.location.reload();
      },
    });
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            JMIG Admin Panel
          </Typography>
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={handleOpenNotificationsMenu}>
              <Badge
                color="secondary"
                badgeContent={notifications ? notifications.length : 0}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="notification-appbar"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
          >
            {notifications.map((notification) => (
              <MenuItem
                key={notification.heading}
                onClick={handleCloseNotificationsMenu}
              >
                <ListItemIcon>
                  <notification.icon fontSize="small" />
                </ListItemIcon>
                <div>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {notification.heading}
                  </Typography>
                  <Typography variant="body2">{notification.text}</Typography>
                </div>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElSettings}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElSettings)}
              onClose={handleCloseSettingsMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      localStorage.removeItem("adminToken");
                      dispatch({ type: "LOGOUT" });
                      toast.success("Logout successfully", {
                        autoClose: 50,
                        onClose: () => {
                          navigate("/adminLogin");
                          window.location.reload();
                        },
                      });
                    } else if (setting === "Settings") {
                      window.location.href = "/settings";
                    } else {
                      window.location.href = `/${setting}`;
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Operations
          </ListSubheader>
          <ListItemButton onClick={handleClickFleetManagement}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Fleet Management" />
            {openFleetManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFleetManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                </ListItemIcon>
                <ListItemText primary="Fleet Information" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                </ListItemIcon>
                <ListItemText primary="Maintenance" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                </ListItemIcon>
                <ListItemText primary="Inspection" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Job Orders" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Trip Verification" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <TrackChangesIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Orders" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Management
          </ListSubheader>
          <ListItemButton>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Drivers" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListSubheader component="div" inset>
            Website
          </ListSubheader>
          <ListItemButton>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText primary="Content" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container maxWidth="lg" sx={{ my: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Content />
              <AddProduct />
              <DeliveryMonitoring />
              <AdminProfileInfo />
              <FleetInformation />
              <Maintenance />
              <Inspection />
              <Trips />
              <Inventory />
              <ManageOrders />
              <DriverManagement />
              <RandomStringGenerator />
              <UserManagement />
              <ManageContactForm />
              <JobOrderSystem />
              <ManageAppointments />
              <Reports />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
