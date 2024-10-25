import React, { useState } from 'react'
import CreateCustomer from './CreateCustomer';
import { Grid,Typography, Button } from '@mui/material';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';



const AdminDashHeader = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();
  
    const handleCreate = () => {
      navigate("/addcompany");
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  return (
<>

<Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

          }}

        >
          <Typography id="title" variant="Heading-head">
            Customers
          </Typography>
          <Tooltip title="New Customer" placement={"left"} zIndex={10000}>
          <Button
            variant="button1"

            onClick={handleCreate}
          >
<img src="/Icons/Misc/CreateNew.svg" alt="create" height={15}  />
          </Button>
          </Tooltip>
          {/* <CreateCustomer open={isModalOpen} onClose={handleCloseModal} /> */}
        </Grid>
</>


)
}

export default AdminDashHeader