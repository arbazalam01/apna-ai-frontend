import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import api from "@utils/api";

import Duration from "./BrandAwarenessQuestions/Questions/Duration";
import Contents from "./BrandAwarenessQuestions/Questions/Contents";
import ProductsServices from "./BrandAwarenessQuestions/Questions/ProductsServices";
import Personas from "./BrandAwarenessQuestions/Questions/Personas";
import IndustryTheme from "./BrandAwarenessQuestions/Questions/IndustryTheme";
import Review from "./BrandAwarenessQuestions/Questions/Review";
import StrengthPositioning from "./BrandAwarenessQuestions/Questions/StrengthPositioning";
import Loader from "../Loader";

const ThoughtLeadershipCampaign = ({
  Objective,
  industryData,
  leadershipQues,
  setLeadershipQuestion,
  setQuesnumber,
}) => {
  const methods = useForm();
  const { control } = methods;

  const handleQuestion = (direction) => {
    const questionKeys = Object.keys(leadershipQues);
    const currentIndex = questionKeys.findIndex(
      (key) => leadershipQues[key]
    );
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

    setLeadershipQuestion(newQuestionState);
    setQuesnumber(newIndex);
  };

  console.log("brandAwarenesstIndustryData", industryData);

  return (
    <>
      <FormProvider {...methods}>
        <Grid container p={2}>
          {/* Question-1 */}
          {leadershipQues.first && (
            <Grid item xs={12}>
              <Duration handleQuestion={handleQuestion} />
            </Grid>
          )}

          {/* Question-2 */}
          {leadershipQues.second && (
            <Grid item xs={12}>
              <Contents handleQuestion={handleQuestion} />
            </Grid>
          )}
          {/* Question-3 */}
          {leadershipQues.third && (
            <Grid item xs={12}>
               <IndustryTheme
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
             
            </Grid>
          )}

          {/* Question-4 */}
          {leadershipQues.fourth && (
            <Personas
            handleQuestion={handleQuestion}
            industryData={industryData.persona}
          />
          
          )}

          {/* Question-5 */}
          {leadershipQues.fifth && (
            <Grid item xs={12}>
               <ProductsServices
              handleQuestion={handleQuestion}
              industryData={industryData.data[0]}
            /> 
            </Grid>
          )}

          {/* Question-6 */}
          {leadershipQues.sixth && (
            <Grid item xs={12}>
              <StrengthPositioning
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
            </Grid>
          )}

          {/* Quesrtion-7 */}
          {leadershipQues.seventh && (
            <Grid item xs={12}>
              <Review handleQuestion={handleQuestion} Objective={Objective} />
            </Grid>
          )}

          {/* Question-8 */}
          {leadershipQues.eighth && (
            <Grid item xs={12}>
              <Loader />
            </Grid>
          )}
        </Grid>
      </FormProvider>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default ThoughtLeadershipCampaign;
