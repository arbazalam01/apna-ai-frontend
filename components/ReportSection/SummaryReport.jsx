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
      <Grid container sx={{
        p: 2
      }}>
        {/* for about and Products  */}
        <Grid container columnSpacing={2} size={12}>
          <Grid size={4.9}>
            <PaperComp style={PaperHeight}>
              <About />
            </PaperComp>
          </Grid>
          <Grid size={4.5}>
            <PaperComp style={PaperHeight}>
              <ProductsAndServices />
            </PaperComp>
          </Grid>
          <Grid size={2.6}>
            <PaperComp style={PaperHeight}>
              <SEO />
            </PaperComp>
          </Grid>
        </Grid>

        <Grid
          container
          columnSpacing={2}
          sx={{
            mt: 2
          }}>
          <Grid size={8}>
            <Grid container columnSpacing={2}>
              <Grid size={4}>
                <PaperComp style={PaperHeight}>
                  <Industries />
                </PaperComp>
              </Grid>
              <Grid size={4}>
                <PaperComp style={PaperHeight}>
                  <TopClients />{" "}
                </PaperComp>
              </Grid>
              <Grid size={4}>
                <PaperComp style={PaperHeight}>
                  <Leadership />
                </PaperComp>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={2}
              sx={{
                mt: 2
              }}>
              <Grid size={6}>
                <PaperComp style={PaperHeight}>
                  <Positioning />
                </PaperComp>
              </Grid>
              <Grid size={6}>
                <PaperComp style={PaperHeight}>
                  <SWOT />
                </PaperComp>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={4}>
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
