import { Typography, Divider, Grid, Box } from "@mui/material";
// import {  } from "antd";
import React, { useEffect, useState } from "react";
import CompanyData from "@components/CompanyDetails/CompanyData";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import MainCreateCampaignComp from "@components/CreateCampaign/MainCreateCampaignComp";
import { useNavigate, useParams } from "react-router-dom";

const backArrow = {
  // padding: "0.1rem",
  cursor: "pointer",
  // border: "1px solid #D2D2D2",
  // borderRadius: "50%",
  marginRight: "0.5rem",
};

const CreateCampaign = () => {
 

  return (
    <>
      <Grid container>
     
        <Grid size={12}>
          {/* <MainCombinedReportComp/> */}
          <MainCreateCampaignComp  />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateCampaign;
