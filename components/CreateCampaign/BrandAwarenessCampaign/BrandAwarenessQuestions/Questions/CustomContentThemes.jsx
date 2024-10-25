import { useState } from "react";
import {

  Checkbox,
  FormControlLabel,
  FormGroup,

  Grid,
 
  Typography,
} from "@mui/material";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { styled } from '@mui/material/styles';
import AutoModeIcon from "@mui/icons-material/AutoMode";


const CustomContentThemes = () => {
  const methods = useFormContext();

  const { control, handleSubmit, setValue, getValues } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content_format",
  });




  const Platforms = [
    "AI-powered innovation tailored to industry specific content needs",
    "The growth and loyalty benefits of delivering personalized content",
    "A comprehensive provider of High ROI, end to end content delivery",
    "Content tailored to your brand identity",
    "Impactful content through a seamless content delivery experience",
  ];

  return (
    <Grid container spacing={2} justifyContent={"space-between"}>
      <Grid item container xs={12} ><Typography variant="AvgHeading" style={{fontSize:"1.4rem",lineHeight:"0.4rem"}}>
          We've generated new themes based on your input.
        </Typography></Grid>
      <Grid item container xs={12}   >
        <Grid> <Typography variant="AvgHeading" style={{lineHeight:"1.7rem"}}>
          Choose upto 3 themes to build your campaign around.
        </Typography></Grid>
        <Grid ml={6.5} alignContent={"center"}><AutoModeIcon
                  
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "#868686",
                    }}
                  /></Grid>
       
      

       
      </Grid>
      {/* ---------- */}
      <Grid item xs={12} >
      <FormGroup style={{ marginTop: "0.5rem" }}>
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

export default CustomContentThemes;
