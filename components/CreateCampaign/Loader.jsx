import React from 'react';
import { Spin } from 'antd';
import { Typography } from '@mui/material';


const contentStyle = {
    marginTop:"6rem",
//   padding: 100,
//   background: 'rgba(0, 0, 0, 0.05)',

//   borderRadius: 4,
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
//   width: '100vw',
};

const spinStyle = {
  fontSize: '100rem',
};

const Loader = () => (
  <div style={containerStyle}>
    <Spin  size='large' >
      <div style={contentStyle} >
      <Typography variant='MainHeading' sx={{fontSize:"0.9rem",color:"#5687b4"}}>
        AI Campaign Creation
        </Typography>
      </div>
    </Spin>
  </div>
);

export default Loader;
