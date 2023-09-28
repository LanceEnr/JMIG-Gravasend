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
import DonutLargeSharpIcon from "@mui/icons-material/DonutLargeSharp";
import DiamondSharpIcon from "@mui/icons-material/DiamondSharp";
import DonutSmallSharpIcon from "@mui/icons-material/DonutSmallSharp";
import { SiRockylinux } from "react-icons/si";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ColoredBadge = withStyles({
  badge: {
    backgroundColor: "#bd8512",
    color: "#fafbf5",
  },
})(Badge);

const token = localStorage.getItem("token");

const pages = [
  "Home",
  "Products",
  "FAQs",
  "About",
  "Contact",
  ...(token ? [] : ["Login", "Register"]),
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

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#fafbf5" }}>
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
            variant="h5"
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
                  color: "#343231",
                  borderRadius: 0,
                  "&:hover": { borderBottom: "3px solid #004aad" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
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
                        localStorage.removeItem("token");
                        console.log("Removed Token");
                        toast.success("Logout successfully", {
                          autoClose: 500,
                          onClose: () => {
                            navigate("/");
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
