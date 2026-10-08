import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useForm, FormProvider, useFormContext } from "react-hook-form";

import Duration from "./EngagementQuestion/Questions/Duration";
import Contents from "./EngagementQuestion/Questions/Contents";
import ProductsServices from "./EngagementQuestion/Questions/ProductsServices";
import Personas from "./EngagementQuestion/Questions/Personas";
import IndustryTheme from "./EngagementQuestion/Questions/IndustryTheme";
import Review from "./EngagementQuestion/Questions/Review";
import { DevTool } from "@hookform/devtools";

import Loader from "../Loader";

const EngagementCampaign = ({
  Objective,
  industryData,
  engagementQues,
  setEngagementQuestion,
  setQuesnumber,
}) => {
  const methods = useForm();
  const { control } = methods;

  const handleQuestion = (direction) => {
    const questionKeys = Object.keys(engagementQues);
    const currentIndex = questionKeys.findIndex((key) => engagementQues[key]);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % questionKeys.length;
    } else if (direction === "back") {
      newIndex = (currentIndex - 1 + questionKeys.length) % questionKeys.length;
    }

    const newQuestionState = questionKeys.reduce((acc, key, index) => {
      acc[key] = index === newIndex;
      return acc;
    }, {});

    setEngagementQuestion(newQuestionState);
    setQuesnumber(newIndex);
  };

  console.log("engagementIndustryData", industryData);

  return (
    <>
      <FormProvider {...methods}>
        <Grid container sx={{
          p: 2
        }}>
          {/* Question-1 */}
          {engagementQues.first && (
            <Grid size={12}>
              <Duration handleQuestion={handleQuestion} />
            </Grid>
          )}

          {/* Question-2 */}
          {engagementQues.second && (
            <Grid size={12}>
              <Contents handleQuestion={handleQuestion} />
            </Grid>
          )}

          {/* Question-3 */}
          {engagementQues.third && (
            <Grid size={12}>
              <ProductsServices
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
            </Grid>
          )}

          {/* Question-4 */}
          {engagementQues.fourth && (
            <Grid size={12}>
              <Personas
                handleQuestion={handleQuestion}
                industryData={industryData.persona}
              />
            </Grid>
          )}

          {/* Question-5 */}
          {engagementQues.fifth && (
            <Grid size={12}>
              <IndustryTheme
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
            </Grid>
          )}

          {/* Quesrtion-6 */}
          {engagementQues.sixth && (
            <Grid size={12}>
              <Review
                handleQuestion={handleQuestion}
                Objective={Objective}
                industryData={industryData.persona}
              />
            </Grid>
          )}

          {/* Question-7 */}
          {engagementQues.seventh && (
            <Grid size={12}>
              <Loader />
            </Grid>
          )}
        </Grid>
      </FormProvider>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default EngagementCampaign;
