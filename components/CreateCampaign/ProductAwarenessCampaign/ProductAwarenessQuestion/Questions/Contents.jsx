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

  const contentFormat = [
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
      minHeight={"75vh"}
      spacing={2}
      justifyContent={"space-between"}
      mb={10}
    >
      <Grid item xs={12}>
        <Typography variant="caption2">Content Formats</Typography>
        <br />
        <Typography variant="AvgHeading">
          Which of these formats do you want to include in the campaign?{" "}
        </Typography>
        <br />
        <Typography variant="caption">
          We’ve made a default selection for you, based on the campaign’s
          objective.{" "}
        </Typography>

        {/* Contents Type */}

        <FormGroup style={{ marginTop: "1rem" }}>
          {contentFormat.map((platform, idx) => (
            <FormControlLabel
              sx={{
                width: "70%",
                border: "1px solid #d2d2d2",
                borderRadius: 2,
                mb: 1,
              }}
              key={platform}
              control={
                <Controller
                  name="content_format"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={platform}
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
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="smallGreyHeading">FREQUENCY</Typography>
          </FormLabel>
          {Frequency && Frequency.length > 0 ? (
            Frequency.map((frequency, index) => (
              <FormControlLabel
                sx={{
                  width: "70%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mb: 1,
                }}
                key={index}
                control={
                  <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        checked={field.value === frequency}
                        onChange={() => {
                          setValue("frequency", frequency);
                        }}
                      />
                    )}
                  />
                }
                label={<span style={{ fontSize: "0.87rem" }}>{frequency}</span>}
              />
            ))
          ) : (
            // Debug: If services array is empty or doesn't exist
            <Typography>Currently Unavailable</Typography>
          )}
        </FormGroup>
      </Grid>

      {/* Buttons */}
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"end"}
      >
        <Button variant="button2" onClick={() => handleQuestion("back")}>
          Go Back
        </Button>

        <Button variant="button2" onClick={handleClick}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default Contents;
