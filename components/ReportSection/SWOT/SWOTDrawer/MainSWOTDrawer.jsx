import React, { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { reportDrawer,reportDrawerOpen } from "@store/ReportStore";
import { useSetAtom } from "jotai";


import Component from "./Component";

const MainSWOTDrawer = ({ title }) => {
  const [open, sethandleOpen] = useState({
    strengths: true,
    weaknesses: true,
    opportunities: true,
    threats : true

  });

  const handlePurposeOpen = () => {
    sethandleOpen(prev => ({ ...prev, strengths: !prev.strengths }));
  }
  
  const handlePositioningOpen = () => {
    sethandleOpen(prev => ({ ...prev, weaknesses: !prev.weaknesses }));
  }
  const handleDifferentiatorOpen = () => {
    sethandleOpen(prev => ({ ...prev, opportunities: !prev.opportunities }));
  }
  const handleBrandOpen = () => {
    sethandleOpen(prev => ({ ...prev, threats: !prev.threats }));
  }


  const companyId = useCompanyId();


  const setContent=useSetAtom(reportDrawer)
  const setOpen=useSetAtom(reportDrawerOpen)

  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companySWOT = data.company.swotanalysis;
  console.log("companySWOT", companySWOT)

  return (
    <>
      <Grid>

       <Box>
         <Grid
           container
           sx={{
             alignItems: "center",
             p: "1rem 0rem 0rem 1.5rem"
           }}>
           {open.strengths ? (
             <IconChevronDown onClick={handlePurposeOpen} />
           ) : (
             <IconChevronRight onClick={handlePurposeOpen} />
           )}
           &nbsp;&nbsp;&nbsp;
           {companySWOT?.strengths &&
           <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
           Strengths
           </Typography>
             }
         </Grid>
         {open.strengths && (
           <>
             <Grid container columnSpacing={2} sx={{
               p: "0rem 2rem 1rem 2rem"
             }}>
               {companySWOT?.strengths?.map((core, index, array) => {
                 return (
                   <Grid
                     sx={{
                       mt: 2
                     }}
                     size={4}>
                     <Component name={core.name} description={core.description}/>
                   </Grid>
                 );
               })}
             </Grid>
           </>
         )}
       </Box>
       <Divider sx={{my:2}} />

 {/* Positioning */}
       <Box>
         <Grid
           container
           sx={{
             alignItems: "center",
             p: "0rem 0rem 0rem 1.5rem"
           }}>
           {open.weaknesses ? (
             <IconChevronDown onClick={handlePositioningOpen} />
           ) : (
             <IconChevronRight onClick={handlePositioningOpen} />
           )}
           &nbsp;&nbsp;&nbsp;
           {companySWOT?.weaknesses &&
           <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
           Weaknesses
           </Typography>
             }
         </Grid>

         {open.weaknesses && (
           <Grid container columnSpacing={2} sx={{
             p: "0rem 2rem 2rem 2rem"
           }}>
             {companySWOT?.weaknesses?.map((position, index, array) => {
               return (
                 <Grid
                   sx={{
                     mt: 2
                   }}
                   size={4}>
                   <Component name={position.name} description={position.description}/>
                 </Grid>
               );
             })}
           </Grid>
         )}
       </Box>
       <Divider sx={{my:2}} />

       {/* Differentiator */}
       <Box>
         <Grid
           container
           sx={{
             alignItems: "center",
             p: "0rem 0rem 0rem 1.5rem"
           }}>
           {open.opportunities ? (
             <IconChevronDown onClick={handleDifferentiatorOpen} />
           ) : (
             <IconChevronRight onClick={handleDifferentiatorOpen} />
           )}
           &nbsp;&nbsp;&nbsp;
           {companySWOT?.opportunities &&
           <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
           Opportunities
           </Typography>
             }
         </Grid>

         {open.opportunities && (
           <Grid container columnSpacing={2} sx={{
             p: "0rem 2rem 2rem 2rem"
           }}>
             {companySWOT?.opportunities?.map((diferentiator, index, array) => {
               return (
                 <Grid
                   sx={{
                     mt: 2
                   }}
                   size={4}>
                   <Component name={diferentiator.name} description={diferentiator.description}/>
                 </Grid>
               );
             })}
           </Grid>
         )}
       </Box>
       <Divider sx={{my:2}} />
 {/* Brand Personality */}
       <Box>
         <Grid
           container
           sx={{
             alignItems: "center",
             p: "0rem 0rem 0rem 1.5rem"
           }}>
           {open.threats ? (
             <IconChevronDown onClick={handleBrandOpen} />
           ) : (
             <IconChevronRight onClick={handleBrandOpen} />
           )}
           &nbsp;&nbsp;&nbsp;
           {companySWOT?.threats &&
           <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
          Threats
           </Typography>
             }
         </Grid>

         {open.threats && (
           <Grid container columnSpacing={2} sx={{
             p: "0rem 2rem 2rem 2rem"
           }}>
             {companySWOT?.threats?.map((brand, index, array) => {
               return (
                 <Grid
                   sx={{
                     mt: 2
                   }}
                   size={4}>
                   <Component name={brand.name} description={brand.description}/>
                 </Grid>
               );
             })}
           </Grid>
         )}
       </Box>
         </Grid>
    </>
  );
};

export default MainSWOTDrawer;
