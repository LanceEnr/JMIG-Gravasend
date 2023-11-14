import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const TopNav = ({
  open,
  toggleDrawer,
  handleOpenNotificationsMenu,
  notifications,
  anchorElNotifications,
  handleCloseNotificationsMenu,
  handleOpenSettingsMenu,
  settings,
  handleSettingsClick,
  handleLogoutClick,
}) => {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: "24px" }}>
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
        <Avatar onClick={handleOpenSettingsMenu} sx={{ cursor: "pointer" }} />
        <Menu
          id="settings-menu"
          anchorEl={settings.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(settings.anchorEl)}
          onClose={settings.handleCloseSettingsMenu}
        >
          <MenuItem
            onClick={() => {
              handleSettingsClick();
              settings.handleCloseSettingsMenu();
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogoutClick();
              settings.handleCloseSettingsMenu();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
