import { Box,Divider, Grid, Typography } from "@mui/material";
import Styles from "./Products.module.css";

import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";


const ProductsAndServices = () => {
  // const companyId = useCompanyId();
  // const { data, error, isLoading, isError } = useCompanyData(companyId);
  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;

  // const companyProducts = data.company.products;
  // const companyServices = data.company.services;

  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyProducts = data?.company?.products;
  const companyServices = data?.company?.services;

  return (
    <Grid container>
      {/* Title  */}
      <Grid>
        <Typography variant="MainHeading">Products & Services</Typography>
      </Grid>

      {/* Company Name and description  */}
      <Grid container>
        <Grid container direction="column" size={6}>
          <Grid>
            <Typography className={Styles.product_heading}>Products</Typography>
          </Grid>
          {companyProducts?.slice(0, 4).map((product, index,array) => (
            <Grid
              key={index}
              sx={{
                mb: 1
              }}>
              <Typography variant="caption">{product?.name.slice(0,24)} {product?.name.length>24 && " ..."}</Typography>
              {index !== array?.length - 1 && <Divider />}
            </Grid>
          ))}
            {companyProducts?.length>4 && <Typography variant="caption">{companyProducts?.length-4}+ more</Typography>}

        </Grid>
        <Grid container direction="column" size={6}>
          <Grid>
          <Typography className={Styles.product_heading}>Services</Typography>
          </Grid>
          {companyServices?.slice(0, 4).map((service, index, array) => (
  <Grid
    key={index}
    sx={{
      mb: 1
    }}>
    <Typography variant="caption">{service?.name.slice(0,25)}{service?.name.length>25 && " ..."} </Typography>
    {index !== array?.length - 1 && <Divider />}
  </Grid>
))}            
{companyServices?.length>4 && <Typography variant="caption">{companyServices?.length-4}+ more</Typography>}


          <Grid>
            <Typography variant="caption">
              {/* +5 more */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductsAndServices;
