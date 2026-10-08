import React, { useState } from "react";
import {
  FormLabel,
  Drawer,
  Divider,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  duration,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const SelectCampaign = ({selectedObj, setSelectedObj}) => {



  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Stay Tuned !!",
      duration: 1,
    });
  };


  const data = [
    {
      name: "Brand Awareness",
      description:
        "Build general awareness around your brand, its products and services, and its strengths and positioning.",
    },
    {
      name: "Product Engagement",
      description:
        "Dive deep into one of your products or services’ features to spark conversations with prospective customers.",
    },
    {
      name: "Product Awareness",
      description:
        "Build awareness around a specific product or service, and how it addresses your users’ pain points and motivations.",
    },
    {
      name: "Event Promotion",
      description: "Build awareness and excitement around an upcoming event.",
    },
  ];

  const handleNavigate = (item) => {
    if (item.name === "Product Engagement" || item.name === "Product Awareness" || item.name === "Thought Leadership" || item.name === "Email Campaign" || item.name === "Event Promotion") {
      openNotificationWithIcon("success");
    } else {
      setSelectedObj(item);
 
     
      console.log("SELECTED item", item);

    }
  };

  return (
    <>
      {contextHolder}
      <div >
       

        <Grid
          sx={{
            px: 5,
            pt: 2
          }}
          size={12}>
          <FormLabel component="legend">
            <Typography variant="MainHeading">
            What kind of a Campaign do you want to create?
            </Typography>
          </FormLabel>
          <Grid
            container
            sx={{
              mt: 2,
              gap: 2
            }}>
            {data.map((item, index) => (
              <Grid
                key={index}
                onClick={() => handleNavigate(item)}
                sx={{
                  p: 2.5,

                  backgroundColor:
                    selectedObj?.name === item.name ? "#f0ffff" : "white",

                  borderRadius: 2,
                  border: "1px solid #D9D9D9",
                  cursor: "pointer",

                  "&:hover": {
                    backgroundColor: "#f6fffe", // Change background color on hover
                  }
                }}
                size={3.5}>
                <Typography variant="caption6-1">{item.name}</Typography>
                <br />
                <Typography variant="caption1-1">{item.description}</Typography>
              </Grid>
            ))}
          </Grid>

        
        </Grid>
      </div>
    </>
  );
};

export default SelectCampaign;
