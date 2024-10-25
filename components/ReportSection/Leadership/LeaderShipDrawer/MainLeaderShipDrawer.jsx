import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import {
  IconBrandLinkedin,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCopy,
  IconX,
} from "@tabler/icons-react";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { reportDrawer,reportDrawerOpen } from "@store/ReportStore";
import { useSetAtom } from "jotai";

import Component from "./Component";

const MainIndustriesDrawer = ({ title }) => {
 
  const setContent=useSetAtom(reportDrawer)
  const setOpen=useSetAtom(reportDrawerOpen)


  const companyId = useCompanyId();

  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyLeaderShip = data.company.leadership;

  return (
    <>
     
      <Grid >

      <Box>
        <>
        <Grid container columnSpacing={2} p={3}>
            <Grid container  p={"0rem 2rem 1rem 2rem"}>
              <Grid item xs={2} mt={2}>
              <Typography variant="h6" sx={{ fontSize:"0.9rem", fontWeight: "500", color:"grey" }}>
                  NAME
                </Typography>
              </Grid>
              <Grid item xs={4} mt={2}>
              <Typography variant="h6" sx={{ fontSize:"0.9rem", fontWeight: "500", color:"grey" }}>
                  DESIGNATION
                </Typography>
              </Grid>
              <Grid item xs={6} mt={2}>
              <Typography variant="h6" sx={{ fontSize:"0.9rem", fontWeight: "500", color:"grey" }}>
                  LINKEDIN PROFILE
                </Typography>
              </Grid>
            </Grid>
            {/* <Divider sx={{ my: 2 }} /> */}

            {companyLeaderShip?.map((core, index, array) => {
              return (<>
                <Grid container p={"0rem 1rem 1rem 2rem"}>
                  <Grid item xs={2} >
                  <Typography variant="h6" sx={{ fontSize:"0.92rem", fontWeight: "500", }}>
                      {core.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} >
                  <Typography variant="h6" sx={{ fontSize:"0.9rem", fontWeight: "300" }}>
                      {core.designation}
                    </Typography>
                  </Grid>
                  <Grid item xs={5.5} >
                  <Typography variant="h6" sx={{ fontSize:"0.8rem", fontWeight: "400",color:"grey",backgroundColor:"#e6e6e6", padding:"0.5rem 1rem",borderRadius:"0.41rem",display:"flex",alignItems:"center" }}>
                      {/* <IconCopy size={15}/> */}
                      <IconBrandLinkedin size={25} stroke={"blue"} color="white" fill="blue"/>
                       &nbsp; {core.linkedin}
                    </Typography>
                  </Grid>
                </Grid>
                  <Divider />

              </>
              );
            })}
          </Grid>
        </>
      </Box>
      </Grid>

    </>
  );
};

export default MainIndustriesDrawer;
