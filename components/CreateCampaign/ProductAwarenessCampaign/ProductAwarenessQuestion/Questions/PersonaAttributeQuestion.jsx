import React, { useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Button,
  FormLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const PersonaAttributes = ({ persona, goBack, proceedToNext }) => {
  const { control, getValues, resetField } = useFormContext();

  useEffect(() => {
    resetField(`PainPoints.${persona._id}`);
    resetField(`Motivations.${persona._id}`);
    resetField(`KPIs.${persona._id}`);
  }, [persona]);

  const products = getValues("product");

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
          Target Personas /{" "}
          <span style={{ fontWeight: "300", color: "gray" }}>
            Question 2 of 2
          </span>
        </Typography>
        <br />
        <Typography variant="AvgHeading">
          Does {products ? products : "PRODUCT"} address any of these attributes
          for {persona?.designation}?
        </Typography>
        <FormLabel component="legend" sx={{ mb: 1, mt: 1 }}>
          <Typography variant="smallGreyHeading">PAIN POINTS</Typography>
        </FormLabel>
        {/* <Typography variant="smallGreyHeading">Pain Points</Typography> */}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          {persona.PainPoints.map((painPoint, index) => (
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
                  name={`PainPoints.${persona._id}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      defaultValue={[]}
                      checked={(field.value || []).includes(painPoint)}
                      onChange={(e) => {
                        const checkedValue = e.target.checked;
                        const currentValue = field.value || [];
                        const updatedValue = checkedValue
                          ? [...currentValue, painPoint]
                          : currentValue.filter((id) => id != painPoint);
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                />
              }
              label={<span style={{ fontSize: "0.87rem" }}>{painPoint}</span>}
            />
          ))}
        </FormGroup>
        <FormLabel component="legend" sx={{ mb: 1, mt: 1 }}>
          <Typography variant="smallGreyHeading">MOTIVATIONS</Typography>
        </FormLabel>{" "}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          {persona.Motivations.map((motivation, index) => (
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
                  name={`Motivations.${persona._id}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={(field.value || []).includes(motivation)}
                      onChange={(e) => {
                        const checkedValue = e.target.checked;
                        const currentValue = field.value || [];
                        const updatedValue = checkedValue
                          ? [...currentValue, motivation]
                          : currentValue.filter((id) => id != motivation);
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                />
              }
              label={<span style={{ fontSize: "0.87rem" }}>{motivation}</span>}
            />
          ))}
        </FormGroup>
        <FormLabel component="legend" sx={{ mb: 1, mt: 1 }}>
          <Typography variant="smallGreyHeading">KPIs</Typography>
        </FormLabel>{" "}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          {persona.KPIs.map((kpi, index) => (
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
                  name={`KPIs.${persona._id}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={(field.value || []).includes(kpi)}
                      onChange={(e) => {
                        const checkedValue = e.target.checked;
                        const currentValue = field.value || [];
                        const updatedValue = checkedValue
                          ? [...currentValue, kpi]
                          : currentValue.filter((id) => id != kpi);
                        field.onChange(updatedValue);
                      }}
                    />
                  )}
                />
              }
              label={<span style={{ fontSize: "0.87rem" }}>{kpi}</span>}
            />
          ))}
        </FormGroup>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "end"
        }}
        size={12}>
        <Button variant="button2" onClick={goBack}>
          Go Back
        </Button>
        <Button variant="button2" onClick={() => proceedToNext()}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonaAttributes;
