import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import Item from "../Item";
import Styles from "./SWOT.module.css";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Skeleton } from "antd";



const SWOT = () => {


  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);

  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;

  const companySwotAnalysis = data?.company?.swotanalysis;

  // const companyId = useCompanyId();
  // const { data, error, isLoading, isError } = useCompanyData(companyId);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;

  // const companySWOT = data.company.swotanalysis;

  // const SWOTItem = [
  //   {
  //     title: "Strengths",
  //     count: companySWOT.strengths.length,
  //   },
  //   {
  //     title: "Weaknesses",
  //     count: companySWOT.weaknesses.length,
  //   },
  //   {
  //     title: "Opportunities",
  //     count: companySWOT.opportunities.length,
  //   },
  //   {
  //     title: "Threats",
  //     count: companySWOT.threats.length,
  //   },
  // ];

  return (
    <Box>
    <Typography variant="MainHeading">
      SWOT
      {/* <h5>Positioning</h5> */}
    </Typography>
    <Grid container direction="column" mt={1}>


        <Grid item mb={1}>
          <Typography variant="caption">
            <Item
              title={"Strengths"}
              description={<span className={Styles.items}>{companySwotAnalysis?.strengths?.length} Items</span>}
              // dsctext="Items"
            />
            <Divider />
          </Typography>
        </Grid>

        <Grid item mb={1}>
          <Typography variant="caption">
            <Item
              title={"Weaknesses"}
              description={<span className={Styles.items}>{companySwotAnalysis?.weaknesses?.length} Items</span>}
              // dsctext="Items"
            />
            <Divider />
          </Typography>
        </Grid>

        <Grid item mb={1}>
          <Typography variant="caption">
            <Item
              title={"Opportunities"}
              description={<span className={Styles.items}>{companySwotAnalysis?.opportunities?.length} Items</span>}
              // dsctext="Items"
            />
            {/* <Divider /> */}
          </Typography>
        </Grid>

        <Grid item mb={1}>
          <Typography variant="caption">
          <Item
              title={"Threats"}
              description={<span className={Styles.items}>{companySwotAnalysis?.threats?.length} Items</span>}
              // dsctext=""
            />
            {/* <Divider /> */}
          </Typography>
        </Grid>
    </Grid>
  </Box>
  );
};

export default SWOT;
