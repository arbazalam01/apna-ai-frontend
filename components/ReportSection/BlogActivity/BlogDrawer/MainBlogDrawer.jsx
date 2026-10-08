import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import Name from "./Name";

import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import BlogComp from "./BlogComp";
import PaperComp from "../../PaperComp";
import { reportDrawer, reportDrawerOpen } from "@store/ReportStore";
import { useSetAtom } from "jotai";

const MainBlogDrawer = ({ title }) => {
  const setContent = useSetAtom(reportDrawer);
  const setOpen = useSetAtom(reportDrawerOpen);

  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyAbout = data.company;
  const topTrends = data.toptrends;

  return (
    <>

      <Grid container columnSpacing={2} sx={{
        p: 3
      }} >
        <Grid size={23}>

        
            <BlogComp />
     
        </Grid>
      </Grid>
    </>
  );
};

export default MainBlogDrawer;
