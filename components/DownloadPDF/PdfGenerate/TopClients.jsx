import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";

const TopClients = ({ company, competitors }) => {
  console.log(competitors)
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {company.map((item, index) => (
            <Box my={4}>
              <TableContent key={index} item={item} textColor="white" />
            </Box>
          ))}
        </Grid>
        {competitors.map((competitor, index) => (
          <Grid item xs={4} key={index}>
            {competitor.map((item, index) => (
              <Box my={4}>
                <TableContent
                  key={index}
                  item={item}
                  textColor="white"
                  // isBlur
                />
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TopClients;
