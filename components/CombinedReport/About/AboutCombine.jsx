import { Grid, Typography } from "@mui/material";
import {
  IconBrandLinkedin,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import { useState } from "react";
import Styles from "./About.module.css";
import Component from "../Component";
import PaperComp from "../../ReportSection/PaperComp";
import MissionComponent from "../MissionComp";

const socialtheme = {
  cursor: "pointer",
  padding: "0.5rem 0.9rem",
  border: "1px solid #D9D9D9",
  borderRadius: "15px",
  minHeight: "1rem",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0px 0px 30px 1px #e6e6e6",
  },
};

const Social = ({ followers, handle }) => {
  console.log("followers", followers);
    console.log("handle", handle);
  return (
    <a href={handle} target="_blank" style={{color: "#3b3bb6", textDecoration: "none"}}>

      <Grid
        container
        style={socialtheme}
        sx={{
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "180px"
        }}>
        <Grid
          sx={{
            pt: 0.5,
            alignItems: "center"
          }}
          size={2}>
          <IconBrandLinkedin size={20} color="#0A66C2" />
        </Grid>
        <Grid
          sx={{
            alignItems: "center"
          }}
          size={10}>
          <Typography variant="caption">
            <span className={Styles.followers}>{followers} followers</span>
          </Typography>
        </Grid>
      </Grid>
    </a>
  );
};

const AboutCombine = ({ companyData }) => {
  console.log("companfddyData", companyData);
  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={[{
          mb: 2
        }, 12]}>
        <Grid size={4}>
          <Component 
            title="Company Description"
            description={companyData?.company?.about?.description}
          />
          <br />

          <MissionComponent
            title="Mission"
            description={companyData?.company?.about?.mission}
          />
          {/* <Component title="Social" description={description}/> */}


          <Social
            followers={companyData?.company?.about?.linkedin?.followers}
            handle={companyData?.company?.about?.linkedin?.handle}
            // handle={companyData?.company?.about?.linkedin?.handle?.slice(0, 30)}
          />
        </Grid>

        {companyData?.competitors?.map((value) => {
          return (
            <>
              <Grid size={4}>
                <Component
                  title="Company Description"
                  description={value?.about?.description}
                />
                <br />
                <MissionComponent
                  title="Mission"
                  description={value?.about?.mission}
                />

                <Social
                  followers={value?.about?.linkedin?.followers}
                  handle={value?.about?.linkedin?.handle}
                  // handle={value?.about?.linkedin?.handle?.slice(0, 30)}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default AboutCombine;
