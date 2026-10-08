import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import PaperComp from "../ReportSection/PaperComp";

const ProductServicesComponent = ({title,description}) => {
    // console.log("companyAbout", products)
  return (
    <>

      <Grid>
              {/* <PaperComp> */}
                <Grid
                  sx={{
                    p: "0rem 1rem 0.8rem 0rem"
                  }}>

                <Typography
                  variant="MainHeading"
                  
                  sx={{fontSize:"1.05rem", lineHeight: "0rem" }}
                  >
                  {title}
                </Typography>
                  </Grid>
                <Grid size={12}>
                {description?.map((item, index) => (
                  <Grid key={index}>
                <Typography  variant="personaValue" >
                {description ? `•  ${item}` : item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
    </>
  );
};

export default ProductServicesComponent;
