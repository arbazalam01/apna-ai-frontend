import { Grid, Divider, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import AboutCombine from "./About/AboutCombine";
import ProductCombine from "./Products/ProductCombine";
import IndustryCombine from "./Industries/IndustryCombine";
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronsRight,
} from "@tabler/icons-react";
import LeadershipCombine from "./Leadership/LeadershipCombine";
import Topclients from "./Topclients/Topclients";
import BlogAnalysis from "./Bloganalysis/BlogAnalysis";
import Positioning from "./Positioning/Positioning";
import SWOT from "./SWOT/SWOT";

const StickyAbout = styled(Grid)({
  position: "sticky",
  top: 130,
  zIndex: 100,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyProduct = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,

  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyIndustry = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyLeadership = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyClients = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyBlog = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickyPositioning = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});
const StickySWOT = styled(Grid)({
  position: "sticky",
  zIndex: 100,
  top: 130,
  backgroundColor: "#fff",
  // borderBottom:"1px solid #EBEBEB"
});

const AllCombineComp = ({ companyData }) => {
  const [open, setOpen] = useState({
    about: false,
    product: false,
    industry: false,
    leadership: false,
    topClients: false,
    blogAnalysis: false,
    swot: false,
    positioning: false,
  });
  const handleOpen = (section) => {
    setOpen({ ...open, [section]: !open[section] });
  };

  const testStyle = {
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "400",
  };
  return (
    <>
      <Grid columnSpacing={2}>
        {/* About */}
        <Grid size={12}>
          <StickyAbout
            onClick={() => handleOpen("about")}
            container
            xs={12}
            alignItems={"center"}
            p={"1rem 0rem"}
          >
            {open.about ? <IconChevronDown /> : <IconChevronRight />}
            &nbsp;&nbsp;&nbsp;
            <Typography sx={testStyle}>About</Typography>
          </StickyAbout>
          <Grid>
            {open.about && <AboutCombine companyData={companyData} />}
          </Grid>
        </Grid>
        <Divider />

        {/* positioning */}

        <StickyPositioning
          container
          xs={12}
          alignItems={"center"}
          onClick={() => handleOpen("positioning")}
          p={"1rem 0rem"}
        >
          {open.positioning ? <IconChevronDown /> : <IconChevronRight />}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle}>Market Positioning</Typography>
        </StickyPositioning>
        <Grid>
          {open.positioning && <Positioning companyData={companyData} />}
        </Grid>
        <Divider />

        {/* swot */}

        <StickySWOT
          container
          xs={12}
          alignItems={"center"}
          onClick={() => handleOpen("swot")}
          p={"1rem 0rem"}
        >
          {open.swot ? <IconChevronDown /> : <IconChevronRight />}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle}>SWOT Analysis</Typography>
        </StickySWOT>
        <Grid>{open.swot && <SWOT companyData={companyData} />}</Grid>
        <Divider />

        {/* Product */}
        <StickyProduct
          container
          xs={12}
          alignItems={"center"}
          onClick={() => handleOpen("product")}
          p={"1rem 0rem"}
        >
          {open.product ? <IconChevronDown /> : <IconChevronRight />}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle}>Products & Services</Typography>
        </StickyProduct>
        <Grid>
          {open.product && <ProductCombine companyData={companyData} />}
        </Grid>
        <Divider />

        {/* industry */}
        <StickyIndustry
          container
          xs={12}
          alignItems={"center"}
          onClick={() => handleOpen("industry")}
          p={"1rem 0rem"}
        >
          {open.industry ? <IconChevronDown /> : <IconChevronRight />}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle}>Industries Served</Typography>
        </StickyIndustry>
        <Grid>
          {open.industry && <IndustryCombine companyData={companyData} />}
        </Grid>
        <Divider />
        <StickyLeadership
          container
          onClick={() => handleOpen("leadership")}
          xs={12}
          alignItems={"center"}
          p={"1rem 0rem"}
        >
          {open.leadership ? <IconChevronDown /> : <IconChevronRight />}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle}>Leadership</Typography>
        </StickyLeadership>
        <Grid>
          {open.leadership && <LeadershipCombine companyData={companyData} />}
        </Grid>
        <Divider />

        {/* topClients */}

        {/* <StickyClients container xs={12} alignItems={"center"} p={"1rem 0rem"}>
          {open.topClients ? (
            <IconChevronDown onClick={() => handleOpen('topClients')} />
          ) : (
            <IconChevronRight onClick={() => handleOpen('topClients')} />
          )}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle} onClick={() => handleOpen('topClients')}>
          Top Clients
          </Typography>
        </StickyClients>
      <Grid>
        {open.topClients && (  <Topclients  companyData={companyData}/>)}
        </Grid>
        <Divider /> */}

        {/* blogAnalysis */}

        {/* <StickyBlog container xs={12} alignItems={"center"} p={"1rem 0rem"} >
          {open.blogAnalysis ? (
            <IconChevronDown onClick={() => handleOpen('blogAnalysis')} />
          ) : (
            <IconChevronRight onClick={() => handleOpen('blogAnalysis')} />
          )}
          &nbsp;&nbsp;&nbsp;
          <Typography sx={testStyle} onClick={() => handleOpen('blogAnalysis')}>
          Blog Analysis
          </Typography>
        </StickyBlog>
      <Grid>
        {open.blogAnalysis && (  <BlogAnalysis  companyData={companyData}/>)}
        </Grid> */}
        {/* <Divider /> */}
      </Grid>
    </>
  );
};

export default AllCombineComp;
