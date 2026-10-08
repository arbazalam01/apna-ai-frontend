import {
  FormLabel,
  Drawer,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";

// import { Divider } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "@utils/api";
import Styles from "./ViewCampaign.module.css";
import { IconInfoCircle, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";

const designations = [
  { key: 0, value: "CMO" },
  { key: 1, value: "Customer Service" },
  { key: 2, value: "Distribution" },
  { key: 3, value: "Finance" },
  { key: 4, value: "Accounting" },
  { key: 5, value: "Human Resources" },
  { key: 6, value: "Marketing" },
  { key: 7, value: "Operations Management" },
  { key: 8, value: "Procurement" },
  { key: 9, value: "Production" },
  { key: 10, value: "Sales" },
];

const ViewCampaign = ({ open, onClose, viewDetails }) => {
  const borderMargin = {
    marginTop: "1.3rem",
    marginBottom: "0.5rem",
    borderColor: "#e8e8e8",
  };
  console.log("VIEW DETAILS", viewDetails); 

  const startDate = dayjs(viewDetails?.startDate).format("D MMM YYYY");
  const endDate = dayjs(viewDetails?.endDate).format("D MMM YYYY");

  return (
    <>
      <Drawer open={open} onClose={onClose} anchor={"right"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form style={{ width: "900px" }}>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between", // Align items to the start and end of the row
                mt: 3,
                mb: 3,
                // width: "60rem",
              }}
            >
              <Grid
                container
                sx={{
                  pl: 3
                }}
                size={11}>
                <Typography variant="Heading">
                  Campaign for&nbsp;
                  {viewDetails?.products}
                </Typography>
              </Grid>

              <Grid container size={1}>
                <IconX
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={onClose}
                />
              </Grid>
            </Grid>
            <Divider />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">Campaign Details</Typography>
              </FormLabel>

              <Grid
                container
                sx={{
                  alignItems: "center",
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">DATES </Typography>
                </Grid>
                <Grid size={9.5}>
                  <Typography variant="caption2">
                    {startDate} - {endDate}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">
                    OBJECTIVES{" "}
                  </Typography>
                </Grid>
                <Grid size={9.5}>
                  <Typography variant="caption2">
                    {
                      viewDetails?.contentObjectivesDistribution
                        ?.awarenessPercent
                    }
                    % Awareness
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="caption2">
                    {
                      viewDetails?.contentObjectivesDistribution
                        ?.engagementPercent
                    }
                    % Engagement
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="caption2">
                    {
                      viewDetails?.contentObjectivesDistribution
                        ?.thoughtLeadPercent
                    }
                    % Thought Leaderhip
                  </Typography>
                  <br />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">PRODUCTS </Typography>
                </Grid>
                <Grid size={9.5}>
                  {viewDetails?.products &&
                    viewDetails?.products.map((product, index) => {
                      return (
                        <span key={index}>
                          <Typography variant="caption2">{product}</Typography>
                          <br />
                        </span>
                      );
                    })}
                </Grid>
              </Grid>
            </Box>

            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">SERVICES </Typography>
                </Grid>
                <Grid size={9.5}>
                  {viewDetails?.services &&
                    viewDetails?.services.map((service, index) => {
                      return (
                        <span key={index}>
                          <Typography variant="caption2">
                            {service.length > 0 ? service : "-"}
                          </Typography>
                          <br />
                        </span>
                      );
                    })}
                </Grid>
              </Grid>
            </Box>

            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">
                    TYPES OF CONTENT INCLUDED{" "}
                  </Typography>
                </Grid>
                <Grid size={9.5}>
                  {viewDetails?.platforms
                    ? viewDetails.platforms.map((item) => (
                        <>
                          <Typography variant="caption2">{item} </Typography>
                          <br />
                        </>
                      ))
                    : "-"}

                  {/* <Typography variant="caption2">
                    LinkedIN Static Post
                  </Typography>
                  <br />
                  <Typography variant="caption2">Videos</Typography>
                  <br />
                  <Typography variant="caption2">Blogs</Typography>*/}
                </Grid>
              </Grid>
            </Box>

            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <table
                  style={{ borderCollapse: "collapse", width: "100%" }}
                  className={Styles.viewCampaignTable}
                >
                  <tr className={Styles.viewCampaignTable}>
                    <th className={Styles.viewCampaignTable}>
                      <Typography variant={"smallGreyHeading"}>
                        PERSONAS
                      </Typography>
                    </th>
                    <th className={Styles.viewCampaignTable}>
                      {" "}
                      <Typography variant={"smallGreyHeading"}>
                        PERSONAS ATTRIBUTES
                      </Typography>
                    </th>
                    <th className={Styles.viewCampaignTable}>
                      <Typography variant={"smallGreyHeading"}>
                        TARGET INDUSTRY THEMES
                      </Typography>
                    </th>
                  </tr>
                  <tr className={Styles.viewCampaignTable}>
                    <td className={Styles.viewCampaignTable}>
                      {viewDetails?.userPersona}
                    </td>
                    <td className={Styles.viewCampaignTable}>
                      {viewDetails?.personasAttribute
                        ? viewDetails.personasAttribute.map((item) => (
                            <>
                              <Typography variant="caption2">
                                {item}{" "}
                              </Typography>
                              <br />
                            </>
                          ))
                        : ("-")}
                    </td>

                    <td className={Styles.viewCampaignTable}>
                      {viewDetails?.themes
                        ? viewDetails.themes.map((item) => (
                            <>
                              <Typography variant="caption2">
                                {item}{" "}
                              </Typography>
                              <br />
                            </>
                          ))
                        : "-"}
                    </td>
                  </tr>
                </table>
              </Grid>
            </Box>

            <Divider sx={borderMargin} />

            <Box
              sx={{
                pl: 5,
                pt: 2,
                pb: 15
              }}>
              <Grid
                container
                sx={{
                  mb: 2,
                  pt: 2
                }}>
                <Grid size={2.5}>
                  <Typography variant="smallGreyHeading">
                    SPECIAL INSTRUCTIONS
                  </Typography>
                </Grid>
                <Grid size={9.5}>
                  {viewDetails?.additionalInstructions ? (
                    <Typography variant="caption2">
                      {viewDetails?.additionalInstructions}
                    </Typography>
                  ) : (
                    "-"
                  )}
                  <br />
                </Grid>
              </Grid>
            </Box>
          </form>
        </LocalizationProvider>
      </Drawer>
    </>
  );
};

export default ViewCampaign;
