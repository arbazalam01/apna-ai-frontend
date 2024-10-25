import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Item from "../Item";
import Styles from "./Positioning.module.css";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";



const Positioning = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);

  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;

  const companyPositioning = data?.company?.marketposition;

 

  return (
    <Box>
      <Typography variant="MainHeading">
        Positioning
        {/* <h5>Positioning</h5> */}
      </Typography>
      <Grid container direction="column" mt={1}>


          <Grid item mb={1}>
            <Typography variant="caption">
              <Item
                title={"Core Purpose"}
                description={<span className={Styles.items}>{companyPositioning?.corepurpose?.length} Items</span>}
                // dsctext="Items"
              />
              <Divider />
            </Typography>
          </Grid>

          <Grid item mb={1}>
            <Typography variant="caption">
              <Item
                title={"Positioning"}
                description={<span className={Styles.items}>{companyPositioning?.positioning?.length} Items</span>}
                // dsctext="Items"
              />
              <Divider />
            </Typography>
          </Grid>

          <Grid item mb={1}>
            <Typography variant="caption">
              <Item
                title={"Key Differentiator"}
                description={<span className={Styles.items}>{companyPositioning?.keydifferentiators?.length} Items</span>}
                // dsctext="Items"
              />
              {/* <Divider /> */}
            </Typography>
          </Grid>

          <Grid item mb={1}>
            <Typography variant="caption">
            <Item
                title={"Brand Personality"}
                description={<span className={Styles.items}>{companyPositioning?.brandpersonality?.length} Items</span>}
                // dsctext="Items"
              />
              {/* <Divider /> */}
            </Typography>
          </Grid>
      </Grid>
    </Box>
  );
};

export default Positioning;
