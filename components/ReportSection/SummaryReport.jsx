import React from "react";
import { Grid, Paper, Box, Typography, Divider, Button } from "@mui/material";
import PaperComp from "./PaperComp";
import About from "@components/ReportSection/About/About";
import ProductsAndServices from "@components/ReportSection/Products/ProductsAndServices";
import Industries from "@components/ReportSection/Industries/Industries";
import TopClients from "@components/ReportSection/TopClients/Clients";
import Leadership from "@components/ReportSection/Leadership/Leadership";
import SWOT from "@components/ReportSection/SWOT/SWOT";
import Positioning from "@components/ReportSection/Positioning/Positioning";
import BlogActivity from "@components/ReportSection/BlogActivity/BlogActivity";
import SEO from "./SEO/Seo";


const PaperHeight = {
  height: "17.8rem",
};
const SummaryReport = () => {
  return (
    <Box sx={{ height:"calc(100vh - 4rem)",overflowY:"scroll"}}>
      <Grid container p={2}>
        {/* for about and Products  */}
        <Grid xs={12} item container columnSpacing={2}>
          <Grid item xs={4.9}>
            <PaperComp style={PaperHeight}>
              <About />
            </PaperComp>
          </Grid>
          <Grid item xs={4.5}>
            <PaperComp style={PaperHeight}>
              <ProductsAndServices />
            </PaperComp>
          </Grid>
          <Grid item xs={2.6}>
            <PaperComp style={PaperHeight}>
              <SEO />
            </PaperComp>
          </Grid>
        </Grid>

        <Grid item container columnSpacing={2} mt={2}>
          <Grid item xs={8}>
            <Grid item container columnSpacing={2}>
              <Grid item xs={4}>
                <PaperComp style={PaperHeight}>
                  <Industries />
                </PaperComp>
              </Grid>
              <Grid item xs={4}>
                <PaperComp style={PaperHeight}>
                  <TopClients />{" "}
                </PaperComp>
              </Grid>
              <Grid item xs={4}>
                <PaperComp style={PaperHeight}>
                  <Leadership />
                </PaperComp>
              </Grid>
            </Grid>
            <Grid item container columnSpacing={2} mt={2}>
              <Grid item xs={6}>
                <PaperComp style={PaperHeight}>
                  <Positioning />
                </PaperComp>
              </Grid>
              <Grid item xs={6}>
                <PaperComp style={PaperHeight}>
                  <SWOT />
                </PaperComp>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <PaperComp sx={{ height: "36.5rem" }}>
              <BlogActivity />
            </PaperComp>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryReport;
