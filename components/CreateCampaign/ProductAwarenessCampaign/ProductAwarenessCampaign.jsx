import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useForm, FormProvider, useFormContext } from "react-hook-form";

import Duration from "./ProductAwarenessQuestion/Questions/Duration";
import Contents from "./ProductAwarenessQuestion/Questions/Contents";
import ProductsServices from "./ProductAwarenessQuestion/Questions/ProductsServices";
import Personas from "./ProductAwarenessQuestion/Questions/Personas";
import IndustryTheme from "./ProductAwarenessQuestion/Questions/IndustryTheme";
import Review from "./ProductAwarenessQuestion/Questions/Review";
import { DevTool } from "@hookform/devtools";

import Loader from "../Loader";

const ProductAwarenessCampaign = ({
  Objective,
  industryData,
  productAwarenessQues,
  setProductAwarenessQuestion,
  setQuesnumber,
}) => {
  const methods = useForm();
  const { control } = methods;

  const handleQuestion = (direction) => {
    const questionKeys = Object.keys(productAwarenessQues);
    const currentIndex = questionKeys.findIndex((key) => productAwarenessQues[key]);
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

    setProductAwarenessQuestion(newQuestionState);
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
          {productAwarenessQues.first && (
            <Grid size={12}>
              <Duration handleQuestion={handleQuestion} />
            </Grid>
          )}

          {/* Question-2 */}
          {productAwarenessQues.second && (
            <Grid size={12}>
              <Contents handleQuestion={handleQuestion} />
            </Grid>
          )}

          {/* Question-3 */}
          {productAwarenessQues.third && (
            <Grid size={12}>
              <ProductsServices
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
            </Grid>
          )}

          {/* Question-4 */}
          {productAwarenessQues.fourth && (
            <Grid size={12}>
              <Personas
                handleQuestion={handleQuestion}
                industryData={industryData.persona}
              />
            </Grid>
          )}

          {/* Question-5 */}
          {productAwarenessQues.fifth && (
            <Grid size={12}>
              <IndustryTheme
                handleQuestion={handleQuestion}
                industryData={industryData.data[0]}
              />
            </Grid>
          )}

          {/* Quesrtion-6 */}
          {productAwarenessQues.sixth && (
            <Grid size={12}>
              <Review
                handleQuestion={handleQuestion}
                Objective={Objective}
                industryData={industryData.persona}
              />
            </Grid>
          )}

          {/* Question-7 */}
          {productAwarenessQues.seventh && (
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

export default ProductAwarenessCampaign;
