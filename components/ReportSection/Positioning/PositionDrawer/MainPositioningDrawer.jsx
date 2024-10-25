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
import { reportDrawer, reportDrawerOpen } from "@store/ReportStore";
import { useSetAtom } from "jotai";

import Component from "./Component";

const MainPositioningDrawer = ({ title }) => {
  const setContent = useSetAtom(reportDrawer);
  const setOpen = useSetAtom(reportDrawerOpen);

  const [open, sethandleOpen] = useState({
    purpose: true,
    positioning: true,
    differentiators: true,
    brand: true,
  });

  const handlePurposeOpen = () => {
    sethandleOpen((prev) => ({ ...prev, purpose: !prev.purpose }));
  };

  const handlePositioningOpen = () => {
    sethandleOpen((prev) => ({ ...prev, positioning: !prev.positioning }));
  };
  const handleDifferentiatorOpen = () => {
    sethandleOpen((prev) => ({
      ...prev,
      differentiators: !prev.differentiators,
    }));
  };
  const handleBrandOpen = () => {
    sethandleOpen((prev) => ({ ...prev, brand: !prev.brand }));
  };

  const companyId = useCompanyId();

  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyPosition = data.company.marketposition;
  console.log("companyPosition", companyPosition);

  return (
    <>
      <Grid>
        <Box>
          <Grid
            container
            alignItems={"center"}
            p={"1rem 0rem 0rem 1.5rem"}
            onClick={handlePurposeOpen}
          >
            {open.purpose ? <IconChevronDown /> : <IconChevronRight />}
            &nbsp;&nbsp;&nbsp;
            {companyPosition?.corepurpose && (
              <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
                Core Purpose
              </Typography>
            )}
          </Grid>
          {open.purpose && (
            <>
              <Grid container columnSpacing={2} p={"0rem 2rem 1rem 2rem"}>
                {companyPosition?.corepurpose?.map((core, index, array) => {
                  return (
                    <Grid item xs={4} mt={2}>
                      <Component
                        name={core.name}
                        description={core.description}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Positioning */}
        <Box>
          <Grid
            container
            alignItems={"center"}
            p={"0rem 0rem 0rem 1.5rem"}
            onClick={handlePositioningOpen}
          >
            {open.positioning ? <IconChevronDown /> : <IconChevronRight />}
            &nbsp;&nbsp;&nbsp;
            {companyPosition?.positioning && (
              <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
                Positioning
              </Typography>
            )}
          </Grid>

          {open.positioning && (
            <Grid container columnSpacing={2} p={"0rem 2rem 2rem 2rem"}>
              {companyPosition?.positioning?.map((position, index, array) => {
                return (
                  <Grid item xs={4} mt={2}>
                    <Component
                      name={position.name}
                      description={position.description}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Differentiator */}
        <Box>
          <Grid
            container
            alignItems={"center"}
            p={"0rem 0rem 0rem 1.5rem"}
            onClick={handleDifferentiatorOpen}
          >
            {open.differentiators ? <IconChevronDown /> : <IconChevronRight />}
            &nbsp;&nbsp;&nbsp;
            {companyPosition?.keydifferentiators && (
              <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
                Key Differentiators
              </Typography>
            )}
          </Grid>

          {open.differentiators && (
            <Grid container columnSpacing={2} p={"0rem 2rem 2rem 2rem"}>
              {companyPosition?.keydifferentiators?.map(
                (diferentiator, index, array) => {
                  return (
                    <Grid item xs={4} mt={2}>
                      <Component
                        name={diferentiator.name}
                        description={diferentiator.description}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* Brand Personality */}
        <Box>
          <Grid
            container
            alignItems={"center"}
            p={"0rem 0rem 0rem 1.5rem"}
            onClick={handleBrandOpen}
          >
            {open.brand ? <IconChevronDown /> : <IconChevronRight />}
            &nbsp;&nbsp;&nbsp;
            {companyPosition?.brandpersonality && (
              <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
                Brand Personality
              </Typography>
            )}
          </Grid>

          {open.brand && (
            <Grid container columnSpacing={2} p={"0rem 2rem 2rem 2rem"}>
              {companyPosition?.brandpersonality?.map((brand, index, array) => {
                return (
                  <Grid item xs={4} mt={2}>
                    <Component
                      name={brand.name}
                      description={brand.description}
                    />
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

export default MainPositioningDrawer;
