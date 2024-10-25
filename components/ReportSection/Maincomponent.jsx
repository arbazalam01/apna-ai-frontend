import React, { useState } from "react";

import { useMediaQuery, useTheme } from "@mui/material";
import { reportDrawer, reportDrawerOpen } from "@store/ReportStore";
import { useAtom } from "jotai";
import SummaryReport from "./SummaryReport";
import { summaryReportUI } from "../../store/ReportStore";
import DefaultReport from "./DefaultReport";



const Maincomponent = () => {

const [reportUI, setReportUI] = useAtom(summaryReportUI);



  return (
    <>
      
{ reportUI ===null || reportUI === "default"  ? <DefaultReport/>:<SummaryReport/>}

    </>
  );
};

export default Maincomponent;
