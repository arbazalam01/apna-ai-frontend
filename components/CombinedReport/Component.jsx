import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

const Component = ({ title, description }) => {
  const [showFullText, setShowFullText] = useState(false);

  const handleShowMoreClick = () => {
    setShowFullText(!showFullText);
  };

  return (
    <Grid item>
      <Grid item p={"0rem 1rem 0.8rem 0rem"}>
        <Typography variant="MainHeading" sx={{ fontSize: "1.05rem", lineHeight: "0rem" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid item>
          <Typography variant="combinedDesc" sx={{cursor: 'pointer'}} onClick={handleShowMoreClick}>
            {showFullText ? description : description.slice(0, 280)}
            {description.length > 280 && (
              <>
                {!showFullText && " ..."}
                <br />
                <span style={{ color: '#3B3BB6', cursor: 'pointer' }}>
                  {showFullText ? "Show less" : "Show more"}
                </span>
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Component;
