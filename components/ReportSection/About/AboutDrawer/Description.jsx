import React from "react";
import { Box, Divider, Typography, Grid } from "@mui/material";


const Description = ({ companyAbout }) => {
  return (
    <>

        <Grid item xs={12} container direction="column">
          <Grid item >
            <Typography
              variant="caption"
              style={{ fontSize: "1.3rem", fontWeight: 600 }}
            >
              Company Description{" "}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {companyAbout?.about?.description}
            </Typography>
          </Grid>
        </Grid>

    </>
  );
};

export default Description;
