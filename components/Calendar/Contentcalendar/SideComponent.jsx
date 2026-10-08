import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import {
  IconBrandInstagram,
  IconBrandX,
  IconChevronRight,
  IconWorld,
} from "@tabler/icons-react";
import { FaRegNewspaper } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { IoCopyOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const iconTheme = {
  fontSize: "1.25rem",
  color: "#d1cdcd",
  cursor: "pointer",
};

const SideComponent = ({ selectedCalendarData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  let platformIcon = null;
  if (selectedCalendarData?.platform?.toUpperCase() === "INSTAGRAM") {
    platformIcon = (
      <IconBrandInstagram
        size={"1.25rem"}
        color="white"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ffdf9e, #ffc273, #e56969, #c1558b, #8a49a1)",
          borderRadius: "20%",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3,
        }}
      />
    );
  } else if (selectedCalendarData?.platform?.toUpperCase() === "LINKEDIN") {
    platformIcon = (
      <FaLinkedin
        style={{
          fontSize: "1.28rem",
          color: "blue",
          borderRadius: "20%",
          zIndex: 4,
        }}
      />
    );
  } else if (selectedCalendarData?.platform?.toUpperCase() === "TWITTER") {
    platformIcon = (
      <IconBrandX
        size={"1.15rem"}
        color="white"
        style={{ backgroundColor: "black", borderRadius: "20%", zIndex: 4 }}
      />
    );
  } else if (selectedCalendarData?.platform?.toUpperCase() === "BLOG POST") {
    platformIcon = (
      <FaRegNewspaper
        style={{
          fontSize: "1.3rem",
          color: "#a8a8a8",
          borderRadius: "20%",
          zIndex: 4,
        }}
      />
    );
  } else {
    platformIcon = <IconWorld size={"1.45rem"} color="#d1cdcd" zIndex={5} />;
  }

  const description = selectedCalendarData?.Theme;
  const isLongDescription = description && description?.length > 200;

  return (
    <>
      <Grid
        container
        style={{ boxShadow: "0px 0px 3px 0px #c2c0c0", borderRadius: "15px" }}
        size={8}
      >
        <Grid
          sx={{
            alignItems: "center",
            p: 3,
            borderRight: "1px solid #e9e9e9"
          }}
          size={10.5}>
          <Grid
            sx={{
              display: "flex",
              gap: 1,
              textAlign: "center",
              alignItems: "center",
              mb: 1
            }}>
            {platformIcon}
            <Typography variant="caption2" style={{ fontWeight: "600" }}>
              {selectedCalendarData?.platform}
            </Typography>
          </Grid>
          <Grid>
            
              <Grid sx={{
                mb: 1
              }}>
                <Typography variant="campaignTitle">
                  {selectedCalendarData?.Title}
                </Typography>
                <br />
              </Grid>
           
            <Typography variant="campaignDescription">
              {isExpanded ? description : description.slice(0, 200)}
            </Typography>
            {isLongDescription && (
              <Typography
                variant="body2"
                style={{ color: "#3B3BB6", cursor: "pointer" }}
                onClick={toggleExpand}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "center",
            pt: 2.5
          }}
          size={1.5}>
          <Grid>
            <Grid sx={{
              mb: 1
            }}>
              <IoCopyOutline style={iconTheme} />
            </Grid>
            <Grid sx={{
              mb: 1
            }}>
              <FiEdit style={iconTheme} />
            </Grid>
            <Grid>
              <RiDeleteBin6Line style={iconTheme} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SideComponent;
