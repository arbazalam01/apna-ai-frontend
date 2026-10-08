import React from "react";
import { Box, Divider, Typography, Grid } from "@mui/material";
import PaperComp from "../../PaperComp";

const Vision = ({ companyAbout }) => {
  return (
    <>

      <Grid container direction="column" size={12}>
        <Grid
          sx={{
            mt: 2
          }}>
          <Typography
            variant="caption"
            style={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
            Mission
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="caption">
            {companyAbout?.about?.mission}
          </Typography>
        </Grid>
      </Grid>

    </>
  );
};

export default Vision;
