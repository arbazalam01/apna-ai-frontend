import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Personas = ({ handleQuestion, industryData }) => {
  console.log("industryData", industryData);
  const methods = useFormContext();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const handleClick = () => {
    const data = getValues();
    if (data.selectedPersonas.length === 0) {
      alert("Please select at least one persona.");
    } else {
      console.log("Selected Persona IDs", data);
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
        {/* <Typography variant="caption2">
          Target Personas 
         
        </Typography>
        <br /> */}
        <Typography variant="AvgHeading">
          Which of these personas best fits this campaign’s target audience?
        </Typography>

        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          {industryData.map((persona, index) => (
            <FormControlLabel
              sx={{
                width: "70%",
                border: "1px solid #d2d2d2",
                borderRadius: 2,
                mb: 1,
                ml: 0,
              }}
              key={persona._id}
              control={
                <Controller
                  name="selectedPersonas"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "Please select at least one persona",
                  }}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value.includes(persona._id)}
                      onChange={(e) => {
                        const newSelection = e.target.checked
                          ? [...field.value, persona._id]
                          : field.value.filter((id) => id !== persona._id);
                        setValue("selectedPersonas", newSelection);
                      }}
                    />
                  )}
                />
              }
              label={
                <span style={{ fontSize: "0.87rem" }}>
                  {`${persona.designation} in ${persona.businessSize || ""} ${persona.organisation}`}
                </span>
              }
            />
          ))}
        </FormGroup>
        {errors.selectedPersonas && (
          <Typography color="error">
            {errors.selectedPersonas.message}
          </Typography>
        )}
      </Grid>

    </Grid>
  );
};

export default Personas;
