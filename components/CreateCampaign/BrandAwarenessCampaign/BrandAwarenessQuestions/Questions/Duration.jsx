import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import Styles from "@components/Calendar/CreateCalendar/CreateCalendar.module.css";

const durationOptions = ["1 week", "3 weeks", "1 month", "custom"];

const Duration = ({ handleQuestion }) => {
  const { control, getValues, setError, clearErrors } = useFormContext();
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleClick = () => {
    const { startDate, endDate } = getValues();

    if (!startDate || (!endDate && selectedDuration === "custom")) {
      alert("Please select Start Date and End Date.");
      return;
    }
    handleQuestion("next");
  };

  return (
    <Grid container spacing={2} justifyContent={"space-between"}>
      <Grid item xs={12}>
        <Typography variant="AvgHeading">
          Set the starting date and duration of the campaign.
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box pt={2} style={{ width: "40%" }}>
            {/* Start Date */}
            <Grid mb={7}>
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
                    sx={{width: "100%", backgroundColor: "#fff", boxShadow: "none", border: "none", outline: "none" }}
                    onChange={(date) => {
                      field.onChange(date);
                      clearErrors("endDate"); // Clear any previous endDate error when startDate changes
                    }}
                  />
                )}
              />
            </Grid>

            {/* Duration Dropdown */}
            <Grid mb={3}>
              <FormControl fullWidth>
                <InputLabel id="duration-label">Duration</InputLabel>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select
                      labelId="duration-label"
                      label="Duration"
                      value={selectedDuration}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setSelectedDuration(e.target.value);
                      }}
                    >
                      {durationOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* End Date (Conditional) */}
            {selectedDuration === "custom" && (
              <Grid mb={3}>
                <Controller
                  control={control}
                  name="endDate"
                  rules={{
                    required: true,
                    validate: (value) => {
                      const { startDate } = getValues();
                      if (startDate && value && value.isBefore(startDate, 'day')) {
                        return "End date cannot be before start date.";
                      }
                      return true;
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <DatePicker
                        label="Pick End Date"
                        className={Styles.date_picker}
                        value={field.value}
                        sx={{width: "100%", backgroundColor: "#fff", boxShadow: "none", border: "none", outline: "none" }}
                        inputRef={field.ref}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                      />
                      {error && <Typography color="error">{error.message}</Typography>}
                    </>
                  )}
                />
              </Grid>
            )}
          </Box>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Duration;
