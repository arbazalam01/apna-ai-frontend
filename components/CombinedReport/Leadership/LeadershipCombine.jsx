import { Grid, Typography } from "@mui/material";
import { useState } from "react";

const LeadershipCombine = ({ companyData }) => {
  const componentStyle = {
    cursor: "pointer",
    padding: "1rem 0.9rem 1rem 0.9rem",
    border: "1px solid #D9D9D9",
    borderRadius: "15px",
    minHeight: "1rem",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0px 0px 30px 1px #e6e6e6",
    },
  };

  const [showFullText, setShowFullText] = useState([false, false, false]);

  const handleShowMoreClick = (index) => {
    setShowFullText((prevShowFullText) => {
      const newShowFullText = [...prevShowFullText];
      newShowFullText[index] = !newShowFullText[index];
      return newShowFullText;
    });
  };

  return (
    <>
      <Grid container columnSpacing={2} mb={2}>
        <Grid item xs={4}>
          {companyData?.company?.leadership?.slice(0, showFullText[0] ? undefined : 5).map((core, index) => (
            <Grid item key={index} mb={1.5} sx={{ cursor: 'pointer' }} onClick={() => handleShowMoreClick(0)}>
              <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
                {core.name}
              </Typography>
              <br />
              <Typography variant="caption3" sx={{ fontSize: "0.85rem", fontWeight: 400 }}>
                {core.designation}
              </Typography>
            </Grid>
          ))}
          {companyData?.company?.leadership?.length > 5 && (
            <>
              <Typography variant="combinedDesc" sx={{ color: '#3B3BB6', cursor: 'pointer' }} onClick={() => handleShowMoreClick(0)}>
                {showFullText[0] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={4}>
          {companyData?.competitors[0]?.leadership?.slice(0, showFullText[1] ? undefined : 5).map((core, index) => (
            <Grid item key={index} mb={1.5} sx={{ cursor: 'pointer' }} onClick={() => handleShowMoreClick(1)}>
              <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
                {core.name}
              </Typography>
              <br />
              <Typography variant="caption3" sx={{ fontSize: "0.85rem", fontWeight: 400 }}>
                {core.designation}
              </Typography>
            </Grid>
          ))}
          {companyData?.competitors[0]?.leadership?.length > 5 && (
            <>
              <Typography variant="combinedDesc" sx={{ color: '#3B3BB6', cursor: 'pointer' }} onClick={() => handleShowMoreClick(1)}>
                {showFullText[1] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={4}>
          {companyData?.competitors[1]?.leadership.slice(0, showFullText[2] ? undefined : 5).map((core, index) => (
            <Grid item key={index} mb={1.5} sx={{ cursor: 'pointer' }} onClick={() => handleShowMoreClick(2)}>
              <Typography variant="caption" sx={{ fontSize: "0.9rem" }}>
                {core.name}
              </Typography>
              <br />
              <Typography variant="caption3" sx={{ fontSize: "0.85rem", fontWeight: 400 }}>
                {core.designation}
              </Typography>
            </Grid>
          ))}
          {companyData?.competitors[1]?.leadership?.length > 5 && (
            <>
              <Typography variant="combinedDesc" sx={{ color: '#3B3BB6', cursor: 'pointer' }} onClick={() => handleShowMoreClick(2)}>
                {showFullText[2] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LeadershipCombine;
