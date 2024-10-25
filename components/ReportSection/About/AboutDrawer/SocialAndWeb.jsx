import { Box, Divider, Typography, Grid } from "@mui/material";
import {
  IconBrandInstagram,
  IconWorld,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Styles from "./AboutDrawer.module.css";
import PaperComp from "../../PaperComp";

const socialtheme={cursor: "pointer",
padding: "0.5rem 0.9rem 0.5rem 0.9rem",
border: "1px solid #D9D9D9",
borderRadius: "15px",
height: "auto",
boxShadow: "none",
"&:hover": {
  boxShadow: "0px 0px 30px 1px #e6e6e6",
},}

const SocialAndWeb = ({companyAbout}) => {
  console.log("companyAbout", companyAbout?.about);
  return (
    <>
      {/* <PaperComp  > */}
        <Grid item container  direction="column" >
          <Grid item container mt={0.7}>
            <Grid item xs={2}>
              <IconWorld size={22} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="caption">{companyAbout?.websiteUrl}</Typography>
            </Grid>
          </Grid>
          <Grid item container mt={1}>
 {/* {companyAbout.about.map((item, index) => (  */}
  <>
            <Grid item xs={2} >
              <IconBrandLinkedin size={22} color="#0A66C2" />
            </Grid>
            <Grid item xs={10}>
              <Typography variant="caption">
                <span className={Styles.followers}>{companyAbout?.about?.linkedin?.followers}</span> followers
              </Typography>
            </Grid>
            {/* <Grid item xs={8}>
             <Typography className={Styles.icon_url} variant="caption">
                {companyAbout?.about?.linkedin?.handle}
              </Typography>
              
            </Grid>  */}
  </>
  {/* ))} */}
            
            
          </Grid>
        </Grid>
      {/* </PaperComp> */}
    </>
  );
};

export default SocialAndWeb;
