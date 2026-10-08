import React from 'react'

import { Box, Grid, Typography, Button } from '@mui/material'
import { useFormContext } from 'react-hook-form';



const BrandAssets = () => {
  return (
    <Box >

      <Grid>
        <Typography variant="caption8" sx={{
          lineHeight: "2.5rem"
        }}>Upload Brand Assets</Typography>
      </Grid>
      <Grid>
        <Typography variant="smallGreyHeading1">
        Sharing Brochures, Presentations, Marketing materials or other documents with us will help our AI create a richer knowledge base about your business and offerings. You can add or delete assets anytime in the future.
        </Typography>
      </Grid>

    </Box>
  );
}

export default BrandAssets;