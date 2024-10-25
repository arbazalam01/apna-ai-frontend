import React from "react";

import { Box, Grid, Typography, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Competitor = () => {
  return (
    <Box>
      <Grid>
        <Typography variant="caption8" lineHeight={"2.5rem"}>
          Tell us about your Competition
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="smallGreyHeading1">
          Our AI will analyse your competitors’ platforms to gather information
          about them and perform competitive analyses.{" "}
        </Typography>
      </Grid>
    </Box>
  );
};

export default Competitor;
