import { Box,Divider, Grid, Typography } from "@mui/material";
import Styles from "./Industries.module.css";

import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";

import { Skeleton } from "antd";

const SEO = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyTopSeo = data?.company?.topseos;
  return (
    <Box>
      <Typography variant="MainHeading">
        Top SEO Keywords
      </Typography>
      <Grid container direction="column" sx={{
        mt: 1
      }} >
        {companyTopSeo?.slice(0,6).map((item,index,array) => (
          <Grid
            sx={{
              mb: 1
            }}>
            <Typography variant="caption">{item.slice(0,29)}{item.length>29 && " ..."}</Typography><br/>
            {index !== array.length - 1 && <Divider />}

          </Grid>
        ))}

        <Grid>
          <Typography variant="caption">
          {companyTopSeo?.length>6 && <Typography variant="caption">{companyTopSeo.length-6}+ more</Typography>}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SEO;
