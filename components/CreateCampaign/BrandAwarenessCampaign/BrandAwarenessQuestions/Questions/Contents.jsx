import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Styles from "@components/Calendar/CreateCalendar/CreateCalendar.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Contents = ({ handleQuestion }) => {
  const methods = useFormContext();
  const { control, handleSubmit, setValue, getValues } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content_format",
  });

  // const handleClick=()=>{
  //   const data=getValues()
  //   console.log("data",data)
  // }
  const Platforms = [
    "Linkedin Static Posts",
    "Linkedin Carousel Posts",
    "Linkedin Polls",
    "Blogs",
    "Podcasts",
    "Emails",
    "Case Studies",
    "WhitePapers",
    "Videos",
  ];

  const Frequency = ["Daily except Weekends", "Weekly", "Monthly"];
  const handleClick = () => {
    const { frequency } = getValues();
    if (!frequency) {
      alert("Please select Frequency .");
      return;
    }
    handleQuestion("next");
  };
  return (
    <Grid
      container
     spacing={2}
  
      sx={{
        justifyContent: "space-between"
      }}
  
    >
      <Grid size={12}>
        {/* <Typography variant="caption2">Content Formats</Typography>
        <br /> */}
        <Typography variant="AvgHeading">
          Which of these formats do you want to include in the campaign?{" "}
        </Typography>
        {/* <br />
        <Typography variant="caption">
          We’ve made a default selection for you, based on the campaign’s
          objective.{" "}
        </Typography> */}

        {/* Contents Type */}

        <FormGroup style={{ marginTop: "1rem" }}>
          {Platforms.map((platform, idx) => (
            <FormControlLabel
              sx={{
                width: "70%",
                border: "1px solid #d2d2d2",
                borderRadius: 2,
                mb: 1,
                ml: 0,
              }}
              key={platform}
              control={
                <Controller
                  name="content_format"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={(field.value || []).includes(platform)}
                      onChange={(e) => {
                        const checkedValue = e.target.checked;
                        const currentValue = field.value || [];
                        const updatedValue = checkedValue
                          ? [...currentValue, platform]
                          : currentValue.filter((id) => id != platform);
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                />
              }
              label={<span style={{ fontSize: "0.94rem" }}>{platform}</span>}
            />
          ))}
        </FormGroup>
  
      </Grid>

    </Grid>
  );
};

export default Contents;
