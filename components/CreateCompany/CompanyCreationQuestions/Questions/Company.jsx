import React from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import { useFormContext } from 'react-hook-form';


const Company = ({ nextStep }) => {
    const { control } = useFormContext();
  return (
    <>
      <Box >
               
                <Grid>
                  <Typography variant="caption8" sx={{
                    lineHeight: "2.5rem"
                  }}>Tell us about Yourself</Typography>
                </Grid>
                <Grid>
                  <Typography variant="smallGreyHeading1">
                    Our AI will analyze your platforms to gather information about your offerings, Target Audience, strengths, positioning, and anything else we can find.
                  </Typography>
                </Grid>
               
              
              </Box>
    </>
  );
}

export default Company