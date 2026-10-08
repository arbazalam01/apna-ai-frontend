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

const CreateCalendar = ({ open, onClose }) => {
  const { companyId } = useParams();
  const [selectedObj, setSelectedObj] = useState(null);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Stay Tuned !!",
      duration: 1,
    });
  };

  const navigate = useNavigate();
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
      name: "Thought Leadership",
      description:
        "Create content around trending industry themes to establish your brand as a thought leader.",
    },
    {
      name: "Email Campaign",
      description:
        "Squeeze the most out of email marketing with an extensive, hyper-personalised email campaign.",
    },
    {
      name: "Event Promotion",
      description: "Build awareness and excitement around an upcoming event.",
    },
  ];

  const handleNavigate = (item) => {
    if (item.name === "Email Campaign" || item.name === "Event Promotion") {
      openNotificationWithIcon("success");
    } else {
      setSelectedObj(item);
      const selectedObjective = new URLSearchParams();
      selectedObjective.set("selectedObj", JSON.stringify(item.name));
      navigate(`/${companyId}/create-campaign?${selectedObjective.toString()}`);
      onClose();
    }
  };

  return (
    <>
      <Drawer open={open} onClose={onClose} anchor={"right"}>
        {contextHolder}
        <div style={{ width: "960px" }}>
          {/* <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 9,
              mb: 1,
            }}
          >
            <Grid container size={7} sx={{ pl: 5 }}>
              <Typography variant="Heading">Create New Campaign</Typography>
            </Grid>
          </Grid>
          <Divider /> */}

          <Grid
            sx={{
              pl: 5,
              pt: 10
            }}
            size={12}>
            <FormLabel component="legend">
              <Typography variant="MainHeading">
                What is the Campaign’s Objective?{" "}
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
                  <Typography variant="caption1-1">
                    {item.description}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Grid container sx={{
              pt: 10
            }}>
              <Button variant="button2" onClick={onClose}>
                Cancel
              </Button>
              {loading && (
                <Box
                  sx={{
                    marginTop: "0.5rem",
                    marginRight: "1.5rem"
                  }}>
                  <CircularProgress size={"1.8rem"} />
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </>
  );
};

export default CreateCalendar;
