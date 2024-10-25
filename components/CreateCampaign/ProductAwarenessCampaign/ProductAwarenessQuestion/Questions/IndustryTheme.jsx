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

  const products = getValues("product");

  return (
    <>
      <Grid
        container
        minHeight={"75vh"}
        spacing={2}
        justifyContent={"space-between"}
        mb={10}
      >
        <Grid item xs={12}>
          <Typography variant="caption2">Industry Themes</Typography>
          <br />
          <Typography variant="AvgHeading">
            Does {products ? products : "PRODUCT"} address any of these themes trending in your industry ?


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
          item
          xs={12}
          display={"flex"}
          justifyContent={"start"}
          alignItems={"end"}
        >
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
