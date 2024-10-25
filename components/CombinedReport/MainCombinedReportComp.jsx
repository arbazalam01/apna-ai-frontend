import React from "react";
import AllCombineComp from "./AllCombineComp";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyCompetitor from "@hooks/useCompanyCompetitor";
import Loader from "@components/Loader";

import { Grid, Typography, styled } from "@mui/material";
import { useParams } from "react-router-dom";

const StickyGrid = styled(Grid)({
  position: "sticky",
  top: 55,
  zIndex: 1000, // adjust the zIndex as needed
  // backgroundColor: "transparent",
  borderBottom: "1px solid #EBEBEB",
  backgroundColor: "#fff",
});
const MainCombinedReportComp = () => {

  // const companyId = useCompanyId();
  let {companyId}=useParams()


  const { data, error, isLoading, isError } = useCompanyCompetitor(companyId);
  const companyData = data;
  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const companies = {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
  };
  const test = {
    fontSize: "0.8rem",
    // lineHeight: "0rem",
    // fontWeight: "600",
    color: "#999999",
  };

  return (
    <>
      <Grid pl={0.2}>
        <StickyGrid container p={"1rem 2rem 1rem 2rem"}>
          <Grid item xs={4}>
            <Typography sx={test}>YOUR COMPANY </Typography>
            <Typography sx={companies}>{companyData?.company?.name}</Typography>
          </Grid>

          {companyData?.competitors.map((value) => {
            return (
              <>
                <Grid xs={4} pl={1}>
                  <Typography sx={test}>COMPETITION </Typography>
                  <Typography sx={companies}>{value?.name}</Typography>
                </Grid>
              </>
            );
          })}
        </StickyGrid>
        {/* <Divider /> */}

        <Grid container p={"1rem 2rem 1rem 2rem"} minHeight={"80vh"}>
          <Grid item xs={12}>
            <AllCombineComp companyData={companyData} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainCombinedReportComp;
