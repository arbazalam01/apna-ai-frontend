import React from 'react'
import { Dialog,Grid,ListItemButton,ListItemText,Typography } from '@mui/material'

const LogoutPopUP = ({handleLogout,openDialog,handleCloseDialog}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <Grid
        container
        sx={{
          p: 3,
          alignItems: "center"
        }}>
        <Typography>Are you sure you want to logout?</Typography>
        <ListItemButton onClick={handleLogout}>
          <ListItemText>
            <Typography sx={{ color: "red", padding: "0rem 2rem" }}>
              Yes
            </Typography>
          </ListItemText>
        </ListItemButton>
        <ListItemButton onClick={handleCloseDialog}>
          <ListItemText>
            <Typography>Cancel</Typography>
          </ListItemText>
        </ListItemButton>
      </Grid>
    </Dialog>
  );
}

export default LogoutPopUP