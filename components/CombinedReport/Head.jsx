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
        sx={{
          bgcolor: "#fff",
          alignItems: "center"
        }}>
        <Grid
          sx={{
            bgcolor: "transparent"
          }}
          size={9.6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center"
            }}>
           
           
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

        <Grid
          justify={"center"}
          sx={{
            alignItems: "center",
            textAlign: "end"
          }}
          size={2.4}>
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
