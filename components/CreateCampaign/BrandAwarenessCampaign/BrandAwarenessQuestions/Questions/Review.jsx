import { Box, Button, Grid, Typography } from "@mui/material";
import api from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const Review = ({ handleQuestion, Objective }) => {
  const { companyId } = useParams();
  const queryClient = useQueryClient();
  const methods = useFormContext();
  const { handleSubmit, getValues, reset } = methods;
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({});
  const navigate = useNavigate();

  const Values = getValues();
  console.log("Values", Values);

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
          newObj[key] = removeUndefined(obj[key]);
          return newObj;
        }, {});
    }
    return obj;
  };

  const onSubmit = async (data) => {
    console.log("Submitting", data);

    const cleanedData = removeUndefined(data);
    console.log("cleanedData", cleanedData);

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
        reset();
        queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
      } else {
        console.error("Failed to create calendar event");
      }
    } catch (error) {
      console.error("Error occurred while creating calendar event:", error);
    } finally {
      setLoading(false);
      navigate(`/${companyId}/calendar`);
    }
  };
  console.log("review", review);

  useEffect(() => {
    const values = getValues();
    if (values) {
      setReview(removeUndefined(values));
    }
  }, [getValues]);

  return (
    <Grid
      container

      spacing={2}
      justifyContent={"space-between"}

    >
      {loading === false && (
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
                    {Values?.startDate
                      ? dayjs(Values?.startDate).format("DD MMMM YYYY")
                      : ""}{" "}
                    -{" "}
                    {Values?.endDate
                      ? dayjs(Values?.endDate).format("DD MMMM YYYY")
                      : ""}
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
              <Grid container pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Target Products </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.product && review?.product?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Target Services </Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.service && review?.service?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2} alignItems={"start"} justifyContent={"start"}>
                  <Typography variant="caption7">Types of Content</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.content_format && review?.content_format?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2} alignItems={"start"} justifyContent={"start"}>
                  <Typography variant="caption7">Strengths</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.strength && review?.strength?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2} alignItems={"start"} justifyContent={"start"}>
                  <Typography variant="caption7">Positioning</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.positioning && review?.positioning?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid container pt={2}>
                <Grid item xs={2} alignItems={"start"} justifyContent={"start"}>
                  <Typography variant="caption7">Key Differentiator</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.keyDifferentiator && review?.keyDifferentiator?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Box mb={4}>
              <Grid container pt={2}>
                <Grid item xs={2}>
                  <Typography variant="caption7">Industry Themes</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  {review?.industryThemes   && review?.industryThemes?.map((item, index) => (
                    <div key={index}>
                      <Typography variant="caption2">{item}</Typography>
                      <br />
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>

          
        </>
      )}
    </Grid>
  );
};

export default Review;
