import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Component from "../Component";
const BlogAnalysis = ({companyData}) => {
  return (
    <>

    <Grid container sx={12} columnSpacing={2} mb={2} >
    <Grid item xs={4}>
          {companyData?.company?.blogs?.titles?.map((core, index) => (
            <Grid item key={index} mb={1.5} >
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core.title}
            </Typography>
           
          </Grid>
          ))}
        </Grid>

        <Grid item xs={4}>
          {companyData?.competitors[0]?.blogs?.titles?.map((core, index) => (
             <Grid item key={index} mb={1.5} >
         
             <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
               {core.title}
             </Typography>
            
           </Grid>
          ))}
        </Grid>
       
        <Grid item xs={4}>
          {companyData?.competitors[1]?.blogs?.titles?.map((core, index) => (
            <Grid item key={index} mb={1.5} >
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core.title}
            </Typography>
           
          </Grid>
          ))}
        </Grid>
        
    </Grid>
  </>
  );
};

export default BlogAnalysis;
