import React from 'react'
import {  Skeleton } from 'antd'
import { Grid } from '@mui/material'

const Loader = () => {
  return (<>
    <Grid p={8} container alignContent={"center"} >
    <Skeleton active />
    <Skeleton active />
    <Skeleton active />
  </Grid>
  </>
  )
}

export default Loader;