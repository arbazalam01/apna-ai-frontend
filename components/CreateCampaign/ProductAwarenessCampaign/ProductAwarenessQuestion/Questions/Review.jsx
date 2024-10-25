import { Box, Button, Grid, Typography } from "@mui/material";
import api from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Loader from "../../../Loader";

const Review = ({ industryData, handleQuestion, Objective }) => {
  const { companyId } = useParams();
  const queryClient = useQueryClient();
  const methods = useFormContext();
  const { handleSubmit, getValues, reset } = methods;
  const [loading, setLoading] = useState(false);

  const [review, setReview] = useState();

  const navigate = useNavigate();

  const Values = getValues();

  console.log("Values", Values);

  // store kpi ,painpoint, motivation with the selectedPersonas in an array

  // const personas=Values.selectedPersonas.map((id) => industryData.find((p) => p._id == id));
  // console.log("personas",personas)

  const KPIs = Values.KPIs || [];
  const PainPoints = Values.PainPoints || [];
  const Motivations = Values.Motivations || [];

  console.log("KPIs", KPIs);

  // Store kpi, painpoint, motivation with the selectedPersonas in an array
  const personas = Values.selectedPersonas.map((id) =>
    industryData.find((p) => p._id == id)
  );
  console.log("personas", personas);

  const finalKPI = personas.map((p) => KPIs[p._id] || []);

  console.log(" KPI", KPIs);
  console.log("final KPI", finalKPI);

  // const kpi=Values.KPIs.map((id) => industryData.find((p) => p._id == id));

  // console.log("kpi",kpi)
  console.log("industryData REVIEW", industryData);

  const formatDate = (date) => {
    if (date) {
      return dayjs(date).format("DD/MM/YYYY");
    } else {
      return "";
    }
  };

  const removeUndefined = (obj) => {
    if (Array.isArray(obj)) {
      return obj
        .filter((item) => item !== undefined)
        .map((item) => removeUndefined(item));
    } else if (obj && typeof obj === "object") {
      return Object.keys(obj)
        .filter((key) => obj[key] !== undefined)
        .reduce((newObj, key) => {
          if (key === "selectedPersonas") {
            newObj[key] = obj[key]; // Retain the structure of selectedPersonas
          } else {
            newObj[key] = removeUndefined(obj[key]);
          }
          return newObj;
        }, {});
    }
    return obj;
  };

  const onSubmit = async (data) => {
    const cleanedData = removeUndefined(data);

    const kpiIDs = Object.keys(cleanedData.KPIs || {});
    const motivationIDs = Object.keys(cleanedData.Motivations || {});
    const painPointIDs = Object.keys(cleanedData.PainPoints || {});

    // Extract selected persona IDs
    // const selectedPersonaIDs = Object.keys(cleanedData.selectedPersonas || {});

    // Find intersection of selected personas with KPIs, Motivations, and PainPoints
    // const intersection = selectedPersonaIDs.filter(
    //   (id) =>
    //     kpiIDs.includes(id) ||
    //     motivationIDs.includes(id) ||
    //     painPointIDs.includes(id)
    // );

    // console.log("Intersection of IDs:", intersection);

    try {
      handleQuestion("next");
      setLoading(true);
      const payload = {
        ...cleanedData,
        Objective: Objective,
        startDate: dayjs(Values?.startDate).format("DD/MM/YYYY"),
        endDate: dayjs(Values?.endDate).format("DD/MM/YYYY"),
        companyId: companyId,
      };

      const apiUrl = "/calendar/createCalendar";
      console.log("payload", payload);

      const response = await api.post(apiUrl, payload);

      if (response.status === 200) {
        // handleQuestion("next");
        reset();
        queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error occurred while creating user:", error);
    } finally {
      setLoading(false);
      navigate(`/${companyId}/calendar`);
    }
  };
  console.log("review", review);

  useEffect(() => {
    const Values = getValues();
    if (Values) {
      setReview(removeUndefined(Values));
    }
  }, [getValues]);

  return (
    <Grid
      container
      minHeight={"75vh"}
      spacing={2}
      justifyContent={"space-between"}
      mb={10}
    >
      {loading == false && (
        <>
          <Grid item xs={12}>
            <Typography variant="caption2">Review</Typography>
            <br />
            <Typography variant="AvgHeading">
              Review your selections{" "}
            </Typography>

            <Box>
              <Grid container alignItems={"center"} pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Duration </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography variant="caption2">
                    {Values?.startDate.format("DD MMMM YYYY")} -{" "}
                    {Values?.endDate.format("DD MMMM YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container alignItems={"center"} pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Objective</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography variant="caption2">{Objective}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container alignItems={"center"} pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Target Product </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography variant="caption2">{review?.product}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container alignItems={"center"} pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Target Service </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography variant="caption2">{review?.service}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2} alignItems={"start"} justifyContent={"start"}>
                  <Typography variant="caption7">Types of Content</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.content_format && review?.content_format.map((item) => (
                    <>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Industry Themes</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.industryThemes && review?.industryThemes?.map((item) => (
                    <>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </>
                  ))}

                  <br />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Target Personas</Typography>
                </Grid>
                <Grid item xs={9.5}>

                       
                {personas && personas.map((item) => (
        <div key={item?._id}>
          <Typography variant="caption2">{item?.name}</Typography>
          <br />

          {PainPoints[item._id] && PainPoints[item._id].length > 0 && (
            <Grid pl={4} mb={1}>
              <Grid mt={0.5} mb={0.7}>
                <Typography variant="smallGreyHeading2">
                  PAIN POINTS
                </Typography>
              </Grid>
              {PainPoints[item._id].map((painpoint, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  lineHeight={"1.3rem"}
                >
                  {painpoint}
                </Typography>
              ))}
            </Grid>
          )}

          {Motivations[item._id] && Motivations[item._id].length > 0 && (
            <Grid pl={4} mb={1}>
              <Grid mt={0.5} mb={0.7}>
                <Typography variant="smallGreyHeading2">
                  MOTIVATIONS
                </Typography>
              </Grid>
              {Motivations[item._id].map((motivation, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  lineHeight={"1.3rem"}
                >
                  {motivation}
                </Typography>
              ))}
            </Grid>
          )}

          {KPIs[item._id] && KPIs[item._id].length > 0 && (
            <Grid pl={4} mb={1}>
              <Grid mt={0.5} mb={0.7}>
                <Typography variant="smallGreyHeading2">
                  KPIs
                </Typography>
              </Grid>
              {KPIs[item._id].map((kpi, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  lineHeight={"1.3rem"}
                >
                  {kpi}
                </Typography>
              ))}
            </Grid>
          )}
        </div>
      ))}
                  <br />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"start"}
            alignItems={"end"}
          >
            <Button variant="button2" onClick={() => handleQuestion("back")}>
              Go Back
            </Button>

            <Button
              type="submit"
              variant="button2"
              onClick={handleSubmit(onSubmit)}
            >
              Proceed
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Review;
