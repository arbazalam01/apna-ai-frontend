import React from 'react'
import {  Skeleton } from 'antd'
import { Grid } from '@mui/material'

const Loader = () => {
  return (
    <>
      <Grid
        container
        sx={{
          p: 8,
          alignContent: "center"
        }}>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </Grid>
    </>
  );
}

export default Loader;