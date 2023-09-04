import * as React from "react";
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
import { Link } from "react-router-dom";

const pages = ["Home", "Products", "FAQs", "About", "Contact", "SignIn"];

const settings = ["Account", "Orders", "Appointments", "Logout"];

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

  return (
    <AppBar position="static" style={{ backgroundColor: "#fafbf5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#004aad",
              textDecoration: "none",
            }}
          >
            JMIG Gravel & Sand Co.
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

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page === "Home" ? "/" : `/${page}`}
                  sx={{ color: "#343231" }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
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
                sx={{ color: "#343231", fontWeight: "bold" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpenNotificationsMenu}>
                <Badge
                  badgeContent={notifications ? notifications.length : 0}
                  color="primary"
                >
                  <NotificationsIcon color="action" />
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
          </Box>

          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
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
                      // Handle logout
                      // ...
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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
