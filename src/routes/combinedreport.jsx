import { Grid, Divider } from "@mui/material";
import React from "react";
import Head from "../../components/CombinedReport/Head";
import MainCombinedReportComp from "../../components/CombinedReport/MainCombinedReportComp";

const Combinedreport = () => {
  return (
<Grid>
    
    <Grid item xs={12} >
      <MainCombinedReportComp/>
    </Grid>
</Grid>

)
}


export default Combinedreport;
