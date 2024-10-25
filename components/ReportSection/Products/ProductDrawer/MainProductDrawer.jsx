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

const MainProductDrawer = ({ title }) => {
  const setContent = useSetAtom(reportDrawer);
  const setOpen = useSetAtom(reportDrawerOpen);
  const [open, sethandleOpen] = useState({
    products: true,
    services: true,
  });

  const handleProductsOpen = () => {
    sethandleOpen((prev) => ({ ...prev, products: !prev.products }));
  };

  const handleServicesOpen = () => {
    sethandleOpen((prev) => ({ ...prev, services: !prev.services }));
  };
  const companyId = useCompanyId();

  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyAbout = data.company;

  return (
    <>
      <Grid>
        <Box>
          <Grid
            container
            alignItems={"center"}
            p={"1rem 0rem 0rem 1.5rem"}
            sx={{ cursor: "pointer" }}
            onClick={handleProductsOpen}
          >
            {open.products ? (
              <IconChevronDown />
            ) : (
              <IconChevronRight/>
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
              Products
            </Typography>
          </Grid>
          {open.products && (
            <>
              <Grid container columnSpacing={2} p={"0rem 2rem 1rem 2rem"}>
                {companyAbout?.products.map((product, index, array) => {
                  console.log("PRODUCT", product);
                  return (
                    <Grid item xs={4} mt={2}>
                      <Component
                        name={product?.name}
                        description={product?.description}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box>
          <Grid container alignItems={"center"} p={"0rem 0rem 0rem 1.5rem"} sx={{ cursor: "pointer" }} onClick={handleServicesOpen}>
            {open.services ? (
              <IconChevronDown />
            ) : (
              <IconChevronRight  />
            )}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={{ fontSize: "1.25rem", fontWeight: "600" }}>
              Services
            </Typography>
          </Grid>

          {open.services && (
            <Grid container columnSpacing={2} p={"0rem 2rem 2rem 2rem"}>
              {companyAbout?.services.map((services, index, array) => {
                return (
                  <Grid item xs={4} mt={2}>
                    <Component
                      name={services?.name}
                      description={services?.description}
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

export default MainProductDrawer;
