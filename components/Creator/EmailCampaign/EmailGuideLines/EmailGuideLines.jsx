import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { Select, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { campaignGuidlineStore } from "@store/ProspectStore";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";
import api from "@utils/api";
import { IconPlus } from "@tabler/icons-react";
import { tabValueStore } from "@store/EmailCampaignStore";

const guidelineTheme = {
  fontSize: "0.8rem",
  fontWeight: "500",
  color: "grey",
};

const EmailGuideLines = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  let { companyId } = useParams();
  const [products, setProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [guidelines, setGuidelines] = useAtom(campaignGuidlineStore);
  const setTabValue = useSetAtom(tabValueStore);
  const [selectedObjective, setSelectedObjective] = useState("");

  const fetchData = async () => {
    const apiUrl = `customer/${companyId}/getAlldata`;
    const response = await api.get(apiUrl);
    const data = await response.data;

    if (data.company.products) {
      setProducts(data.company.products);
    }
    if (data.company.industries) {
      setIndustries(data.company.industries);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  useEffect(() => {
    reset(guidelines);
  }, []);

  const onSubmit = (data) => {
    setGuidelines(data);
    setTabValue("prospects");
  };

  const Objectives = [
    { label: "Brand Awareness", name: "Brand Awareness" },
    { label: "Product Engagement", name: "Product Engagement" },
    { label: "Event Led", name: "Event Led" },
  ];

  const textArea =
    "Introducing the product and elaborating on its relevance for the audience";

  const handleObjectiveChange = (value) => {
    setSelectedObjective(value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "center",
          p: "2rem 3rem 1rem 3rem"
        }}>
        <Grid container>
          <Grid size={2}>
            <Typography style={guidelineTheme}>OBJECTIVES</Typography>
          </Grid>
          <Grid size={7}>
            <Controller
              name="objectives"
              control={control}
              rules={{ required: "Objective is required" }}
              render={({ field }) => (
                <Select
                  size={"middle"}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                    handleObjectiveChange(value);
                  }}
                  style={{
                    width: 350,
                    height: 35,
                  }}
                  labelId="objective-label"
                  label="Objective"
                >
                  {Objectives.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Grid>
        </Grid>

        {selectedObjective === "Product Engagement" && (
          <Grid container sx={{
            mt: 1
          }}>
            <Grid size={2}>
              <Typography style={guidelineTheme}>PRODUCT</Typography>
            </Grid>
            <Grid size={7}>
              <Controller
                name="product"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <Select
                    size={"middle"}
                    {...field}
                    style={{
                      width: 350,
                      height: 35,
                    }}
                    labelId="product-label"
                    label="Product"
                  >
                    {products.map((item, index) => (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
        )}

        {selectedObjective === "Event Led" && (
          <>
            <Grid container sx={{
              mt: 1
            }}>
              <Grid size={2}>
                <Typography style={guidelineTheme}>DATE</Typography>
              </Grid>
              <Grid size={7}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={value ? dayjs(value, "YYYY-MM-DD") : null}
                      onChange={(date, dateString) => {
                        onChange(dateString);
                      }}
                      style={{
                        width: 350,
                        height: 35,
                      }}
                      format="YYYY-MM-DD"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{
              mt: 1
            }}>
              <Grid size={2}>
                <Typography style={guidelineTheme}>EVENT NAME</Typography>
              </Grid>
              <Grid size={7}>
                <Controller
                  name="eventName"
                  control={control}
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter the event name"
                      style={{
                        width: 350,
                        height: 35,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container sx={{
              mt: 1
            }}>
              <Grid size={2}>
                <Typography style={guidelineTheme}>EVENT THEME</Typography>
              </Grid>
              <Grid size={7}>
                <Controller
                  name="eventTheme"
                  control={control}
                  rules={{ required: "Event theme is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter the event theme"
                      style={{
                        width: 350,
                        height: 35,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}

        <Grid container sx={{
          mt: 1
        }}>
          <Grid size={2}>
            <Typography style={guidelineTheme}>NUMBER OF EMAILS</Typography>
          </Grid>
          <Grid size={7}>
            <Controller
              name="numberOfEmails"
              control={control}
              rules={{ required: "Number of emails is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter the number of emails"
                  style={{ width: 350, height: 35 }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Grid container sx={{
        p: "1rem 1rem 2rem 1.8rem"
      }}>
        <Grid sx={{
          mr: 4
        }} size={1}>
          <Typography style={guidelineTheme} sx={{
            mb: 1
          }}>
            Word Count
          </Typography>
          <Controller
            name="wordCount"
            control={control}
            render={({ field }) => (
              <Input placeholder="150" {...field} type="number" />
            )}
          />
        </Grid>
        <Grid size={5}>
          <Typography style={guidelineTheme} sx={{
            mb: 1
          }}>
            Additional Instructions
          </Typography>

          <Controller
            name="additionalInstructions"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Additional Instructions"
                variant="filled"
                style={{ lineHeight: "2", whiteSpace: "pre-wrap" }}
                rows={2}
              />
            )}
          />
        </Grid>
      </Grid>

      <Button
        sx={{ marginLeft: "1.6rem" }}
        variant="button1"
        onClick={handleSubmit(onSubmit)}
        startIcon={<IconPlus size={20} />}
      >
        Select Prospects
      </Button>
    </>
  );
};

export default EmailGuideLines;
