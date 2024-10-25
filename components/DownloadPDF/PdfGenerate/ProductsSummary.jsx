import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";

const Index = ({ company, competitors }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box my={4}>
            <TableContent item={company} textColor="white" />
          </Box>
        </Grid>
        {competitors?.map((competitor, index) => (
          <Grid item xs={4} key={index}>
            <Box my={4}>
              <TableContent item={competitor} textColor="white" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Index;
