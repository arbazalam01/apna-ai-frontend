import React from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

const IndustryTheme = ({ handleQuestion, industryData }) => {
  const methods = useFormContext();
  const { control, getValues, setValue } = methods;

  const themes = industryData?.toptrends || [];

  const handleClick = () => {
    const data = getValues();
    console.log("Form Data", data);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "75vh",
          justifyContent: "space-between",
          mb: 10
        }}>
        <Grid size={12}>
          <Typography variant="caption2">Industry Themes</Typography>
          <br />
          <Typography variant="AvgHeading">
            Select the trending themes you want to talk about in this campaign.
          </Typography>

          {/* Checkbox group */}
          <FormGroup style={{ margin: "0.5rem 0rem" }}>
            {themes.map((theme, index) => (
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
                    name="industryThemes"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={(field.value || []).includes(theme)}
                        onChange={(e) => {
                          const checkedValue = e.target.checked;
                          const currentValue = field.value || [];
                          const updatedValue = checkedValue
                            ? [...currentValue, theme]
                            : currentValue.filter((id) => id != theme);
                          field.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                }
                label={<span style={{ fontSize: "0.87rem" }}>{theme}</span>}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Buttons */}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "end"
          }}
          size={12}>
          <Button variant="button2" onClick={() => handleQuestion("back")}>
            Go Back
          </Button>
          <Button
            variant="button2"
            onClick={() => {
              handleClick();
              handleQuestion("next");
            }}
          >
            Proceed
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default IndustryTheme;
