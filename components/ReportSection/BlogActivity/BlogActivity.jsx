import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Styles from "./BlogActivity.module.css";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyData from "@hooks/useCompanyData";
import HorizontalBar from "../HorizontalBar";
import { Skeleton } from "antd";

const ListItem = ({ label, blogtype }) => {
  return (
    <ListItemButton style={{ padding: "0rem " }}>
      <SquareIcon blogtype={blogtype} />
      <ListItemText style={{ padding: "0rem" }}>
        <Typography style={{ fontSize: "0.7rem", fontWeight: "500" }}>
          {label}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

const SquareIcon = ({ blogtype }) => {
  const backgroundColor = {
    "THOUGHT LEADERSHIP": "#B5EEFF",
    "KEYWORD DRIVEN": "#CCE896",
    "INSTRUCTIONAL": "#FFD188",
    "COMPANY UPDATE": "#F7ACCE",
    "OTHER": "#A595FF"
  };

  const style = {
    padding: "0rem",
    margin: "0rem",
    width: 13,
    height: 13,
    backgroundColor: backgroundColor[blogtype] || backgroundColor["OTHER"],
    borderRadius: 4,
    textAlign: "start",
  };

  return (
    <ListItemIcon style={{ minWidth: "30px" }}>
      <div style={style}></div>
    </ListItemIcon>
  );
};

const BlogActivity = () => {
  const companyId = useCompanyId();
  const { data, error, isLoading, isError } = useCompanyData(companyId);

  if (isLoading) return <div><Skeleton/><Skeleton/></div>;
  if (isError) return <div>Error: {error.message}</div>;

  const companyBlog = data?.company;
  const datas = companyBlog?.blogs?.titles;

  const thoughtLeadership = datas?.filter((val) => val?.blogtype?.toUpperCase() === "THOUGHT LEADERSHIP");
  const keywordDriven = datas?.filter((val) => val?.blogtype?.toUpperCase() === "KEYWORD DRIVEN");
  const instructional = datas?.filter((val) => val?.blogtype?.toUpperCase() === "INSTRUCTIONAL");
  const companyUpdate = datas?.filter((val) => val?.blogtype?.toUpperCase() === "COMPANY UPDATE");
  const other = datas?.filter((val) => !["THOUGHT LEADERSHIP", "KEYWORD DRIVEN", "INSTRUCTIONAL", "COMPANY UPDATE"].includes(val?.blogtype?.toUpperCase()));
 console.log("thoughtLeadership",thoughtLeadership)
 console.log("keywordDriven",keywordDriven) 
 const formatPercentage = (value) => (value * 100).toFixed(1);

  return (
    <>
      <Grid container>
        <Grid>
          <Typography variant="MainHeading">Blog Activity</Typography>
        </Grid>

        {companyBlog?.blogs ? (
          <>
            <Grid container>
              <Grid container direction="column" size={12}>
                <Grid>
                  <Typography className={Styles.blog_heading} variant="caption">
                    Blog Posts Breakdown
                  </Typography>
                </Grid>

                <HorizontalBar
                  data={companyBlog?.blogs?.titles}
                  thoughtLeadership={thoughtLeadership}
                  keywordDriven={keywordDriven}
                  instructional={instructional}
                  companyUpdate={companyUpdate}
                  other={other}
                />

                <List>
{thoughtLeadership && thoughtLeadership.length > 0 && (
  <ListItem
                    label={`Thought Leadership`}
                    blogtype="THOUGHT LEADERSHIP"
                  />
)}
                  {keywordDriven && keywordDriven.length > 0 && (
                     <ListItem
                    label={`Keyword Driven`}
                    blogtype="KEYWORD DRIVEN"
                  />
                  )}
                 {
                  instructional && instructional.length > 0 && (
                     <ListItem
                    label={`Instructional`}
                    blogtype="INSTRUCTIONAL"
                  />
                  )
                 }
                 {companyUpdate && companyUpdate.length > 0 && (
                    <ListItem
                    label={`Company Update`}
                    blogtype="COMPANY UPDATE"
                  />
                 )}
                 
                 {
                  other && other.length > 0 && (
                    <ListItem
                    label={`Other`}
                    blogtype="OTHER"
                  />
                  )
                 }
                  
                </List>
              </Grid>
            </Grid>

            <Grid container>
              <Grid
                sx={{
                  mt: 2
                }}
                size={12}>
                <Divider />
                <Typography className={Styles.blog_heading} variant="caption">
                  Details of Last {companyBlog?.blogs?.titles?.length} Blogs 
                </Typography>
              </Grid>

              <Grid container direction="column" size={12}>
                <Grid
                  sx={{
                    mb: 1
                  }}>
                  <Typography variant="caption">POST TITLES</Typography>
                </Grid>
                <Box>
                  {companyBlog?.blogs?.titles.slice(0, 6).map((post, index) => (
                    <Grid container key={index} sx={{
                      pb: 1
                    }}>
                      <Grid size={1}>

                      <SquareIcon blogtype={post?.blogtype?.toUpperCase()} />
                      </Grid>
                      <Grid size={11}>
                      <Typography variant="caption">{post?.title.slice(0, 40)}{post?.title?.length > 40 ? " ..." : ""}</Typography>
                     </Grid>
                      <Divider />
                    </Grid>
                  ))}
                  {companyBlog?.blogs?.titles?.length > 6 && (
                    <Typography variant="caption">
                      {companyBlog?.blogs?.titles?.length - 6}+ more
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            sx={{ justifyContent: "center", color: "#d2d2d2", fontWeight: "500", fontSize: "1.5rem", mt: 20 }}>
            No Blogs Available
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default BlogActivity;
