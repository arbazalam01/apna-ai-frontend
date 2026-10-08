import { Box,Divider, Grid, Typography } from "@mui/material";
import Styles from "./Clients.module.css";

import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";


const TopClients = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const TopClients = data?.company?.topclients;
  return (
    <Box>
      <Typography variant="MainHeading">
        Top Clients
      </Typography>
      <Grid container direction="column" sx={{
        mt: 1
      }} >
        {TopClients?.slice(0, 5).map((item,index,array) => (
          <Grid
            sx={{
              mb: 1
            }}>
            <Typography variant="caption">{item.slice(0,30)}{item.length>29 && " ..."}</Typography><br/>
            {index !== array.length - 1 && <Divider />}

          </Grid>
        ))}

        <Grid>
          <Typography variant="caption">
          {TopClients?.length>5 && <Typography variant="caption">{TopClients?.length-5}+ more</Typography>}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopClients;
