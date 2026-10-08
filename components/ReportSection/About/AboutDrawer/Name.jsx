import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaperComp from "../../PaperComp";
import { Box, Divider, Typography, Grid } from "@mui/material";

import {
  IconBrandInstagram,
  IconWorld,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import Styles from "./AboutDrawer.module.css";
const Name = ({ companyAbout, topTrends }) => {
  return (
    <>
      <Grid container>

          <Grid container direction="column" size={12}>
            <Grid
              sx={{
                width: "100%",
                borderBottom: "1px solid #0000001f",
                pl: 4,
                pb: 1,
                pr: 1
              }}>
              <Grid>

                {companyAbout?.about?.companyLogo ? (
          <img
            src={companyAbout?.about?.companyLogo}
            alt="Company Image"

            height={70}
            width={70}

          />
        ) : (
          <Avatar size={64} style={{marginBottom: "10px"}} icon={<UserOutlined />} />
        )}
              </Grid>
              {/* <Grid item my={1}> 
                <Typography className={Styles.company_name}>
                  {companyAbout?.name}
                </Typography>
              </Grid> */}
              
              <Grid
                sx={{
                  mb: 1
                }}>
                <Typography variant="caption" >
                  {companyAbout?.summary}
                </Typography>
              </Grid>
            </Grid>
            {/*  */}
            <Grid
              container
              direction="column"
              sx={{
                pl: 4,
                pt: 1,
                pb: 1,
                borderBottom: "1px solid #0000001f"
              }}>
              <Grid
                container
                sx={{
                  mt: 0.7
                }}>
                <Grid size={1.5}>
                  <IconWorld size={22} />
                </Grid>
                <Grid size={2.5}>
                  <Typography variant="caption">Website</Typography>
                </Grid>
                <Grid size={8}>
                <Typography variant="caption">
  {companyAbout?.websiteUrl ? (
    companyAbout.websiteUrl.startsWith("https://") ? (
      <a href={companyAbout?.websiteUrl} target="_blank" style={{ color: "#3b3bb6" }}>
        {companyAbout?.websiteUrl}
      </a>
    ) : (
      <a href={`https://${companyAbout?.websiteUrl}`} target="_blank" style={{ color: "#3b3bb6" }}>
        {companyAbout?.websiteUrl}
      </a>
    )
  ) : null}
</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  mt: 1
                }}>
                {/* {companyAbout.about.map((item, index) => (  */}
                <>
                  <Grid size={1.5}>
                    <IconBrandLinkedin size={22} color="#0A66C2" />
                  </Grid>
                  <Grid size={2.5}>
                    <Typography variant="caption">LinkedIn</Typography>
                  </Grid>
                  <Grid size={8}>
                      <a href={companyAbout?.about?.linkedin?.handle} target="_blank" style={{color: "#3b3bb6"}}>
                    <Typography variant="caption">
                      <span className={Styles.followers}>

                        {companyAbout?.about?.linkedin?.followers}
                      </span> {" "}
                      followers
                    </Typography>
                      </a>
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
            {/*  */}

            <Grid
              sx={{
                pl: 4,
                pt: 1,
                pr: 2
              }}>
              <Typography variant="caption8">
                Trending Industry Themes
              </Typography>
              {topTrends?.slice(0, 5).map((items, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "0.85rem",
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
    </>
  );
};

export default Name;
