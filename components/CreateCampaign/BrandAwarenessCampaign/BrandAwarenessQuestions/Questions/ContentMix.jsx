import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import OutlinedInput from '@mui/material/OutlinedInput';

const ContentMix = ({ handleQuestion }) => {
  const methods = useFormContext();
  const { control, handleSubmit, setValue, getValues } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content_mix",
  });

  const themes = getValues("selectedThemes");
  console.log("themes", themes);

  const contentFormat = getValues("content_format");

  

  return (
    <Grid container spacing={2} sx={{
      justifyContent: "space-between"
    }}>
      <Grid size={12}>
        <Typography variant="AvgHeading">
          Based on your input, here is the recommended Content Mix{" "}
        </Typography>
        <br />
        <Typography variant="caption">
          Adjust the values to match your preferences.
        </Typography>
        <br />
        <br />

        {/* Contents Type */}
        <Grid container sx={{
          gap: 3
        }}>
          {themes && themes?.map((theme, themeIndex) => (
            <Box
              key={themeIndex}
              style={{
                borderRadius: "7px",
                boxShadow: "0 0 6px 0 rgb(0 0 0 / 18%)",
                width: "250px",
                padding: "1rem"
              }}
            >
              <Typography variant="smallGreyHeading2">THEME</Typography>
              <br />
              <Typography variant="caption">{theme}</Typography>
              <Grid container spacing={0.7} sx={{
                mt: 2
              }}>
                {contentFormat && contentFormat?.map((item, formatIndex) => (
                  <Grid key={formatIndex} size={12}>
                    <Grid container sx={{
                      alignItems: "center"
                    }}>
                      <Grid size={9}>
                        <Typography variant="smallGreyHeading2">
                          {item.toUpperCase()}
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{
                          textAlign: "right"
                        }}
                        size={3}>

                        <Controller
                          name={`content_mix[${themeIndex}].${item}`} // Path in the form state
                          control={control}
                          render={({ field }) => (
                            <FormControl>
                              <OutlinedInput
                                {...field}
                                
                                style={{ width: "50px", height: "26px",padding:"0px" }}
                                defaultValue={0}
                                
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value}
                              />
                            </FormControl>
                          )}
                          />
                         
                      </Grid>
                    </Grid>

                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContentMix;
