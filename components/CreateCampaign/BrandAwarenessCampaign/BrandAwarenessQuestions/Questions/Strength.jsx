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

const Strength = ({ handleQuestion, industryData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const methods = useFormContext();
  const { control, setValue, getValues } = methods;

  const Strengths = industryData?.companyId?.swotanalysis?.strengths || [];
  const Positioning =
    industryData?.companyId?.marketposition?.positioning || [];
  const KeyDifferentiator =
    industryData?.companyId?.marketposition?.keydifferentiators || [];

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      handleQuestion("back");
    }
  };

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleQuestion("next");
    }
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
        {/* <Typography variant="caption2" lineHeight={2}>
          Strength and Positioning
        </Typography>
        <br /> */}

          <Typography variant="AvgHeading">
             Which Strengths do you want to emphasise on ?
          </Typography>

          {/* Strengths */}
          <FormGroup style={{ margin: "0.5rem 0rem" }}>
           
            {Strengths.map((strength, index) => (
              <FormControlLabel
              sx={{
                  width: "70%",

                border: "1px solid #d2d2d2",
                borderRadius: 2,
                mt: 1,
                ml: 0,
               
              }}
                key={strength.name}
                control={
                  <Controller
                    name="strength"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={(field.value || []).includes(strength.name)}
                        onChange={(e) => {
                          const checkedValue = e.target.checked;
                          const currentValue = field.value || [];
                          const updatedValue = checkedValue
                            ? [...currentValue, strength.name]
                            : currentValue.filter(
                                (id) => id != strength.name
                              );
                          field.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                }
                label={<span style={{ fontSize: "0.87rem" }}>{strength?.name
}</span>}
              />
            ))}
          </FormGroup>
       

     
      </Grid>

    </Grid>
  );
};

export default Strength;
