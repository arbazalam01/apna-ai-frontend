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
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import api from "@utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import LogoutPopUP from "./LogoutPopUP";
// ICONS START
// import overview from "/Icons/Sidebar/Overview.svg";
// import reports from "/Icons/Sidebar/Reports.svg";
// import campaigns from "/Icons/Sidebar/Campaigns.svg";
import companyname from "/Icons/Sidebar/CompanyName.svg";
// import adminpanel from "/Icons/Sidebar/AdminPanel.svg";
// import logout from "/Icons/Sidebar/LogOut.svg";
// import creator from "/Icons/Sidebar/Creator.svg";
// import settings from "/Icons/Sidebar/Settings.svg";
// import targetpersnas from "/Icons/Sidebar/TargetPersonas.svg";
// import datainsights from "/Icons/Misc/TrendingThemes.svg";
// import create from "/Icons/Misc/CreateNew.svg";

import {
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineHome,
  AiOutlineForm,
  AiOutlineSetting,
  AiOutlineContainer,
  AiOutlineNotification,
  AiOutlineLineChart,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

// ICONS END
//

import Head from "@components/ReportSection/Head";
import CombinedReportHeader from "@components/CombinedReport/Head";
import CampaignHeader from "./Campaigns/CampaignHeader";
import { useSetAtom } from "jotai";
import { tokenAtom } from "../store/AuthStore";
import { removeTokenFromAxios, removeTokenFromCookie } from "../utils/api";
import { Skeleton } from "antd";
import CreateCampaignHeader from "./CreateCampaign/CreateCampaignHeader";
import InsightHeader from "./SalesInsight/InsightHeader";

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

const SidebarMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  let { companyId } = useParams();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const setToken = useSetAtom(tokenAtom);

  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isPending, error, data } = useQuery({
    queryKey: ["competitors"],
    queryFn: () => api.get(`/customer/${companyId}/getcompetitors`),
    refetchInterval: 20 * 1000,
  });


  const companyName = data?.data?.data[0]?.companyId?.name;
  console.log("companyName", companyName);

  const handleLogout = async () => {
    const apiUrl = `api/signout`;

    const response = await api.get(apiUrl);
    const data = await response.data;

    setOpenDialog(false);
    removeTokenFromAxios();
    removeTokenFromCookie();
    setToken(null);

    // remove token from cookie
    navigate("/");
    // window.location.reload();
  };

  useEffect(() => {
    if (companyId) {
      // Check if the URL includes "/reports" to highlight the Reports label
      if (location.pathname.includes("/overview")) {
        setSelectedLabel("Overview");
      } else if (location.pathname.includes("/reports")) {
        setSelectedLabel("Reports");
      } else if (location.pathname.includes("/combinedreports")) {
        setSelectedLabel("Combined Reports");
      } else if (location.pathname.includes("/personas")) {
        setSelectedLabel("Target Personas");
      } else if (location.pathname.includes("/create-persona")) {
        setSelectedLabel("New Personas");
      } else if (location.pathname.includes("/calendar")) {
        setSelectedLabel("Campaigns");
        
      } else if (location.pathname.includes("/create-campaign")) {
        setSelectedLabel("New Campaigns");} else if (location.pathname.includes("/creator")) {
        setSelectedLabel("Creator");
      } else if (location.pathname.includes("/datainsight")) {
        setSelectedLabel("Insights");
      } else {
        setSelectedLabel("Settings");
      }
    }
  }, [companyId, location.pathname]);

  const allCompanies = data?.data?.data[0];

  const isScraped = allCompanies?.isReportDone;

  // if (!headersData) return <Loader />;

  // const { companyId: company } = headersData;

  const handleClickEmployee = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (label) => {
    setSelectedLabel(label);

    switch (label) {
      case "Users":
        navigate(`/${companyId}/users`);
        break;
      case "Roles":
        navigate(`/${companyId}/roles`);
        break;
      case "Creator":
        navigate(`/${companyId}/creator`);
        break;
      case "Insights":
        navigate(`/${companyId}/datainsight`);
        break;
      case "Reports":
        navigate(`/${companyId}/reports`);
        break;
      case "Overview":
        navigate(`/${companyId}/overview`);
        break;
      case "Campaigns":
        navigate(`/${companyId}/calendar`);
        break;

      // case "Settings":
      //   navigate(`/${companyId}/company-details`);
      //   break;

      case "Logout":
        handleClickEmployee();
        break;

      default:
        navigate(`/${companyId}/company-details`);
        break;
    }
  };


  const handleNavigateAdminDash=()=>{
    navigate("/admindashboard")
  }

  let icon = null;

  const getIcon = (label) => {
    switch (label) {
      case "Overview":
        return (icon = (
          <AiOutlineHome
            size={20}
            color={selectedLabel === "Overview" ? "#3b3bb6" : "#000"}
          />
        ));
      case "Reports":
        return (icon = (
          <AiOutlineContainer
            size={20}
            color={selectedLabel === "Reports" ? "#3b3bb6" : "#000"}
          />
        ));
      case "Campaigns":
        return (icon = (
          <AiOutlineNotification
            size={20}
            color={selectedLabel === "Campaigns" ? "#3b3bb6" : "#000"}
          />
        ));
      case "Creator":
        return (icon = (
          <AiOutlineForm
            size={20}
            color={selectedLabel === "Creator" ? "#3b3bb6" : "#000"}
          />
        ));
      case "Settings":
        return (
          <AiOutlineEye
            size={20}
            color={selectedLabel === "Settings" ? "#3b3bb6" : "#000"}
          />
        );
      case "Logout":
        return (icon = (
          <BiLogOut
            size={20}
            color={selectedLabel === "Logout" ? "#3b3bb6" : "#000"}
          />
        ));
      case "Insights":
        return (icon = (
          <AiOutlineLineChart
            size={20}
            color={selectedLabel === "Insights" ? "#3b3bb6" : "#000"}
          />
        ));
      default:
        return companyname;
    }
  };

  if (isLoading || isPending) {
    return <Skeleton active />;
  }
  if (error)
    return <div>Failed to load</div>;
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
            // color="inherit"
            style={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "white" },
            }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
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
            />
          </IconButton>
          {/* <Grid container>
            
            <Typography variant="Heading-head" noWrap component="div">
              {selectedLabel && selectedLabel}
            </Typography>
          </Grid>
          <Grid item>
          
            <Button variant="button1" onClick={handleClickEmployee}>
              <img src={create} alt="logo" height={15} /> 
            </Button>
          </Grid> */}

          {selectedLabel === "Overview" && (
            <Typography variant="Heading-head" noWrap>
              {selectedLabel && selectedLabel}
            </Typography>
          )}
          {selectedLabel === "Reports" && <Head />}
          {selectedLabel === "Combined Reports" && <CombinedReportHeader />}
          {selectedLabel === "Campaigns" && <CampaignHeader />}
          {selectedLabel === "New Campaigns" && 
           
            <CreateCampaignHeader />
          }
          {selectedLabel === "Creator" && (
            <Typography variant="Heading-head" noWrap>
              {selectedLabel && selectedLabel}
            </Typography>
          )}
          {selectedLabel === "Insights" && <InsightHeader />}

          {selectedLabel === "Settings" && (
            <Typography variant="Heading-head" noWrap>
              {selectedLabel && selectedLabel}
            </Typography>
          )}
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
        <List sx={{ padding: open ? "5px 5px" : "5px 0px"}}>
          {[
            "Overview",
            "Insights",
            "Reports",
            "Campaigns",
            "Creator",
            
          ].map((label, index) => (
            <ListItem
              key={index}
              disablePadding
              disabled={label !== "Overview" && isScraped !== 2}
              onClick={() => {
                if (isScraped === 2 || label === "Overview") {
                  handleNavigation(label);
                }
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,

                 
                  backgroundColor:
                    selectedLabel === label || label === "New Personas"
                      ? "#3b3bb81a"
                      : "white",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {getIcon(label)}
                </ListItemIcon>
               
                <ListItemText primary={ <Typography variant="SidebarText" style={{ color:
                    selectedLabel === label || label === "New Personas"
                      ? "#3b3bb6"
                      : "#000",}}>{label}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List sx={{ padding: open ? "5px 5px" : "5px 0px" }}>
          {/* {[`${companyName || "Company Name"}`].map(
            (label, index) => ( */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: selectedLabel === "Settings" ? "#3b3bb6" : "#000",
                backgroundColor:
                  selectedLabel === "Settings" ? "#3b3bb81a" : "white",
              }}
              // onClick={handleClickEmployee}
              onClick={() => handleNavigation("Settings")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <AiOutlineSetting
                  size={20}
                  color={selectedLabel === "Settings" ? "#3b3bb6" : "#000"}
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
              <Typography variant="SidebarText" style={{ color:
                    selectedLabel === "Settings" 
                      ? "#3b3bb6"
                      : "#000",}}> {companyName?.split(" ")?.map((word, index) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < companyName?.split(" ").length - 1 && <br />}
                  </React.Fragment>
                ))}</Typography> 
              </ListItemText>
            </ListItemButton>
          </ListItem>
          {/* )
          )} */}
        </List>

        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: selectedLabel === "Logout" ? "#3b3bb6" : "#000",
                  backgroundColor:
                    selectedLabel === "Logout" ? "#3b3bb81a" : "white",
                }}
                onClick={() => handleNavigation("Logout")}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <BiLogOut
                    size={20}
                    color={selectedLabel === "Logout" ? "#3b3bb6" : "#000"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="SidebarText" style={{ color:
                    selectedLabel === "Logout" 
                      ? "#3b3bb6"
                      : "#000",}}> Logout</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <LogoutPopUP
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleLogout={handleLogout}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarMenu;
