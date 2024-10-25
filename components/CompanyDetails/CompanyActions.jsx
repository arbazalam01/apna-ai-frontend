import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconDots } from "@tabler/icons-react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 140,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow: "0px 0px 30px 1px #d2d2d2",
    "& .MuiMenu-list": {
      padding: "5px 0",
    },
    "& .MuiMenuItem-root": {
      backgroundColor: "transparent", // Ensure no default background color
      fontSize: "0.85rem",

      "& .MuiSvgIcon-root": {
        fontSize: 15,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        color: "#000",
      },
      "&:active": {
        // backgroundColor: alpha(
        //   theme.palette.primary.main,
        //   theme.palette.action.selectedOpacity
        // ),
      },
    },
  },
}));
const StyledIconDots = styled(IconDots)`
  color: #d2d2d2;
  &:hover {
    color: #000;
  }
`;
const StyledMenuItem = styled(MenuItem)`
  &:hover {
    color: #fe4c1c !important;
  }
`;

export default function CompanyActions(
  {

    handleDelete,
    assetId
    // handleCampaignView,
    // handleDownloadCampaign,
  }
) {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl();
  };

  return (
    <div>
      {/* add hover effect on icon dot */}
      <StyledIconDots
        size={"1.3rem"}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      />

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={() => {handleClose();
          handleCampaignView(calendarId)}} >
          View Details
        </MenuItem> */}
        {/* <FileCopyIcon /> */}
        {/* <MenuItem onClick={handleClose} disableRipple>
          Edit Campaign
        </MenuItem> */}
      
        {/* <ArchiveIcon /> */}
        <MenuItem
          disabled
          onClick={() => {
            handleClose();
            // handleDownloadCampaign(calendarId);
          }}
        >
          Download 
        </MenuItem>
        <StyledMenuItem
          
          onClick={() => {
            handleClose();
            handleDelete(assetId)
          }}
        >
          {/* <MoreHorizIcon /> */}
          Delete 
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
