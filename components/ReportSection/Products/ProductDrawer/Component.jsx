import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";

const Component = ({ name, description = [] }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const textRef = useRef(null);
  const lineHeight = 24; // Adjust based on your Typography's actual line height
  const maxLines = 5; // Maximum number of lines before showing "Show more"

  const handleShowMoreClick = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    if (textRef.current) {
      const totalHeight = textRef.current.scrollHeight;
      const maxAllowedHeight = lineHeight * maxLines;
      if (totalHeight > maxAllowedHeight) {
        setShouldShowMore(true);
      }
    }
  }, [description]);

  return (
    <>
      <Grid item>
        <Grid item mb={0.5}>
          <Typography
            variant="h6"
            sx={{ fontSize: "1.1rem", lineHeight: "1.5rem" }}
          >
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            ref={textRef}
            style={{
              maxHeight: showFullText ? "none" : `${lineHeight * maxLines}px`,
              overflow: "hidden",
            }}
          >
            {description.map((item, index) => (
              <Grid container key={index} sx={{ cursor: "pointer" }}   onClick={handleShowMoreClick}>
                <Grid item xs={0.5} container sx={{ cursor: "pointer" }}>
                  <Typography variant="caption">-</Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="caption">
                    {item}
                  </Typography>
                </Grid>
                
              </Grid>
            ))}
            
          </div>
          {shouldShowMore && (
            <span
              style={{ color: "#3B3BB6", cursor: "pointer" }}
              onClick={handleShowMoreClick}
            >
              {showFullText ? "Show less" : "Show more"}
            </span>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Component;
