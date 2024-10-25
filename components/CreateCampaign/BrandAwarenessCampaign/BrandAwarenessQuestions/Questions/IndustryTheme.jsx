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

  const themes = industryData?.companyId.industries || [];

  const handleClick = () => {
    const data = getValues();
    console.log("Form Data", data);
  };

  return (
    <>
      <Grid
        container
     
        spacing={2}
        justifyContent={"space-between"}
   
      >
        <Grid item xs={12}>
          {/* <Typography variant="caption2">Industry Themes</Typography>
          <br /> */}
          <Typography variant="AvgHeading">
          Which industries do you want to target?
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
                  ml: 0,
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

        
      </Grid>
    </>
  );
};

export default IndustryTheme;
