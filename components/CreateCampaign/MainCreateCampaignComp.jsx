import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import LeadershipStepper from "./Stepper/LeadershipStepper";

import ProductAwarenessCampaign from "./ProductAwarenessCampaign/ProductAwarenessCampaign";
import EngagementCampaign from "./EngagementCampaign/EngagementCampaign";
import BrandAwarenessCampaign from "./BrandAwarenessCampaign/BrandAwarenessCampaign";
import BrandAwarenessStepper from "./Stepper/BrandAwarenessStepper";
import ProductAwarenessStepper from "./Stepper/ProductAwarenessStepper";
import EngagementStepper from "./Stepper/EngagementStepper";
import { useLocation, useParams } from "react-router-dom";
import api from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import ThoughtLeadershipCampaign from "./ThoughtLeadershipCampaign/ThoughtLeadershipCampaign";
import { DevTool } from "@hookform/devtools";
import SelectCampaign from "./SelectCampaign";

const MainCreateCampaignComp = () => {
  // const [quesnumber, setQuesnumber] = useState(0);
  const { companyId } = useParams();
  const location = useLocation();
  const [customCampaign,setCustomCampaign]=useState(false)
  const [selectedObj, setSelectedObj] = useState(null);
  const methods = useForm();
  const { control } = methods;

  // const { selectedObj } = useParams();
  // const [Objective, setSelectedObj] = useState(null);

  //   console.log("selectedObjectiveNEW", Objective);
  const [industryData, setIndustryData] = useState();
console.log("selectedObj industryData", industryData);
  const [quesnumber, setQuesnumber] = useState(0);
  const [brandAwarenessQues, setBrandAwarenessQuestion] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
    eighth: false,
    ninth: false,
    tenth: false,
  });
  const [productAwarenessQues, setProductAwarenessQuestion] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
  });
  const [engagementQues, setEngagementQuestion] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
  });
  const [leadershipQues, setLeadershipQuestion] = useState({
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    seventh: false,
    eighth: false,
  });

  const fetchData = async () => {
    try {
      const apiUrl = `/calendar/${companyId}/getCalendarInputFields`;

      const response = await api.get(apiUrl);
      const industrydata = response.data;
      console.log("industrydataSSS", industrydata);
      setIndustryData(industrydata);
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log("SELECTED OBJ", selectedObj);

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  return (
    <>
      {selectedObj == null ? (
        <SelectCampaign
          selectedObj={selectedObj}
          setSelectedObj={setSelectedObj}
        />
      ) : (
        <>

        <FormProvider {...methods}>
          <Grid container>
            {/* BRAND AWARENESS */}
            {selectedObj.name === "Brand Awareness" && (
              <>
                <Grid xs={3}>
                  <Grid
                    zIndex={13}
                    height={"100vh"}
                    borderRight={"1px solid #D2D2D2"}
                    bgcolor={"transparent"}
                    sx={{
                      position: "fixed",

                      paddingX: 2.4,
                      paddingY: 2.5,

                      width: "17rem",
                    }}
                  >
                    
                    <BrandAwarenessStepper quesnumber={quesnumber} customCampaign={customCampaign} setCustomCampaign={setCustomCampaign} />
                  </Grid>
                </Grid>
                <Grid item xs={9} pt={1}>
                  <BrandAwarenessCampaign
                    selectedObj={selectedObj.name}
                    brandAwarenessQues={brandAwarenessQues}
                    setBrandAwarenessQuestion={setBrandAwarenessQuestion}
                    setQuesnumber={setQuesnumber}
                    industryData={industryData}
                    customCampaign={customCampaign}
                    setCustomCampaign={setCustomCampaign}
                  />
                </Grid>
              </>
            )}

            {/* PRODUCT AWARENESS */}
            {selectedObj.name === "Product Awareness" && (
              <>
                <Grid xs={3}>
                  <Grid
                    zIndex={13}
                    height={"100vh"}
                    borderRight={"1px solid #D2D2D2"}
                    bgcolor={"transparent"}
                    sx={{
                      position: "fixed",

                      paddingX: 2.4,
                      paddingY: 2.3,

                      width: "17rem",
                    }}
                  >
                    <ProductAwarenessStepper quesnumber={quesnumber} />
                  </Grid>
                </Grid>
                <Grid item xs={9} pt={1}>
                  <ProductAwarenessCampaign
                    selectedObj={selectedObj.name}
                    productAwarenessQues={productAwarenessQues}
                    setProductAwarenessQuestion={setProductAwarenessQuestion}
                    setQuesnumber={setQuesnumber}
                    industryData={industryData}
                  />
                </Grid>
              </>
            )}

            {/* ENGAGEMENT */}
            {selectedObj.name === "Product Engagement" && (
              <>
                <Grid xs={3}>
                  <Grid
                    zIndex={13}
                    height={"100vh"}
                    borderRight={"1px solid #D2D2D2"}
                    bgcolor={"transparent"}
                    sx={{
                      position: "fixed",

                      paddingX: 2.4,
                      paddingY: 2.3,

                      width: "17rem",
                    }}
                  >
                    <EngagementStepper quesnumber={quesnumber} />
                  </Grid>
                </Grid>
                <Grid item xs={9} pt={1}>
                  <EngagementCampaign
                    selectedObj={selectedObj.name}
                    engagementQues={engagementQues}
                    setEngagementQuestion={setEngagementQuestion}
                    setQuesnumber={setQuesnumber}
                    industryData={industryData}
                  />
                </Grid>
              </>
            )}

            {/* THOUGHT LEADERSHIP */}
            {selectedObj.name === "Thought Leadership" && (
              <>
                <Grid xs={3}>
                  <Grid
                    zIndex={13}
                    height={"100vh"}
                    borderRight={"1px solid #D2D2D2"}
                    bgcolor={"transparent"}
                    sx={{
                      position: "fixed",

                      paddingX: 2.4,
                      paddingY: 2.3,

                      width: "17rem",
                    }}
                  >
                    <LeadershipStepper quesnumber={quesnumber} />
                  </Grid>
                </Grid>
                <Grid item xs={9} pt={1}>
                  <ThoughtLeadershipCampaign
                    selectedObj={selectedObj}
                    leadershipQues={leadershipQues}
                    setLeadershipQuestion={setLeadershipQuestion}
                    setQuesnumber={setQuesnumber}
                    industryData={industryData}
                  />
                </Grid>
              </>
            )}
          </Grid>{" "}
        </FormProvider>
        </>
      )}
      <DevTool control={control} />
    </>
  );
};

export default MainCreateCampaignComp;
