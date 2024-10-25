import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";

const ProductsAndServices = ({ company, competitors }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {company?.map((item, index) => (
            <Box my={4}>
              <TableContent key={index} item={item} textColor="white" />
            </Box>
          ))}
        </Grid>
        {competitors?.map((competitor, index) => (
          <Grid item xs={4} key={index}>
            {competitor.map((item, index) => {
              return (
                <Box my={4}>
                  <TableContent
                    key={index}
                    item={item}
                    textColor="white"
                    // isBlur={index > 0}
                  />
                </Box>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsAndServices;
