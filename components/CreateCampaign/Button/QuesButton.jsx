import { Button, Grid } from '@mui/material'
import React from 'react'

const QuesButton = ({handleQuestion}) => {
  return (
<Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"end"}
        >
          <Button  variant="button2" onClick={() => handleQuestion("back")}>
            Go Back
          </Button>

          <Button variant="button2" onClick={() => handleQuestion("next")} >Proceed</Button>
        </Grid>

)
}

export default QuesButton