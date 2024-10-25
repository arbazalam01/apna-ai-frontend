import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useCompanyCompetitor from "@hooks/useCompanyCompetitor";
import Loader from "@components/Loader";
import UploadSales from "@components/SalesInsight/UploadSales";
import InsightData from "@components/SalesInsight/InsightData";

const DataInsights = () => {
  const { companyId } = useParams();
  const { data, error, isLoading, isError } = useCompanyCompetitor(companyId);

  if (isLoading) return <Loader />;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={6}>
        <UploadSales />
      </Grid>
      <Grid>
        <InsightData />
      </Grid>
    </Grid>
  );
};

export default DataInsights;
