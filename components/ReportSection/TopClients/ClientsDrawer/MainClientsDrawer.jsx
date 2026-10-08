import React, { useState } from "react";
import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import {
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



const MainClientsDrawer = ({ title }) => {



  const setContent=useSetAtom(reportDrawer)
  const setOpen=useSetAtom(reportDrawerOpen)
 


  const companyId = useCompanyId();

  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyIndustries = data.company.topclients;

  return (
    <>

      <Grid>

            <Box>
              

                  <Grid container column columnSpacing={2} sx={{
                    p: "2rem 1rem 1rem 2rem"
                  }}>
        {companyIndustries?.map((core, index) => (
          <Grid key={index}>
            <Typography sx={{
              mb: 2
            }}>
              <Chip label={core} size="medium" variant="outlined" sx={{ fontSize:"0.9rem", fontWeight: "500",padding:"0rem 0.8rem" }} />
            </Typography>
      </Grid>
        ))}
        </Grid>
              
            </Box>
        </Grid>
    </>
  );
};

export default MainClientsDrawer;
