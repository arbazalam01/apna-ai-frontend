import { Box, Grid, Divider, Typography } from "@mui/material";
import Item from "../Item";
import Styles from "./Leadership.module.css";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";

const Leadership = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const Leadership = data?.company?.leadership;
  console.log(Leadership);
  return (
    <Box>
      <Typography variant="MainHeading">Leadership</Typography>
      <Grid container direction="column" pt={1}>
        {Leadership?.slice(0, 3).map((item, index, array) => (
          <Grid item key={index} mb={1}>
            <Typography variant="caption">
              <Item
                title={item?.name}
                description={
                  <span className={Styles.designation}>{item?.designation}</span>
                }
              />
              {index !== array?.length - 1 && <Divider />}
            </Typography>{" "}
          </Grid>
        ))}
      </Grid>
      <Grid>
        {Leadership?.length > 4 && (
          <Typography variant="caption">
            {Leadership?.length - 4}+ more
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Leadership;
