import * as React from "react";
import axios from "axios";
import { withStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemIcon from "@mui/material/ListItemIcon";
import EventIcon from "@mui/icons-material/Event";
import OrderIcon from "@mui/icons-material/LocalShipping";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../store/reducers/authReducer";
import { useDispatch } from "react-redux";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DonutSmallSharpIcon from "@mui/icons-material/DonutSmallSharp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import ProfilePic from "../assets/formal1x1.webp";
import { fetchProfilePic } from "../components/cms";
import LogoGravasend from "../assets/LogoGravasend.webp";

const storedUsername = localStorage.getItem("userName");
const valuesData = await fetchProfilePic(storedUsername);
const imagePath = valuesData._profilePicture;
const filename = imagePath.substring(imagePath.lastIndexOf("\\") + 1);

const ColoredBadge = withStyles({
  badge: {
    backgroundColor: "#bd8512",
    color: "#fafbf5",
  },
})(Badge);

const token = localStorage.getItem("token");

const pages = ["Home", "Products", "FAQs", "About", "Contact"];
const mobilePages = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Products", icon: <StorefrontIcon /> },
  { name: "FAQs", icon: <LiveHelpIcon /> },
  { name: "About", icon: <InfoIcon /> },
  { name: "Contact", icon: <MailIcon /> },
];

const timeAgo = (timestamp) => {
  const currentDate = new Date();
  const notificationDate = new Date(timestamp);
  const timeDifference = currentDate - notificationDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) {
    // Display seconds if less than 1 minute
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  } else if (hours < 1) {
    // Display minutes if less than 1 hour
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else if (hours < 24) {
    // Display hours if less than 24 hours
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    // If more than 24 hours, display the full date
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return notificationDate.toLocaleString("en-US", options);
  }
};

const settings = ["Dashboard", "Logout"];
const userName = localStorage.getItem("userName");
const name = "";
const fetchNotifications = async () => {
  const storedUsername = localStorage.getItem("userName");

  try {
    const response = await axios.get(
      `http://localhost:3001/fetch-notifications?userName=${storedUsername}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const transformNotification = (data) => {
  return data.map((item) => ({
    icon: item._title.toLowerCase().includes("order") ? OrderIcon : EventIcon,
    heading: item._title,
    text: item._description,
    date: item._date,
  }));
};

const notifications = transformNotification(await fetchNotifications());

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasToken = localStorage.getItem("token") !== null;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };
  const userName = localStorage.getItem("userName");
  return (
    <AppBar position="sticky" style={{ backgroundColor: "#EAECEA" }}>
      <Container>
        <Toolbar disableGutters>
          <Link to="/">
            <Box
              component="img"
              src={LogoGravasend}
              alt="Logo"
              sx={{
                width: "125px",
                height: "auto",
                pt: "10px", // Adjust this value as needed
                pb: "10px", // Adjust this value as needed
                display: { xs: "none", md: "flex" },
              }}
            />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{ color: "#343231", "&:hover": { color: "#83948a" } }}
              />
            </IconButton>

            <SwipeableDrawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box
                sx={{
                  p: 2,
                  height: 1,
                  backgroundColor: "#EAECEA",
                }}
                role="presentation"
                onClick={handleCloseNavMenu}
                onKeyDown={handleCloseNavMenu}
              >
                <IconButton sx={{ mb: 2 }}>
                  <CloseIcon onClick={handleCloseNavMenu} />
                </IconButton>

                <Divider sx={{ mb: 2 }} />
                <List sx={{ width: 250 }}>
                  {mobilePages.map((page) => (
                    <ListItem
                      button
                      key={page.name}
                      component={Link}
                      to={page.name === "Home" ? "/" : `/${page.name}`}
                    >
                      <ListItemIcon>{page.icon}</ListItemIcon>
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </SwipeableDrawer>
          </Box>
          <Link to="/">
            <Box
              component="img"
              src={LogoGravasend}
              alt="Logo"
              sx={{
                width: "90px",
                height: "auto",
                mr: 2,
                pt: "5px", // Adjust this value as needed
                pb: "5px", // Adjust this value as needed
                display: { xs: "flex", md: "none" },
              }}
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page === "Home" ? "/" : `/${page}`}
                sx={{
                  fontWeight: "bold",
                  color: "#343231",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!hasToken && (
            <Button
              component={Link}
              to={"/login"}
              variant="contained"
              sx={{
                ml: 2,
              }}
            >
              Login
            </Button>
          )}
          {hasToken && (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNotificationsMenu}>
                  <ColoredBadge
                    badgeContent={notifications ? notifications.length : 0}
                  >
                    <NotificationsIcon color="action" />
                  </ColoredBadge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                }}
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
                    <Box sx={{ width: "300px" }}>
                      {/* Add this line */}
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }} // Add whiteSpace: "normal"
                      >
                        {notification.heading}
                      </Typography>

                      <Typography variant="body2">
                        {notification.text}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, color: "#83948a" }}
                      >
                        {timeAgo(notification.date)}
                      </Typography>
                    </Box>{" "}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {hasToken && (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userName}
                    src={require(`../images/profile/${filename}`)}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                        localStorage.removeItem("token");
                        dispatch({ type: "LOGOUT" });
                        toast.success("Logout successfully", {
                          autoClose: 50,
                          onClose: () => {
                            navigate("/login");
                            window.location.reload();
                          },
                        });
                      } else {
                        setAnchorElSettings(null);
                      }
                    }}
                  >
                    <Link
                      to={
                        setting === "Account" ? "/ProfileInfo" : `/${setting}`
                      }
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="inherit" textAlign="center">
                        {setting}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
