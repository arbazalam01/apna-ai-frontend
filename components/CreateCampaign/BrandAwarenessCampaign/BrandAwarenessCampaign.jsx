import { Grid, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Duration from "./BrandAwarenessQuestions/Questions/Duration";
import Contents from "./BrandAwarenessQuestions/Questions/Contents";
import IndustryTheme from "./BrandAwarenessQuestions/Questions/IndustryTheme";
import Review from "./BrandAwarenessQuestions/Questions/Review";
import ContentThemes from "./BrandAwarenessQuestions/Questions/ContentThemes";
import ContentMix from "./BrandAwarenessQuestions/Questions/ContentMix";
import CustomCampaign from "./BrandAwarenessQuestions/Questions/CustomCampaign";
import Strength from "./BrandAwarenessQuestions/Questions/Strength";
import Positioning from "./BrandAwarenessQuestions/Questions/Positioning";
import Differentiator from "./BrandAwarenessQuestions/Questions/Differentiator";
import CompanyVision from "./BrandAwarenessQuestions/Questions/CompanyVision";
import Loader from "../Loader";
import { DevTool } from "@hookform/devtools";
import CustomContentThemes from "./BrandAwarenessQuestions/Questions/CustomContentThemes";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@utils/api";
import dayjs from "dayjs";
const BrandAwarenessCampaign = ({
  selectedObj,
  industryData,
  setQuesnumber,
  customCampaign,
  setCustomCampaign,
}) => {
  console.log("selectedObj industryData", industryData);
  const methods = useFormContext();
  
  const {companyId}=useParams();
  const { control,getValues, handleSubmit, reset } = methods;
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();
  const queryClient=useQueryClient();

  const baseSteps = [
    { component: <Duration />, label: "Duration" },
    {
      component: <IndustryTheme industryData={industryData?.data[0]} />,
      label: "Industry Theme",
    },
    {
      component: (
        <ContentThemes
          customCampaign={customCampaign}
          setCustomCampaign={setCustomCampaign}
          
        />
      ),
      label: "Content Themes",
    },
    { component: <Contents />, label: "Contents" },
    { component: <ContentMix />, label: "Content Mix" },
  ];

  const customCampaignSteps = [
    { component: <CustomCampaign />, label: "Custom Campaign" },
    {
      component: <Strength industryData={industryData.data[0]} />,
      label: "Strength",
    },
    {
      component: <Positioning industryData={industryData.data[0]} />,
      label: "Positioning",
    },
    {
      component: <Differentiator industryData={industryData.data[0]} />,
      label: "Differentiator",
    },
    {
      component: <CompanyVision industryData={industryData.data[0]} />,
      label: "Company Vision",
    },
    {
      component: <CustomContentThemes industryData={industryData.data[0]} />,
      label: "Custom Content Themes",
    },
  ];

  // Dynamically join custom campaign steps if customCampaign is true
  const steps = customCampaign
    ? [...baseSteps.slice(0, 3), ...customCampaignSteps, ...baseSteps.slice(3)]
    : baseSteps;

  const handleNext = () => {
   
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    setQuesnumber(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    setQuesnumber(currentStep - 1);
  };

  const onSubmit = async (data) => {
    console.log("Submitting campaign with data:", data);
  
    const calculateEndDate = (startDate, duration) => {
      const [amount, unit] = duration.split(" ");
      const numAmount = parseInt(amount, 10);
  
      let endDate = startDate;
  
      switch (unit.toLowerCase()) {
        case "day":
        case "days":
          endDate = endDate.add(numAmount, 'day');
          break;
        case "week":
        case "weeks":
          endDate = endDate.add(numAmount, 'week');
          break;
        case "month":
        case "months":
          endDate = endDate.add(numAmount, 'month');
          break;
        case "year":
        case "years":
          endDate = endDate.add(numAmount, 'year');
          break;
        default:
          console.error("Invalid duration unit");
      }
  
      return endDate;
    };
  
    const startDate = data?.startDate; 
    let endDate;
  
    if (data?.duration === "custom") {
      endDate = data?.endDate; 
    } else {
      const duration = data?.duration; 
      endDate = calculateEndDate(startDate, duration); 
    }

     // Format startDate and endDate using Day.js in "DD/MM/YYYY" format
  const formattedStartDate = dayjs(startDate).format("DD/MM/YYYY");
  const formattedEndDate = dayjs(endDate).format("DD/MM/YYYY");
  
    // Map selectedThemes with content_mix and ensure numbers are correctly formatted
    const contentMix = {};
    data?.selectedThemes.forEach((theme, index) => {
      const mix = data?.content_mix[index]; 
      const formattedMix = {}; 
  
      // Ensure all values are numbers, and default to 0 if undefined
      for (const contentType in mix) {
        let value = mix[contentType];
  
        // Convert to number, handle undefined as 0, and ensure string numbers like "04" become 4
        formattedMix[contentType] = value !== undefined ? Number(value) : 0;
      }
  
      contentMix[theme] = formattedMix;
    });
  
    // Prepare the payload with contentMix
   
  

  
    try {
      setLoading(true); 
      setQuesnumber(currentStep + 1);
 const payload = {
      themes: data?.selectedThemes,
      contentformat: data?.content_format,
      contentMix, 
      start_date: formattedStartDate, // Formatted start date
      end_date: formattedEndDate,     // Formatted end date
      companyId: companyId,
    };

    const apiUrl = "/calendar/createCalendar";
    console.log("payload", payload);

    const response = await api.post(apiUrl, payload);

      
      // queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
  
    } catch (error) {
      console.error("Error submitting campaign:", error);
    } finally {
      setLoading(false)
      navigate(`/${companyId}/calendar`); 
    }
  };
  
  
  

  return (
    <Grid container>
      {loading ? (
        <Grid container justifyContent="center">
        <Loader />
        </Grid>
      ) : (
        <>
          {/* 
         { 
contentMix: {Cutting-Edge Software for Interior Design
: 
{Podcasts: 4, Blogs: 4, Videos: 2}
Innovative Learning Solutions for EdTech Growth
: 
{Podcasts: 3, Blogs: 0, Videos: 3}},

contentformat: [],
start_date,
end_date,
themes: []
          
          
          } 
           
           
           */}
            <Grid container>
              {steps.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  p={2}
                  style={{
                    position: "relative",
                    display: index <= currentStep ? "block" : "none",
                    pointerEvents: index < currentStep ? "none" : "auto",
                    opacity: index < currentStep ? 0.5 : 1,
                  }}
                >
                  {step.component}
                </Grid>
              ))}

              <Grid item xs={12} mb={8}>
                <Grid display="flex" gap={2} pl={2}>
                  {currentStep > 0 && (
                    <Button variant="button2" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  {currentStep < steps.length - 1 ? (
                    <Button variant="button2" onClick={handleNext}>
                      Proceed
                    </Button>
                  ) : (
                    <Button variant="button1" onClick={handleSubmit(onSubmit)}> Start Campaign Creation 
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {/* <DevTool control={control} /> */}
          
        </>
      )}
    </Grid>
  );
};

export default BrandAwarenessCampaign;
