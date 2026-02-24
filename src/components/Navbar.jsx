import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { SideBarBtn } from "./SideBarBtn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Outlet } from "react-router";
import { useLogoutUserMutation } from "../redux/apis/UserDetails";
import { useDispatch } from "react-redux";
import { Loading } from "./Loading";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/features/UserDetailsSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading, isSuccess }] = useLogoutUserMutation();

  const handleUserOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUserCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutUser());
      navigate("/login", { replace: true });
    }
  }, [isSuccess, dispatch, navigate]);

  const handleUserLogout = async () => {
    handleUserCloseMenu();
    logout();
  };

  return (
    <>
      {isLoading && <Loading />}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Digital Diagnostic Center
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <Tooltip title="Open Settings">
                <IconButton onClick={handleUserOpenMenu}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
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
                <MenuItem
                  onClick={handleUserLogout}
                  sx={{ textAlign: "center" }}
                >
                  <Typography variant="body1">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <SideBarBtn label={"Add Vendor"} link={"/admin/create-vendor"}>
              <AddCircleIcon />
            </SideBarBtn>
            <SideBarBtn label={"Vendors"} link={"/admin/vendor"}>
              <AddCircleIcon />
            </SideBarBtn>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box
            sx={{
              p: 1,
              mt: -1,
              width: "auto",
              height: "auto",
              backgroundColor: "white",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
