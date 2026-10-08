import { Typography, Divider, Grid, Box } from "@mui/material";
// import {  } from "antd";
import React from "react";
import CompanyData from "@components/CompanyDetails/CompanyData";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { useNavigate, useParams } from "react-router-dom";


const backArrow = {
    // padding: "0.1rem",
    cursor: "pointer",
    // border: "1px solid #D2D2D2",
    // borderRadius: "50%",
    color:"#000",
    marginRight: "0.5rem",
  };
const CreateCampaignHeader = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(-1);
    }
  return (
    <Grid
      container
      sx={{
        zIndex: 10,
        flexDirection: "row",
        justifyContent: "space-between",

        // paddingY: 3.3,
        alignItems: "center"
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center"
        }}>
        {/* <Typography
            sx={{ fontSize: "1.6rem", fontWeight: "500",cursor:"pointer" }}
            onClick={handlenavigate}
          >
            Target Persona
          </Typography>
          &nbsp; */}
        <IconChevronLeft
          onClick={handleNavigate}
          size={35}
          style={backArrow}
        />
        &nbsp;
        <Typography variant="Heading-head">New Campaign</Typography>
      </Box>
    </Grid>
  );
}

export default CreateCampaignHeader