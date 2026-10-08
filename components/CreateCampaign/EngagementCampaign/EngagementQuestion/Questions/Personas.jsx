import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import PersonasQuestion1 from "./PersonasQuestion1";
import PersonaAttributes from "./PersonaAttributeQuestion";

const Personas = ({ handleQuestion, industryData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const { getValues, setValue } = useFormContext();

  const selectedPersonas = getValues("selectedPersonas") || [];
  const persona = selectedPersonas.map((id) =>
    industryData.find((p) => p._id == id)
  );

  const personaIndex = currentQuestion - 2;

  const currPersonaData = persona[personaIndex];

  const proceedToNext = () => setCurrentQuestion(currentQuestion + 1);
  const goBack = () => setCurrentQuestion(currentQuestion - 1);

  const renderQuestion = () => {
    if (currentQuestion === 1) {
      return (
        <Grid size={12}>
          <PersonasQuestion1
            handleQuestion={handleQuestion}
            industryData={industryData}
            proceedToNext={proceedToNext}
          />
        </Grid>
      );
    } else {
      return (
        <Grid size={12}>
          <PersonaAttributes
            persona={currPersonaData}
            goBack={goBack}
            proceedToNext={
              personaIndex + 1 === selectedPersonas.length
                ? () => handleQuestion("next")
                : proceedToNext
            }
          />
        </Grid>
      );
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
      {renderQuestion()}
    </Grid>
  );
};

export default Personas;
