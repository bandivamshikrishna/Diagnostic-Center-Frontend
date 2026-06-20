import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Menu,
  ChevronLeft,
  People,
  Settings,
  Logout,
  Notifications,
} from "@mui/icons-material";
import { MenuItem, Menu as MenuPopUp } from "@mui/material";

import Tooltip from "@mui/material/Tooltip";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { logoutUser } from "../redux/features/UserSlice";
import { useDispatch } from "react-redux";
import {
  useLogoutUserMutation,
  userDetailsAPI,
} from "../redux/apis/UserDetails";
import { Loading } from "./Loading";

const drawerWidth = 250;
const collapsedWidth = 90;

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutUserMutation();
  const userFullName = useSelector((state) => state.UserSlice.user.fullName);
  const userRole = useSelector((state) => state.UserSlice.role.roleName);
  const userRoleCode = useSelector((state) => state.UserSlice.role.roleCode);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUserLogout = async () => {
    handleUserCloseMenu();
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      dispatch(userDetailsAPI.util.resetApiState());
      navigate("/login", { replace: true });
    } catch (e) {
      console.log("login failed", e);
    }
  };

  const menus = [
    {
      name: "Vendors",
      icon: <AccountBalanceIcon />,
      link: "/admin/vendors",
      roles: ["AD"],
    },
    { name: "Users", icon: <People />, link: "/admin/users", roles: ["AD"] },
    {
      name: "Tests",
      icon: <LocalHospitalIcon />,
      link: "/admin/medical-tests",
      roles: ["AD"],
    },
    {
      name: "Patients",
      icon: <People />,
      link: "/patients",
      roles: ["LSV", "LT"],
    },
    {
      name: "Manage Tests",
      icon: <LocalHospitalIcon />,
      link: "/manage-tests",
      roles: ["LSV", "LT"],
    },
    {
      name: "Settings",
      icon: <Settings />,
      link: "/",
      roles: ["AD", "LSV", "LT"],
    },
  ];
  const activeMenu = menus.find((m) => location.pathname === m.link);
  const allowedMenus = menus.filter((menu) =>
    menu.roles.includes(userRoleCode),
  );

  const sidebarWidth = open ? drawerWidth : collapsedWidth;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isLoading && <Loading />}

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            overflowX: "hidden",
            transition: "width 0.3s ease",
            border: "none",
            background: "linear-gradient(180deg,#020617,#0f172a,#1e293b)",
            color: "#fff",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          },
        }}
      >
        {/* TOP */}
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "space-between" : "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {open && <Typography fontWeight={800}>Diagnostic Center</Typography>}

          <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(!open)}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: "#334155" }} />

        {/* PROFILE */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: open ? "row" : "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "#2563eb", width: 55, height: 55 }}>
            {userFullName.charAt(0).toUpperCase()}
          </Avatar>

          {open && (
            <Box>
              <Typography fontWeight={700}>{userFullName}</Typography>
              <Typography variant="body2" color="#94a3b8">
                {userRole}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: "#334155" }} />

        {/* MENU */}
        <List sx={{ p: 2 }}>
          {allowedMenus.map((menu) => (
            <ListItemButton
              key={menu.name}
              onClick={() => {
                navigate(menu.link);
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                background:
                  location.pathname == menu.link
                    ? "linear-gradient(135deg,#2563eb,#3b82f6)"
                    : "transparent",
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                {menu.icon}
              </ListItemIcon>

              {open && <ListItemText primary={menu.name} />}
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={{ borderColor: "#334155" }} />

        {/* LOGOUT */}
        <Box p={2}>
          <ListItemButton sx={{ color: "#ef4444" }}>
            <ListItemIcon sx={{ color: "#ef4444" }} onClick={handleUserLogout}>
              <Logout />
            </ListItemIcon>

            {open && (
              <ListItemText primary="Logout" onClick={handleUserLogout} />
            )}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* MAIN CONTENT (THIS IS THE FIX) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: "#f8fafc",

          // 🔥 KEY PART: OUTLET RESIZES WITH SIDEBAR
          marginLeft: `${0}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "all 0.3s ease",
        }}
      >
        {/* APP BAR */}
        <AppBar
          position="sticky"
          sx={{
            background: "white",
            color: "black",
            boxShadow: "none",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Toolbar>
            <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>
              {activeMenu?.name}
            </Typography>

            <IconButton>
              <Notifications />
            </IconButton>

            <Tooltip title="Open Settings">
              <IconButton onClick={handleUserOpenMenu}>
                <Avatar sx={{ bgcolor: "#2563eb" }}>
                  {userFullName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            <MenuPopUp
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserCloseMenu}
            >
              <MenuItem
                onClick={handleUserCloseMenu}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="body1">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleUserCloseMenu}
                sx={{ textAlign: "center" }}
              >
                <Typography variant="body1">Change Password</Typography>
              </MenuItem>
              <MenuItem sx={{ textAlign: "center" }} onClick={handleUserLogout}>
                <Typography variant="body1">Logout</Typography>
              </MenuItem>
            </MenuPopUp>
          </Toolbar>
        </AppBar>

        {/* OUTLET AREA */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
