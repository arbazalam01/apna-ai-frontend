import React from "react";
import { Divider, Grid, Typography,Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IconPlus } from "@tabler/icons-react";


const Competitors = ({ companyData }) => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        pb: 2
      }}>
      <Grid
        sx={{
          mb: 1
        }}>
        <Typography variant="AvgHeading">Competitors</Typography>
      </Grid>
      {companyData.competitors.map((value) => {
        return (
          <>
            <Grid container  key={value._id} 
            // sx={{borderBottom: "1px solid #EBEBEB"}}
            >
              <Grid size={3.3}>
                <Typography variant="smallGreyHeading">Name</Typography>
              </Grid>
              <Grid size={8.7}>
                <Typography variant="caption1">{value.name}</Typography>
              </Grid>
              <Grid container>
                <Grid size={3.3}>
                  <Typography variant="smallGreyHeading">
                    Website URL
                  </Typography>
                </Grid>
                <Grid size={8.7}>
                  <Typography variant="caption1">{value.websiteUrl}</Typography>
                </Grid>
              </Grid>
            </Grid>
            { value !== companyData.competitors[companyData.competitors.length - 1] && <Divider textAlign="center" sx={{borderColor:"#eeeeee", margin: "1rem 0.5rem",width:"90%" }} />}
          </>
        );
      })}
      <Grid
        sx={{
          mt: 2
        }}>
      
        <Button variant="button2" >
        Request Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Competitors;
