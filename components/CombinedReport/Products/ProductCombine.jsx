import { Divider, Grid, Typography } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import Component from "../Component";
import ProductServicesComponent from "../ProductServicesComponent";

const ProductCombine = ({ companyData }) => {
  const [open, setHandleOpen] = useState({
    products: false,
    services: false,
  });
  const handleOpen = (section) => {
    setHandleOpen({ ...open, [section]: !open[section] });
  };
  const testStyle = {
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "400",
  };

  return (
    <>
      <Grid container sx={12} columnSpacing={2}>
        {/* PRODUCTS */}
        <Grid container alignItems="center" p="0rem 3rem" >
          {open.products ? (
            <IconChevronDown onClick={() => handleOpen("products")} />
          ) : (
            <IconChevronRight onClick={() => handleOpen("products")} />
          )}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle} onClick={() => handleOpen("products")}>
            Products
          </Typography>
        </Grid>

        <Grid item xs={4}>
          {open.products &&
            companyData?.company?.products?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                </>
              );
            })}
        </Grid>

        <Grid item xs={4}>
          {open.products &&
            companyData?.competitors[0]?.products?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                  {/* <Component title="Mission/Vision/Values" description={value?.about?.mission}/> */}
                </>
              );
            })}
        </Grid>

        <Grid item xs={4}>
          {open.products &&
            companyData?.competitors[1]?.products?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                  {/* <Component title="Mission/Vision/Values" description={value?.about?.mission}/> */}
                </>
              );
            })}
        </Grid>


        {/* SERVICES */}
        <Grid container alignItems="center" p="0rem 3rem" mt={2} mb={2}>
          {open.services ? (
            <IconChevronDown onClick={() => handleOpen("services")} />
          ) : (
            <IconChevronRight onClick={() => handleOpen("services")} />
          )}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle} onClick={() => handleOpen("services")}>
            Services
          </Typography>
        </Grid>

        <Grid item xs={4}>
          {open.services &&
            companyData?.company?.services?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                </>
              );
            })}
        </Grid>

        <Grid item xs={4}>
          {open.services &&
            companyData?.competitors[0]?.services?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                  {/* <Component title="Mission/Vision/Values" description={value?.about?.mission}/> */}
                </>
              );
            })}
        </Grid>

        <Grid item xs={4}>
          {open.services &&
            companyData?.competitors[1]?.services?.map((value) => {
              return (
                <>
                  <ProductServicesComponent
                    title={value?.name}
                    description={value?.description}
                  />
                  <br />
                  {/* <Component title="Mission/Vision/Values" description={value?.about?.mission}/> */}
                </>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductCombine;
