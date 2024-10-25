import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          // borderColor: "#EBEBEB",
          // margin:'0.5rem 0rem 0.75rem 0rem'
          // width: "100%",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FFFFFF",
        },
      },
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       // border: '1px solid #D9D9D9',
    //       cursor: 'pointer',
    //       padding: '0.5rem 0.9rem 1rem 0.9rem',
    //       borderRadius: '15px',
    //       minHeight: '17.5rem',
    //       boxShadow: 'none',
    //       '&:hover': {
    //         // boxShadow: '0px 0px 30px 1px #e6e6e6',
    //       },
    //     },
    //   },

    // },

    // MuiSelect: {
    //   styleOverrides: {
    //     root: {
    //       width: "55%",

    //       backgroundColor: "#f0f0f0", // Set background color to light grey
    //       color: "#000",
    //       padding: "12px 12px", // Adjust padding to decrease height
    //       height: "40px", // Set font color to black
    //       "& .MuiSelect-outlined": {
    //         border: "none", // Remove the border
    //       },
    //       "&:focus": {
    //         borderRadius: 0,
    //         // Ensure focus styling matches without underline
    //       },
    //       "& .MuiOutlinedInput-notchedOutline": {
    //         border: "none", // Remove the outline
    //       },
    //     },

    //     select: {
    //       width: "100%",

    //       "&:focus": {
    //         height: "0px", // Set font color to black

    //         borderRadius: 0, // Ensure focus styling matches without underline
    //       },
    //     },
    //   },
    // },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#e5e7e7", // Set hover background color
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // backgroundColor: 'red',
          margin: "0rem",
          // color: "#fe4c1c !important",
          // padding: '1rem',
          borderRadius: "11px",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "button1" },
          style: {
            color: "#FFFFFF",
            backgroundColor: "#3B3BB6",
            textTransform: "none",
            padding: "0.5rem 1.6rem",
            // display: "flex",
            alignItems: "center",
            boxShadow: "1px 1px 5px 1px #d2d2d2",
            // gap: "0.5rem",
            "&:hover": {
              backgroundColor: "#252f3e", // Custom hover color
            },
          },
        },
        {
          props: { variant: "button2" },
          style: {
            color: "#242842",
            fontSize: "0.9rem",

            backgroundColor: "#F0F0F8",
            textTransform: "none",
            padding: "0.5rem 1.6rem",
            // display: "flex",
            borderRadius: "0.4rem",
            alignItems: "center",
            // gap: "0.5rem",
            "&:hover": {
              backgroundColor: "#E1E1F1", // Custom hover color
            },
          },
        },
        {
          props: { variant: "button3" },
          style: {
            color: "#757575",

            fontSize: "0.9rem",
            backgroundColor: "white",
            textTransform: "none",
            padding: "0.5rem 1.2rem",
            borderRadius: "0.4rem",
            border: "1px solid #c0c0c0" /* Add border style and width */,
            alignItems: "center",
            
          },
        },
       
          {
            props: { variant: "button4" },
            style: {
              color: "#3B3BB6",
              backgroundColor: "#fff",
              textTransform: "none",
              padding: "0.15rem 0.4rem",
              // display: "flex",
              alignItems: "center",
              // boxShadow: "1px 1px 5px 1px #d2d2d2",
              border: "1px solid " /* Add border style and width */,
              // gap: "0.5rem",
              "&:hover": {
                backgroundColor: "#F0F0F8", // Custom hover color
              },
            },
          },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Figtree",
        },
      },
      variants: [
        {
          props: { variant: "SidebarText" },
          style: {
            color: "#000000",
            fontSize: "1.02rem",
            fontWeight: "500",
           
          },
        },
        {
          props: { variant: "MainHeading" },
          style: {
            color: "#000000",
            fontSize: "1.4rem",
            lineHeight: "3rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "AvgHeading" },
          style: {
            color: "#3a3939",
            fontSize: "1.3rem",
            lineHeight: "3rem",
            fontWeight: "600",
          },
        },

        {
          props: { variant: "AvgHeading-1" },
          style: {
            color: "#3a3939",
            fontSize: "1.1rem",
            lineHeight: "3rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "AvgHeading1" },
          style: {
            color: "#3a3939",
            fontSize: "1.3rem",
            lineHeight: "1.7rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "AvgHeading2" },
          style: {
            color: "#3a3939",
            fontSize: "1.5rem",
            lineHeight: "1.6rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "Heading" },
          style: {
            color: "#000000",
            fontSize: "1.7rem",
            lineHeight: "3rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "Heading-head" },
          style: {
            color: "#3a3939",
            fontSize: "1.8rem",
            // lineHeight: "3rem",
            fontWeight: "600",
          },
        },
        ,
        {
          props: { variant: "smallGreyHeading" },
          style: {
            color: "#999999",
            fontSize: "0.82rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "smallGreyHeading1" },
          style: {
            color: "#999999",
            fontSize: "0.95rem",
            fontWeight: "500",
          },
        },

        {
          props: { variant: "smallGreyHeading2" },
          style: {
            color: "#717070",
            fontSize: "0.81rem",
            fontWeight: "500",
          },
        },

        {
          props: { variant: "caption" },
          style: {
            color: "#000000",
            fontSize: "0.87rem",
            // lineHeight: "1.3rem",
            fontWeight: "300",
          },
        },
        {
          props: { variant: "caption1" },
          style: {
            color: "#686868",
            fontSize: "0.82rem",
            lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "caption1-1" },
          style: {
            color: "#686868",
            fontSize: "0.85rem",
            lineHeight: "1.3rem",
            fontWeight: "400",
          },
        },
        {
          props: { variant: "caption2" },
          style: {
            color: "#000000",
            fontSize: "0.9rem",
            lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "caption3" },
          style: {
            color: "#999999",
            fontSize: "0.75rem",
            // lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "caption4" },
          style: {
            color: "#4c4c4c",
            fontSize: "0.83rem",
            // lineHeight: "1.3rem",
            fontWeight: "400",
          },
        },
        {
          props: { variant: "caption5" },
          style: {
            color: "#8e8e8e",
            fontSize: "0.83rem",
            // lineHeight: "1.3rem",
            fontWeight: "400",
          },
        },
        {
          props: { variant: "caption6" },
          style: {
            color: "#000000",
            fontSize: "1.2rem",
            lineHeight: "2rem",
            fontWeight: "300",
          },
        },
        {
          props: { variant: "caption6-1" },
          style: {
            color: "#000000",
            fontSize: "1.1rem",
            lineHeight: "2rem",
            fontWeight: "300",
          },
        },
        {
          props: { variant: "caption7" },
          style: {
            color: "#000000",
            fontSize: "0.93rem",
            // lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "caption8" },
          style: {
            color: "#000000",
            fontSize: "1.1rem",
            // lineHeight: "2rem",
            fontWeight: "500",
          },
        },{
          props: { variant: "caption9" },
          style: {
            color: "#000000",
            fontSize: "1.1rem",
            // lineHeight: "2rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "insightsHead" },
          style: {
            color: "#000000",
            fontSize: "1.05rem",
            // lineHeight: "2rem",
            fontWeight: "400",
          },
        },
        {
          props: { variant: "insightsText" },
          style: {
            color: "#000000",
            fontSize: "1.6rem",
            lineHeight: "0rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "campaignDate" },
          style: {
            color: "#757575",
            fontSize: "0.87rem",
            lineHeight: "2.5rem",
            fontWeight: "500",
          },
        },{
          props: { variant: "campaignTitle" },
          style: {
            color: "#3a3939",
            fontSize: "0.9rem",
            lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "campaignDescription" },
          style: {
            color: "#757575",
            fontSize: "0.9rem",
            lineHeight: "1.2rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "personaName" },
          style: {
            color: "#353535",
            fontSize: "0.94rem",
            // lineHeight: "1.3rem",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "personaValue" },
          style: {
            color: "#757575",
            fontSize: "0.92rem",
            lineHeight: "1.35rem",
            // fontWeight: "100",
            // wordSpacing: "0.1rem",
            letterSpacing: "0.02rem",
          },
        },
        
        {
          props: { variant: "persona-head" },
          style: {
            color: "#3a3939",
            fontSize: "1.2rem",
            lineHeight: "1.5rem",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "persona-text" },
          style: {
            color: "#3a3939",
            fontSize: "1rem",
            // lineHeight: "3rem",
            fontWeight: "400",
          },
        },
        {
          props: { variant: "combinedDesc" },
          style: {
            color: "#606060",
            fontSize: "0.91rem",
            lineHeight: "1.4rem",
            // fontWeight: "200 !important",
            // wordSpacing: "0.1rem",
            letterSpacing: "0.02rem",
          },
        },
      ],
    },
    // MuiListItemButton:{
    //   styleOverrides:{
    //     root:{
    //       padding: '0rem',

    //       margin: '0rem',

    //     }
    //   }
    // },
  },
  typography: {
    fontFamily: "Figtree",
    h1: {
      textTransform: "none",
    },
    h2: {
      textTransform: "none",
    },
    h3: {
      textTransform: "none",
    },
  },
});

const MUITheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUITheme;
