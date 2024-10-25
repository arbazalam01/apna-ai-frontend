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

const Positioning = ({ handleQuestion, industryData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const methods = useFormContext();
  const { control, setValue, getValues } = methods;

  const Positioning =
    industryData?.companyId?.marketposition?.positioning || [];
 

  return (
    <Grid
      container
     
      spacing={2}
      justifyContent={"space-between"}
   
    >
      <Grid item xs={12}>
        {/* <Typography variant="caption2" lineHeight={2}>
          Strength and Positioning
        </Typography>
        <br /> */}

   
            <Typography variant="AvgHeading">
              How would you like to position your brand through this campaign.
            </Typography>
            {/* Positioning */}
            <FormGroup style={{ margin: "0.5rem 0rem" }}>
              
              {Positioning.map((positioning, index) => (
                <FormControlLabel
                sx={{
                  width: "70%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mt: 1,
                  ml: 0,
                 
                }}
                  key={positioning.name}
                  control={
                    <Controller
                      name="positioning"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          checked={(field.value || []).includes(
                            positioning.name
                          )}
                          onChange={(e) => {
                            const checkedValue = e.target.checked;
                            const currentValue = field.value || [];
                            const updatedValue = checkedValue
                              ? [...currentValue, positioning.name]
                              : currentValue.filter(
                                  (id) => id != positioning.name
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                      )}
                    />
                  }
                  label={
                    <span style={{ fontSize: "0.87rem" }}>
                      {positioning.name}
                    </span>
                  }
                />
              ))}
            </FormGroup>
        

    

   
      </Grid>

    </Grid>
  );
};

export default Positioning;
