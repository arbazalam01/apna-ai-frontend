import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Recommend = () => {
    let navigate = useNavigate();
    let { companyId } = useParams();
    const items = [
      { id: 1, name: "Review Data & Analysis", url: "/reports" },
      { id: 2, name: "Create a Content Calendar for April" , url:"/calendar" },
      { id: 3, name: "Export your March Content Calendar", url:"/calendar" },
      {id:4,name:"Create a Persona", url:"/personas"},
    ];
  return (
    <Grid container pt={3}>
      <Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"} px={4}>
        <Typography variant="MainHeading">Recommended Next Steps</Typography>
        
      </Grid>
      <Grid item xs={12} px={4} mb={1}>
        <Typography sx={{ fontSize: "0.9rem" }}>
        Based on your recent activity, here’s some ideas for you:
        </Typography>
      </Grid>

      {items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <Grid container  alignItems="center" borderBottom={"1px solid #E5E5E5"} py={0.7} px={3}>
              
                <Grid item xs={10} display="flex" justifyContent="space-between">
                  <Typography variant="body1">{item?.name}</Typography>
                  {/* <Typography variant="smallGreyHeading" fontSize={"0.7rem"}>COMPETITOR</Typography> */}
                </Grid>
                {/* <Grid item xs={2} textAlign="right" >
                  <IconButton
                    edge="end"
                    aria-label="go"
                    align="right"
                    onClick={() => handleNavigation(item.id)}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Grid> */}
                <Grid item xs={1.7} textAlign={"right"}>
            <IconButton
                      edge="end"
                      aria-label="go"
                      onClick={() => handleNavigation(item.id)}
                      >
                      <ArrowForwardIosIcon color="#000" style={{ fontSize: "1.1rem" }} />
                    </IconButton>

          </Grid>
              </Grid>


            </React.Fragment>
          ))}
        </>
      ) : (
        <Grid
          item
          container
          justifyContent="center"
          sx={{
            justifyContent: "center",
            color: "#d2d2d2",
            fontWeight: "400",
            fontSize: "1.5rem",
            mt: 10,
          }}
        >
          No Personas created
        </Grid>
      )}
    </Grid>
  );
};

export default Recommend;
