import { Chip, Divider, Grid, Typography } from '@mui/material'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import Component from '../Component'
const Topclients = ({companyData}) => {

   


  return (
    <>

      <Grid
        container
        columnSpacing={2}
        sx={[{
          mb: 2
        }, 12]}>
      <Grid size={4}>
          {companyData?.company?.topclients?.map((core, index) => (
             <Grid
               key={index}
               sx={{
                 mb: 1.5
               }}>
         
             <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
               {core}
             </Typography>
            
           </Grid>
          ))}
        </Grid>

        <Grid size={4}>
          {companyData?.competitors[0]?.topclients?.map((core, index) => (
            <Grid
              key={index}
              sx={{
                mb: 1.5
              }}>
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core}
            </Typography>
           
          </Grid>
          ))}
        </Grid>

        <Grid size={4}>
          {companyData?.competitors[1]?.topclients?.map((core, index) => (
            <Grid
              key={index}
              sx={{
                mb: 1.5
              }}>
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core}
            </Typography>
           
          </Grid>
          ))}
        </Grid>
          
      </Grid>
    </>
  );
}

export default Topclients