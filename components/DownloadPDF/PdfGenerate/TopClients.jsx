import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";

const TopClients = ({ company, competitors }) => {
  console.log(competitors)
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={4}>
          {company.map((item, index) => (
            <Box sx={{
              my: 4
            }}>
              <TableContent key={index} item={item} textColor="white" />
            </Box>
          ))}
        </Grid>
        {competitors.map((competitor, index) => (
          <Grid key={index} size={4}>
            {competitor.map((item, index) => (
              <Box sx={{
                my: 4
              }}>
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
