import { Box, Divider, Typography, Grid } from "@mui/material";
import {
  IconBrandInstagram,
  IconWorld,
  IconBrandLinkedin,
} from "@tabler/icons-react";
// import eVeroLogo from "../../assets/eVero.jpeg";
import Styles from "./About.module.css";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import { Avatar, Skeleton } from "antd";
import { UserOutlined } from '@ant-design/icons';

const About = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);
  if (isLoading) return <Skeleton/>;
  if (isError) return <div>Error: {error.message}</div>;
  const companyAbout = data?.company;

  return (
    <Grid container>
      {/* Title  */}
      <Grid item>
        <Typography variant="MainHeading">About</Typography>
      </Grid>

      {/* Company Name and description  */}
      <Grid
        item
        container
        maxHeight={140}
        sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
      >
        <Grid item xs={6} container direction="column" mt={1}>
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
          <Grid item>
            <Typography variant="caption">{companyAbout?.name}</Typography>
          </Grid>
          <Grid className={Styles.company_sector} item>
            <Typography variant="caption">
              {companyAbout?.industries[0]}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} container direction="column">
          <Grid item>
            <Typography
              variant="MainHeading"
              style={{ fontSize: "1rem", fontWeight: 600 }}
            >
              Company Description
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              sx={{ textOverflow: "ellipsis", overflow: "scroll" }}
            >
              {/* {companyAbout?.summary.slice(0, 150)}  */}

              {companyAbout?.about?.description?.length < 100
                ? companyAbout?.about?.description
                : `${companyAbout?.about?.description?.slice(0, 80)} ...`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Company Social Media Links */}
      <Grid item container direction="column">
        <Divider sx={{ margin: "0.5rem 0rem 0.75rem 0rem" }} />

        <Grid item container>
          <Grid item xs={1}>
            <IconWorld size={22} />
          </Grid>
          <Grid item xs={10}>
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

        <Grid item container mt={1}>
          <Grid item xs={1}>
            <IconBrandLinkedin size={22} color="#0A66C2" />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption">
              <span className={Styles.followers}>
                {companyAbout?.about?.linkedin?.followers}
              </span>{" "}
              followers
            </Typography>
          </Grid>
          <Grid item xs={8} alignItems={"center"}>
            <Typography variant="caption1" style={{fontSize:"0.78rem"}}>
            <a href={companyAbout?.about?.linkedin?.handle} target="_blank" style={{color: "#3b3bb6"}}>
              {companyAbout?.about?.linkedin?.handle}
            </a>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {/* <IconBrandInstagram size={22} color="#C13584" />{" "} */}
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption">
              {/* <span className={Styles.followers}>309</span> followers */}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={Styles.icon_url}>
              {/* https://www.instagram.com/everocorporation/ */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
