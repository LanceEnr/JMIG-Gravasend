import * as React from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

const ColoredBadge = withStyles({
  badge: {
    backgroundColor: "#bd8512",
    color: "#fafbf5",
  },
})(Badge);

const token = localStorage.getItem("token");

const pages = ["Home", "Products", "Services", "FAQs", "About", "Contact"];
const mobilePages = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Products", icon: <StorefrontIcon /> },
  { name: "Services", icon: <RoomServiceIcon /> },
  { name: "FAQs", icon: <LiveHelpIcon /> },
  { name: "About", icon: <InfoIcon /> },
  { name: "Contact", icon: <MailIcon /> },
];

const settings = ["Dashboard", "Logout"];

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
    <AppBar position="sticky" style={{ backgroundColor: "#e8f2ff " }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <DonutSmallSharpIcon
              sx={{
                mr: 1,
                position: "relative",
                display: { xs: "none", md: "flex" },
                color: "#bd8512",
                pointerEvents: "none",
                fontSize: "40px",
              }}
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#004aad",
              textDecoration: "none",
            }}
          >
            JMIG Gravel & Sand
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{ color: "#343231", "&:hover": { color: "#004aad" } }}
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
                  backgroundColor: "#e8f2ff",
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
            <DonutSmallSharpIcon
              sx={{
                ml: 3,
                mr: 1,
                display: { xs: "flex", md: "none" },
                color: "#bd8512",
                pointerEvents: "none",
                fontSize: "40px",
              }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#004aad",
              textDecoration: "none",
            }}
          >
            JMIG
          </Typography>

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
                backgroundColor: "#004aad",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#003882",
                },
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
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        {notification.heading}
                      </Typography>
                      <Typography variant="body2">
                        {notification.text}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {hasToken && (
            <Box sx={{ flexGrow: 0, mr: 2 }}>
              <Tooltip title="Settings">
                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                  <Avatar alt={userName} />
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
                      } else if (setting === "Account") {
                        window.location.href = "/ProfileInfo";
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
