import { Box, Chip, Divider, Grid, Typography } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Component from "../Component";
const BlogAnalysis = ({companyData}) => {
  return (
    <>

      <Grid
        container
        columnSpacing={2}
        sx={[{
          mb: 2
        }, 12]}>
      <Grid size={4}>
            {companyData?.company?.blogs?.titles?.map((core, index) => (
              <Grid
                key={index}
                sx={{
                  mb: 1.5
                }}>
           
              <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
                {core.title}
              </Typography>
             
            </Grid>
            ))}
          </Grid>

          <Grid size={4}>
            {companyData?.competitors[0]?.blogs?.titles?.map((core, index) => (
               <Grid
                 key={index}
                 sx={{
                   mb: 1.5
                 }}>
           
               <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
                 {core.title}
               </Typography>
              
             </Grid>
            ))}
          </Grid>
         
          <Grid size={4}>
            {companyData?.competitors[1]?.blogs?.titles?.map((core, index) => (
              <Grid
                key={index}
                sx={{
                  mb: 1.5
                }}>
           
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
