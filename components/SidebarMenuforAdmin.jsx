import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import {
  Box,
  Divider,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  CssBaseline,
  Button,
} from "@mui/material";
import { Outlet, useParams, useLocation } from "react-router-dom";


import { AiOutlineTeam } from "react-icons/ai";
import AdminDashHeader from "./AdminDashHeader";

const drawerWidth = 220;
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
  justifyContent: "space-between", // Adjusted for the logo and button alignment
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarMenuforAdmin = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  let { companyId } = useParams();
  const location = useLocation();
  const [headersData, setHeadersData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white", boxShadow: "1px 0px 1px 1px #d2d2d2" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3.5,
              // backgroundColor: 'white',
              ...(open && { display: "none" }),
            }}
          >

                        <ChevronRightIcon
              sx={{
                fontSize: "30px",
                marginLeft: 1,
                padding: "5px",
                borderRadius: "50%",
                color: "#0000008a",
                "&:hover": { backgroundColor: "#f4f4f4" },
              }}
            />          </IconButton>
          {/* <Grid container>
            <Typography variant="Heading-head" noWrap component="div">
              {selectedLabel && selectedLabel}
            </Typography>
          </Grid>
          <Grid>
            <Button variant="button1" onClick={handleClickEmployee}>
              <img src={create} alt="logo" height={15} /> 
            </Button>
          </Grid> */}
          <AdminDashHeader />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ paddingLeft: "24px" }}>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: open ? "5px 5px" : "5px 0px" }}>
          {["Admin Panel"].map((label, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "#3b3bb6",
                  backgroundColor: "#3b3bb81a",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AiOutlineTeam size={20} color="#3b3bb6" />{" "}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarMenuforAdmin;
