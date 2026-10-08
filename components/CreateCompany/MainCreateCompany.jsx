import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CreateCompany from "./CreateCompany";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";


const MainCreateCompany = () => {


  const methods = useForm();
  const { control } = methods;
  const {
    fields: competitorsField,
    append: competitorsAppend,
    remove: competitorsRemove,
  } = useFieldArray({
    control,
    name: "competitors",
  });

  const queryClient = useQueryClient();

  const AddSection = () => {
    competitorsAppend({ name: "", websiteUrl: "", linkedinUrl: "" });
  };

  const DeleteSection = (index) => {
    competitorsRemove(index);
  };

 

  return (
    <>
      <FormProvider {...methods}>
        <Grid
          container
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}>
        
          <Grid size={8.5}>
            <CreateCompany
              competitorsField={competitorsField}
              AddSection={AddSection}
              DeleteSection={DeleteSection}
            />
          </Grid>
        </Grid>
      </FormProvider>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default MainCreateCompany;
