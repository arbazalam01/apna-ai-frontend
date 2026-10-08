import React from "react";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const InsightHeader = () => {

  return (
    <Grid
      container
      sx={{
        bgcolor: "#fff",
        alignItems: "center"
      }}>
      <Grid
        sx={{
          bgcolor: "transparent"
        }}
        size={6}>
        <Typography variant="Heading-head">User Segmentation</Typography>
      </Grid>
    </Grid>
  );
};

export default InsightHeader;