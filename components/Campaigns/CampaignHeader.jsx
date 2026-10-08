import React,{useState} from 'react'
import { Grid, Typography, Button } from '@mui/material';
import CreateCalendarNew from "@components/Calendar/CreateCalendar/CreateCalendarNew";
import create from "/Icons/Misc/CreateNew.svg"
import { Tooltip } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const CampaignHeader = () => {

const {companyId} = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
const navigate = useNavigate();

    const handleOpenModal = () => {
        setModalOpen(true);
      };

      const handleCloseModal = () => {
        setModalOpen(false);
      };

      const handleNavigate = () => {
        navigate(`/${companyId}/create-campaign`);
      };
  return (
    <Grid
      container
      sx={{


        // justifyContent: "space-between",
        alignItems: "center",

        // paddingY: 3.3,



      }}
    >
      <Grid size={8}>
        <Typography variant="Heading-head">Campaigns</Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "right"
        }}
        size={4}>
        <Tooltip title="Create Campaign" placement={"left"} zIndex={10000}>
        <Button
          variant="button1"
          onClick={handleNavigate}
        //   startIcon={<AddIcon />}
        >
<img src={create} alt="create" height={15}  />
        </Button></Tooltip>
      </Grid>
      {/* <CreateCalendarNew open={isModalOpen} onClose={handleCloseModal} /> */}
    </Grid>
  );
}

export default CampaignHeader