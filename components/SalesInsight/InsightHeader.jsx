import React from "react";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const InsightHeader = () => {

  return (
    <Grid container bgcolor={"#fff"} alignItems="center">
      <Grid item xs={6} bgcolor={"transparent"}>
        <Typography variant="Heading-head">Segment Insights</Typography>
      </Grid>
    </Grid>
  );
};

export default InsightHeader;