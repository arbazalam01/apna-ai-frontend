import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Differentiator = ({ handleQuestion, industryData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const methods = useFormContext();
  const { control, setValue, getValues } = methods;

  const KeyDifferentiator =
    industryData?.companyId?.marketposition?.keydifferentiators || [];

  

 
  return (
    <Grid
      container

      spacing={2}
      sx={{
        justifyContent: "space-between"
      }}

    >
      <Grid size={12}>
        {/* <Typography variant="caption2" lineHeight={2}>
          Strength and Positioning
        </Typography>
        <br /> */}

        <Typography variant="AvgHeading">
          Pick the most relevant key differentiator
        </Typography>
        {/* Key Differentiator */}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          
          {KeyDifferentiator.map((keyDifferentiator, index) => (
            <FormControlLabel
              sx={{
                width: "70%",
                border: "1px solid #d2d2d2",
                borderRadius: 2,
                mb: 1,
                ml: 0,
              }}
              key={keyDifferentiator?.name}
              control={
                <Controller
                  name="keyDifferentiator"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={(field.value || []).includes(
                        keyDifferentiator.name
                      )}
                      onChange={(e) => {
                        const checkedValue = e.target.checked;
                        const currentValue = field.value || [];
                        const updatedValue = checkedValue
                          ? [...currentValue, keyDifferentiator.name]
                          : currentValue.filter(
                              (id) => id != keyDifferentiator.name
                            );
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                />
              }
              label={
                <span style={{ fontSize: "0.87rem" }}>
                  {keyDifferentiator?.name}
                </span>
              }
            />
          ))}
        </FormGroup>
      </Grid>

    </Grid>
  );
};

export default Differentiator;
