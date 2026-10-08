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

const StrengthPositioning = ({ handleQuestion, industryData }) => {
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
        minHeight: "75vh",
        justifyContent: "space-between",
        mb: 10
      }}>
      <Grid size={12}>
        <Typography variant="caption2" sx={{
          lineHeight: 2
        }}>
          Strength and Positioning
        </Typography>
        <br />

        {currentQuestion === 1 && (
          <>
            <Typography variant="AvgHeading">
               Pick the strengths you want to emphasise through this campaign.
            </Typography>

            {/* Strengths */}
            <FormGroup style={{ margin: "0.5rem 0rem" }}>
              <FormLabel component="legend">
                <Typography variant="smallGreyHeading">STRENGTH</Typography>
              </FormLabel>
              {Strengths.map((strength, index) => (
                <FormControlLabel
                sx={{
                  width: "100%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mt: 1,
                  pt: 1,
                  pb: 1,
                  pr: 1,
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
                  label={<span style={{ fontSize: "0.87rem" }}>{strength?.description
}</span>}
                />
              ))}
            </FormGroup>
          </>
        )}

        {currentQuestion === 2 && (
          <>
            <Typography variant="AvgHeading">
              How would you like to <b>position</b> your brand through this campaign.
            </Typography>
            {/* Positioning */}
            <FormGroup style={{ margin: "0.5rem 0rem" }}>
              <FormLabel component="legend">
                <Typography variant="smallGreyHeading">POSITIONING</Typography>
              </FormLabel>
              {Positioning.map((positioning, index) => (
                <FormControlLabel
                sx={{
                  width: "70%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mt: 1,
                 
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
          </>
        )}

        {currentQuestion === 3 && (
          <>
            <Typography variant="AvgHeading">
            Pick the most differentiator most relevant to this campaign
            </Typography>
            {/* Key Differentiator */}
            <FormGroup style={{ margin: "0.5rem 0rem" }}>
              <FormLabel component="legend">
                <Typography variant="smallGreyHeading">
                  KEY DIFFERENTIATOR
                </Typography>
              </FormLabel>
              {KeyDifferentiator.map((keyDifferentiator, index) => (
                <FormControlLabel
                sx={{
                  width: "100%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mt: 1,
                  pt: 1,
                  pb: 1,
                  pr: 1,
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
                  label={<span style={{ fontSize: "0.87rem" }}>{keyDifferentiator?.description}</span>}
                />
              ))}
            </FormGroup>
          </>
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
        <Button variant="button2" onClick={handleBack}>
          Go Back
        </Button>
        <Button variant="button2" onClick={handleNext}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default StrengthPositioning;
