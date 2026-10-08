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
        minHeight: "75vh",
        justifyContent: "space-between",
        mb: 10
      }}>
      <Grid size={12}>
        <Typography variant="caption2">
          Target Personas 
          {/* <span style={{ fontWeight: "300", color: "gray" }}>
            Question 1 of 2
          </span> */}
        </Typography>
        <br />
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
                  {`${persona.designation} in ${persona.industry}`}
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

        <Button variant="button2" onClick={handleClick}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default Personas;
