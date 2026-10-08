import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import PaperComp from "../../PaperComp";

const Component = ({name,description}) => {
    // console.log("companyAbout", products)
  return (
    <>

      <Grid>
              <PaperComp>
                <Grid
                  sx={{
                    p: "1rem 1rem 0rem 0rem"
                  }}>

                <Typography
                  variant="MainHeading"
                  
                  sx={{fontSize:"1.1rem", lineHeight: "1.7rem" }}
                  >
                  {name}
                </Typography>
                  </Grid>
                <br />
                <Typography variant="caption" sx={{fontSize:"0.9rem"}}>{description}</Typography>
              </PaperComp>
            </Grid>
    </>
  );
};

export default Component;
