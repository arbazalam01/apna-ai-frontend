import { Box,Divider, Grid, Typography } from "@mui/material";
import Styles from "./Industries.module.css";

import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";


const Industries = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyIndustries = data?.company?.industries;
  return (
    <Box>
      <Typography variant="MainHeading">
        Target Audience
      </Typography>
      <Grid container direction="column" mt={1} >
        {companyIndustries?.slice(0, 5).map((item,index,array) => (
          <Grid item mb={1}>
            <Typography variant="caption">{item.slice(0,29)}{item.length>29 && " ..."}</Typography><br/>
            {index !== array.length - 1 && <Divider />}

          </Grid>
        ))}

        <Grid item>
          <Typography variant="caption">
          {companyIndustries?.length>5 && <Typography variant="caption">{companyIndustries.length-5}+ more</Typography>}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Industries;
