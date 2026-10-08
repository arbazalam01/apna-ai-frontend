import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import Name from "./Name";
import Description from "./Description";
import Vision from "./Vision";
import SocialAndWeb from "./SocialAndWeb";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { useSetAtom } from "jotai";
import { reportDrawer, reportDrawerOpen } from "@store/ReportStore";
import { Skeleton } from "antd";

const MainAboutDrawer = ({ title }) => {
  const setContent = useSetAtom(reportDrawer);
  const setOpen = useSetAtom(reportDrawerOpen);

  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton />;
  if (isError) return <div>Error: {error.message}</div>;
  const companyAbout = data?.company;
  const topTrends = data?.toptrends;

  return (
    <>

      <Grid >
        <Grid container>
          <Grid
            sx={{
              borderRight: "1px solid #0000001f",
              height: "calc(100vh - 14.7vh)",
              pt: 3
            }}
            size={3.5}>
            <Name companyAbout={companyAbout} topTrends={topTrends} />
          </Grid>
          <Grid
            sx={{
              pl: 4,
              pt: 3
            }}
            size={8}>
            <Description companyAbout={companyAbout} />
            <Vision companyAbout={companyAbout} />
          </Grid>
         
         
        </Grid>
      </Grid>
    </>
  );
};

export default MainAboutDrawer;
