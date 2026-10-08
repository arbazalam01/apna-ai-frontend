import React from "react";
import { Box, Divider, Typography, Grid } from "@mui/material";


const Description = ({ companyAbout }) => {
  return (
    <>

      <Grid container direction="column" size={12}>
        <Grid>
          <Typography
            variant="caption"
            style={{ fontSize: "1.3rem", fontWeight: 600 }}
          >
            Company Description{" "}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="caption">
            {companyAbout?.about?.description}
          </Typography>
        </Grid>
      </Grid>

    </>
  );
};

export default Description;
