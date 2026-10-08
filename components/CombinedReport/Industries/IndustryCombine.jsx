import { Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";

const IndustryCombine = ({ companyData }) => {
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
      <Grid container columnSpacing={2} sx={{
        mb: 2
      }}>
        <Grid size={4}>
          {companyData?.company?.industries?.slice(0, showFullText[0] ? undefined : 5).map((core, index) => (
            <Grid
              key={index}
              onClick={() => handleShowMoreClick(0)}
              sx={{
                mb: 1.5
              }}>
              <Typography variant="caption" sx={{cursor: 'pointer', fontSize: "0.9rem" }}>
                {core}
              </Typography>
            </Grid>
          ))}
          {companyData?.company?.industries?.length > 5 && (
            <>
              <Typography
                variant="combinedDesc"
                sx={{ color: '#3B3BB6', cursor: 'pointer' }}
                onClick={() => handleShowMoreClick(0)}
              >
                {showFullText[0] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>

        <Grid size={4}>
          {companyData?.competitors[0]?.industries?.slice(0, showFullText[1] ? undefined : 5).map((core, index) => (
            <Grid
              key={index}
              onClick={() => handleShowMoreClick(1)}
              sx={{
                mb: 1.5
              }}>
              <Typography variant="caption" sx={{cursor: 'pointer', fontSize: "0.9rem" }}>
                {core}
              </Typography>
            </Grid>
          ))}
          {companyData?.competitors[0]?.industries?.length > 5 && (
            <>
              <Typography
                variant="combinedDesc"
                sx={{ color: '#3B3BB6', cursor: 'pointer' }}
                onClick={() => handleShowMoreClick(1)}
              >
                {showFullText[1] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>

        <Grid size={4}>
          {companyData?.competitors[1]?.industries?.slice(0, showFullText[2] ? undefined : 5).map((core, index) => (
            <Grid
              key={index}
              onClick={() => handleShowMoreClick(2)}
              sx={{
                mb: 1.5
              }}>
              <Typography variant="caption" sx={{cursor: 'pointer', fontSize: "0.9rem" }}>
                {core}
              </Typography>
            </Grid>
          ))}
          {companyData?.competitors[1]?.industries?.length > 5 && (
            <>
              <Typography
                variant="combinedDesc"
                sx={{ color: '#3B3BB6', cursor: 'pointer' }}
                onClick={() => handleShowMoreClick(2)}
              >
                {showFullText[2] ? "Show less" : "Show more"}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default IndustryCombine;
