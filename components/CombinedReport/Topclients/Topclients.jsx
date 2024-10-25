import { Chip, Divider, Grid, Typography } from '@mui/material'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import Component from '../Component'
const Topclients = ({companyData}) => {

   


  return (

<>

      <Grid container sx={12} columnSpacing={2} mb={2} >
      <Grid item xs={4}>
          {companyData?.company?.topclients?.map((core, index) => (
             <Grid item key={index} mb={1.5} >
         
             <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
               {core}
             </Typography>
            
           </Grid>
          ))}
        </Grid>

        <Grid item xs={4}>
          {companyData?.competitors[0]?.topclients?.map((core, index) => (
            <Grid item key={index} mb={1.5} >
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core}
            </Typography>
           
          </Grid>
          ))}
        </Grid>

        <Grid item xs={4}>
          {companyData?.competitors[1]?.topclients?.map((core, index) => (
            <Grid item key={index} mb={1.5} >
         
            <Typography variant="caption" sx={{fontSize:"0.9rem"}} >
              {core}
            </Typography>
           
          </Grid>
          ))}
        </Grid>
          
      </Grid>
    </>
)
}

export default Topclients