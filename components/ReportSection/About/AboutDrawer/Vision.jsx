import React from "react";
import { Box, Divider, Typography, Grid } from "@mui/material";
import PaperComp from "../../PaperComp";

const Vision = ({ companyAbout }) => {
  return (
    <>

        <Grid item xs={12} container direction="column">
          <Grid item mt={2}>
            <Typography
              variant="caption"
              style={{ fontSize: "1.3rem", fontWeight: 600 }}
            >
              Mission
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {companyAbout?.about?.mission}
            </Typography>
          </Grid>
        </Grid>

    </>
  );
};

export default Vision;
