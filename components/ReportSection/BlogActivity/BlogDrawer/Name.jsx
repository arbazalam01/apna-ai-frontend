import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaperComp from "../../PaperComp";
import { Box, Divider, Typography, Grid } from "@mui/material";
import fathom from '/Images/Fathom.jpeg';
import rapidClaims from '/Images/rapidclaims.jpeg';
import inboxHealth from '/Images/InboxHealth.jpeg';



const Name = ({companyAbout,topTrends}) => {


  let element="";
   if (companyAbout.name==="RapidClaims") {
    element = rapidClaims;
   }if(companyAbout.name==="Fathom") {
    element = fathom;
   }if (companyAbout.name==="Inbox Health") {element = inboxHealth;}
   console.log("companyAbout", companyAbout)
   
  return (
    <>
      <PaperComp>
        <Grid container>
          <Grid item container>
            <Grid item xs={12} container direction="column" mt={1}>
              <Grid>
                <Grid>
                  <img
                    src={element}
                    height={60}
                    width={60}
                    alt="eVero"
                    style={{ border: "1px solid #D9D9D9", borderRadius: "50%" }}
                  />
                </Grid>
                <Grid item>
                  <Typography className={Styles.company_name}>
                    {companyAbout.name}
                  </Typography>
                </Grid>
                <Grid item mb={2}>
                  <Typography className={Styles.company_sector}>
                  {companyAbout?.industries[0]}
                  </Typography>
                </Grid>
                <Divider />
              </Grid>
              <Grid>
                {topTrends?.slice(0,5).map((items, index) => {
                  return (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        color: "grey",
                      }}
                    >
                      <TrendingUpIcon fontSize="small" /> &nbsp; {items}
                    </Typography>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PaperComp>
    </>
  );
};

export default Name;
