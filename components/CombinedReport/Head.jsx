import { Grid, Button, Box, Typography } from "@mui/material";
import {
  IconArrowBigLeft,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { color } from "chart.js/helpers";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const pdfButton = {
  backgroundColor: "#3B3BB6",
  textTransform: "none",
  padding: "0.5rem 1.6rem",
  borderRadius: "0.45rem",
};

const backArrow = {
color : "#000",
  cursor: "pointer",
  marginRight: "0.5rem",
};

const Head = () => {
  const { companyId } = useParams();

  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate(`/${companyId}/reports`);
  };

  const handleDownload = () => {
    navigate(`/generatepdf/${companyId}/newpdf`);
  };
  
  return (
    <>
      <Grid
        container
        // pt={5}
        // pb={5}
        bgcolor={"#fff"}


        alignItems="center"
      >
        <Grid item xs={9.6} bgcolor={"transparent"}>
          <Box display="flex" alignItems="center" >
           
           
          <IconChevronLeft
                  onClick={handlenavigate}
                  size={35}

                  style={backArrow}
                />
            <Typography
             variant="Heading-head"

            >
              {/* Reports
            </Typography>
            &nbsp;
            <IconChevronRight size={35} />
            &nbsp;
            <Typography
              sx={{ color: "#000", fontSize: "1.65rem", fontWeight: "500" }}
            > */}
              Combined Report
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={2.4} justify={"center"}
              alignItems={"center"}
              textAlign={"end"} >
          <Button
            variant="button1"
            onClick={handleDownload}
            startIcon={<IconPlus size={19} />}
          >
            Download as PDF
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Head;
