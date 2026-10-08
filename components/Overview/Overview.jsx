import { Grid } from "@mui/material";

import React from "react";

import Persona from "./InnerComponent/Persona";
import Report from "./InnerComponent/Report";
import Campaign from "./InnerComponent/Campaign";

export default function Overview() {

  return (
    <>
      <Grid container sx={{
        height: "calc(100vh - 80px)"
      }}>
        <Grid
          sx={{
            borderRight: "1px solid #D2D2D2"
          }}
          size={{
            lg: 6
          }}>
          <Report /> {/* <Recommend/> */}
        </Grid>
        <Grid size={4.2}>
          {" "}
          <Campaign />{" "}
        </Grid>
      </Grid>

      {/* // </Grid> */}
    </>
  );
}
