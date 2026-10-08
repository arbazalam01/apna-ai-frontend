import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { Divider } from "antd";
import { useParams } from "react-router-dom";
import api from "@utils/api";
import dayjs from "dayjs";

const SummaryModal = ({ handleCloseSummary, summaryData }) => {
  console.log("EXACT DATA", summaryData);

  // const contentMix = summaryData.map((item) => ({
  //   name: item.name,
  //   count: item.count,
  //   // productCounts: item.productCounts.map((productCount) => productCount),
  //   personaCounts: [13, 16, 10], // Replace this with actual data if available
  // }));

  // Sample data to simulate the content in the modal
  const data = {
    startDate: "1 March 2024",
    endDate: "15 May 2024",
    contentMix: [
      // {
      //   name:summaryData?.name ,
      //   count: summaryData?.count,
      //   productCounts: summaryData.productCounts.map((productCount) => productCount),
      //   personaCounts: [13, 16, 10],},
      {
        name: "LinkedIn Posts",
        count: 39,
        productCounts: [11, 28],
        personaCounts: [13, 16, 10],
      },
      {
        name: "Instagram Posts",
        count: 28,
        productCounts: [8, 20],
        personaCounts: [10, 10, 8],
      },
      {
        name: "Blog Posts",
        count: 6,
        productCounts: [2, 4],
        personaCounts: [2, 2, 2],
      },
      {
        name: "Podcast Episodes",
        count: 4,
        productCounts: [1, 3],
        personaCounts: [1, 2, 1],
      },
      {
        name: "Videos",
        count: 4,
        productCounts: [2, 2],
        personaCounts: [1, 1, 2],
      },
      {
        name: "Email Campaigns",
        count: 4,
        productCounts: [1, 3],
        personaCounts: [1, 1, 2],
      },
    ],
    products: ["Electronic Health Records", "Product ABC"],
    personas: [
      "CEO for Private Hospitals",
      "CEO for Nursing Homes",
      "Administrative Executive for Private Hospitals",
    ],
    personaColors: ["#ff9999", "#66b3ff", "#99ff99"],
    productColors: ["#0033cc", "#cc0099"],
  };

  const startDateFormatted = dayjs(data.startDate).format("D MMM YYYY");
  const endDateFormatted = dayjs(data.endDate).format("D MMM YYYY");

  return (
    <Grid container sx={{ pt: 3 }}>
      <Grid
        sx={{
          pl: 4
        }}
        size={12}>
        <Typography variant="caption6-1">
          {" "}
          {startDateFormatted &&
            endDateFormatted &&
            `${startDateFormatted} - ${endDateFormatted}`}
        </Typography>
      </Grid>
      <Divider style={{ margin: "0.5rem 0rem" }} />

      <Grid
        sx={{
          mt: 2,
          pl: 4
        }}
        size={12}>
        <Grid container spacing={2} sx={{
          mb: 1
        }}>
          <Grid
            sx={{
              alignContent: "center"
            }}
            size={3}>
            {" "}
            <Typography variant="h6">Content Mix</Typography>
          </Grid>
          <Grid
            sx={{
              alignContent: "center"
            }}
            size={4}>
            {" "}
            <Typography variant="caption" sx={{ mb: 5 }}>
              PRODUCTS / SERVICES
            </Typography>
          </Grid>
          <Grid
            sx={{
              alignContent: "center"
            }}
            size={4}>
            {" "}
            <Typography variant="caption" sx={{ mb: 5 }}>
              TARGET PERSONAS
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Divider style={{ margin: "0.2rem 0rem" }} />

      {data?.contentMix.map((item, index) => (
        <>
          <Grid
            sx={{
              mt: 2,
              pl: 4
            }}
            size={12}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box key={index} sx={{
                  mb: 1
                }}>
                  <Grid container spacing={1} sx={{
                    alignItems: "center"
                  }}>
                    <Grid
                      sx={{
                        alignItems: "center"
                      }}>
                      <Typography variant="h6">{item?.count}</Typography>
                    </Grid>
                    <Grid
                      sx={{
                        alignItems: "center"
                      }}>
                      <Typography variant="body2" color="textSecondary">
                        {item?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box key={index} sx={{
                  mt: 1.5
                }}>
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Grid container>
                        {item.productCounts.map((count, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              width: `${(count / item.count) * 100}%`,
                              bgcolor: data.productColors[idx],
                              height: 5,
                              mb: 3
                            }} />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box key={index} sx={{
                  mt: 1.5
                }}>
                  <Grid container spacing={1}>
                    <Grid size={12}>
                      <Grid container>
                        {item?.personaCounts.map(
                          (count, idx) => (
                            console.log(count),
                            (
                              <Box
                                key={idx}
                                sx={{
                                  width: `${(count / item.count) * 100}%`,
                                  bgcolor: data.personaColors[idx],
                                  height: 5,
                                  mb: 3
                                }} />
                            )
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ margin: "0.1rem 0rem" }} />
        </>
      ))}

      <Grid
        sx={{
          mt: 2,
          pl: 4
        }}
        size={12}>
        <Grid container spacing={2}>
          <Grid size={3}></Grid>
          <Grid size={4}>
            {data?.products.map((product, index) => (
              <Typography
                variant="caption"
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  component="span"
                  sx={{
                    bgcolor: data.productColors[index],
                    width: 10,
                    height: 10,
                    display: "inline-block",
                    mr: 1,
                  }}
                />{" "}
                {product}
              </Typography>
            ))}
          </Grid>
          <Grid size={4}>
            {data?.persona.map((persona, index) => (
              <Typography
                variant="caption"
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Box
                  component="span"
                  sx={{
                    bgcolor: data.personaColors[index],
                    width: 10,
                    height: 10,
                    display: "inline-block",
                    mr: 1,
                  }}
                />{" "}
                {persona}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SummaryModal;
