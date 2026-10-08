import { Box, Button, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import Styles from "@components/Calendar/CreateCalendar/CreateCalendar.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Duration = ({ handleQuestion }) => {
  const { control, getValues } = useFormContext();

  const handleClick = () => {
    const { startDate, endDate } = getValues();

    if (!startDate || !endDate) {
      alert("Please select Start Date and End Date .");
      return;
    }
    handleQuestion("next"); 
  };


  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "75vh",
        justifyContent: "space-between",
        mb: 10
      }}>
      <Grid size={12}>
        <Typography variant="caption2">Duration</Typography>
        <br />
        <Typography variant="AvgHeading">
          Set a starting date and an ending date for the campaign.
        </Typography>

        {/* Time */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{
            pt: 2
          }}>
            <Grid sx={{
              mb: 7
            }}>
              <Controller
                control={control}
                name="startDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    label="Pick Start Date"
                    className={Styles.date_picker}
                    value={field.value}
                    inputRef={field.ref}
                    sx={{ backgroundColor: "#fff", boxShadow: "none", border: "none", outline: "none" }}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid>
              <Controller
                control={control}
                name="endDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    label="Pick End Date"
                    className={Styles.date_picker}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                )}
              />
            </Grid>
          </Box>
        </LocalizationProvider>
      </Grid>

      {/* Buttons */}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "end"
        }}
        size={12}>
        <Button variant="button2" disabled >
          Go Back
        </Button>
        <Button variant="button2" onClick={handleClick}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default Duration;
