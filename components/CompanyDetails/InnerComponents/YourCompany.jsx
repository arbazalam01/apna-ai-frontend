import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useParams } from "react-router-dom";
import api from "@utils/api";

const YourCompany = ({ companyData, openNotificationWithIcon }) => {
  let { companyId } = useParams();

  const handleRefreshClick = async () => {
    try {
      openNotificationWithIcon("success");

      const apiUrl = "/customer/scrapdata";
      const response = await api.post(apiUrl, { companyId });
    } catch (error) {
      console.error("Error occurred while creating user:", error);
    }
  };

  return (
    <>
      <Grid pb={1.5}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item mb={1}>
            <Typography variant="AvgHeading">Your Company</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3.3}>
            <Typography variant="smallGreyHeading">Name</Typography>
          </Grid>
          <Grid item xs={8.7}>
            <Typography variant="caption1">
              {companyData.company.name}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={3.3}>
              <Typography variant="smallGreyHeading">Website URL</Typography>
            </Grid>
            <Grid item xs={8.7}>
              <Typography variant="caption1">
                {companyData.company.websiteUrl}
              </Typography>
            </Grid>
            <Grid item mt={2}>
          
              <Button variant="button2"  onClick={handleRefreshClick}>
              Refresh Report
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default YourCompany;
