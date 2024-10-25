import { Grid } from "@mui/material";

import React from "react";

import Persona from "./InnerComponent/Persona";
import Report from "./InnerComponent/Report";
import Campaign from "./InnerComponent/Campaign";

export default function Overview() {

  return (
    <>
      <Grid container height={"calc(100vh - 80px)"}>
        <Grid item lg={6} borderRight={"1px solid #D2D2D2"}>
          <Report /> {/* <Recommend/> */}
        </Grid>
        <Grid item xs={4.2}>
          {" "}
          <Campaign />{" "}
        </Grid>
      </Grid>

      {/* // </Grid> */}
    </>
  );
}
