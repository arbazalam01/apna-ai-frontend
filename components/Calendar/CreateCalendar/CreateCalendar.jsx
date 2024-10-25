import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Select,
  MenuItem,
  FormLabel,
  FormControl,
  Drawer,
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";
// import { Divider } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "@utils/api";
import TagSlider from "../Slider";
import Styles from "./CreateCalendar.module.css";
import { IconInfoCircle } from "@tabler/icons-react";

const CreateCalendar = ({ open, onClose }) => {
  const borderMargin = {
    marginTop: "1.3rem",
    marginBottom: "0.5rem",
  };
  const { handleSubmit, control, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      products: [],
      services: [],
      themes: [],
      startDate: null,
      endDate: null,
      additionalInstructions: "",
      platforms: [],
    },
  });
  const { companyId } = useParams();
  const [targetindustry, setTargetIndustry] = useState([]);
  const [products, setProducts] = useState([{}]);
  const [services, setServices] = useState([{}]);
  const [themes, setThemes] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [personas, setPersonas] = useState([{}]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [KPIs, setKPIs] = useState([]);
  const [Motivations, setMotivations] = useState([]);

  const [PainPoints, setPainPoints] = useState([]);

  const handleSelectedPersona = (persona) => {
    setSelectedPersona(persona);
    setKPIs(persona.KPIs);
    setMotivations(persona.Motivations);
    setPainPoints(persona.PainPoints);
  };

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [widths, setWidths] = useState(new Array(3).fill(100 / 3));

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        startDate: data.startDate.format("DD/MM/YYYY"),
        endDate: data.endDate.format("DD/MM/YYYY"),
        companyId: companyId,
        contentObjectivesDistribution: {
          awarenessPercent: widths[0].toFixed(2),
          engagementPercent: widths[1].toFixed(2),
          thoughtLeadPercent: widths[2].toFixed(2),
        },
      };
    console.log("payload", payload);
      const apiUrl = "/calendar/createCalendar";
      console.log("payload", payload);

      const response = await api.post(apiUrl, payload);

      if (response.status === 200) {
        onClose();
        reset();
        queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error occurred while creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const watchProducts = watch("products");
  const watchServices = watch("services");

  const fetchData = async () => {
    try {
      const apiUrl = `/calendar/${companyId}/getCalendarInputFields`;

      const response = await api.get(apiUrl);
      let industrydata = response.data.data[0];
      let temp = [];
      let products = [];
      let services = [];
      let themes = [];
      let personas = [];
      const Platforms = [
        "Linkedin Static Posts",
        "Linkedin Carousel Posts",
        "Linkedin Polls",
        "Blogs",
        "Podcasts",
        "Emails",
        "Case Studies",
        "WhitePapers",
      ];
      temp.push(...industrydata.companyId.industries);
      products.push(...industrydata.companyId.products);
      services.push(...industrydata.companyId.services);
      themes.push(...industrydata.toptrends);
      personas.push(...response.data.persona);

      industrydata.competitorsId.map((val) => {
        temp.push(...val.industries);
      });

      temp = removeDuplicates(temp);
      setTargetIndustry(temp);
      setProducts(products);
      setServices(services);
      setThemes(themes);
      setPersonas(personas);
      setPlatforms(Platforms);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const sendDataToParent = async (newWidths) => {
    setWidths(newWidths);
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  return (
    <>
      <Drawer open={open} onClose={onClose} anchor={"right"}  zIndex={100000000000}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "950px" }}>
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between", // Align items to the start and end of the row
                mt: 4,
                mb: 4,
                // width: "60rem",
              }}
            >
              <Grid container item xs={7} pl={3}>
                <Typography variant="Heading">
                  Creating New Content Calendar
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={5}
                pr={4}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                {loading  ? (
                  <Box marginTop={"0.5rem"} marginRight={"1.5rem"}>
                    <CircularProgress size={"1.8rem"} />
                  </Box>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#3B3BB6",
                      color: "#FFFFFF",
                      borderRadius: 2,
                    }}
                  >
                    Create Calendar
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#F2F2F2",
                    color: "#757575",
                    "&:hover": {
                      backgroundColor: "#3B3BB6",
                      color: "#FFFFFF",
                    },
                    borderRadius: 2,
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Divider />

            <Box pl={5} pt={2}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Select the Date Range
                </Typography>
              </FormLabel>

              <Grid container mb={8}>
                <Grid item xs={5}>
                  <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                    <Typography variant="smallGreyHeading">
                      STARTING DATE
                    </Typography>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          label="Date"
                          className={Styles.date_picker}
                          value={field.value}
                          inputRef={field.ref}
                          sx={{ backgroundColor: "#fff" }}
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                    <Typography variant="smallGreyHeading">
                      ENDING DATE
                    </Typography>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="endDate"
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          label="Date"
                          className={Styles.date_picker}
                          value={field.value}
                          inputRef={field.ref}
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={borderMargin} />

            <Box pl={5} pr={8} pt={1}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Set the content's Objective for this month
                </Typography>
              </FormLabel>
              <TagSlider
                widths={widths}
                setWidths={setWidths}
                sendDataToParent={sendDataToParent}
              />
            </Box>

            <Divider sx={borderMargin} />

            {/* Platform Included */}
            <Grid item xs={12} sx={{ paddingLeft: 5 }}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Select the type of Content you want to include in Campaign
                </Typography>
              </FormLabel>
              <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                <Typography variant="smallGreyHeading1">
                  Selecting all is recommended for best results. Unselect items
                  only if you want to specifically exclude them from your
                  campaign.
                </Typography>
              </FormLabel>

              <FormGroup>
                {platforms.map((platform) => (
                  <FormControlLabel
                    key={platform}
                    control={
                      <Controller
                        name="platforms"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            checked={value.includes(platform)}
                            onChange={(e) => {
                              const newSelection = e.target.checked
                                ? [...value, platform]
                                : value.filter((t) => t !== platform);
                              onChange(newSelection);
                            }}
                          />
                        )}
                      />
                    }
                    label={
                      <span style={{ fontSize: "0.94rem" }}>{platform}</span>
                    }
                  />
                ))}
              </FormGroup>
            </Grid>
            <Divider sx={borderMargin} />
            <Box pl={5}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Select the Products and/or Services that you want to focus on
                </Typography>
              </FormLabel>
              {/* Products */}
              <Grid container sx={{ marginTop: 1 }}>
                <Grid item xs={4}>
                  <FormLabel component="legend">
                    <Typography variant="smallGreyHeading">PRODUCTS</Typography>
                  </FormLabel>
                  <FormGroup>
                    {products.map((product, index) => (
                      <FormControlLabel
                        key={product.name}
                        control={
                          <Controller
                            name="products"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={field.value.includes(product.name)}
                                onChange={(e) => {
                                  const newSelection = e.target.checked
                                    ? [...field.value, product.name]
                                    : field.value.filter(
                                        (name) => name !== product.name
                                      );
                                  setValue("products", newSelection);
                                }}
                              />
                            )}
                          />
                        }
                        label={
                          <span style={{ fontSize: "0.94rem" }}>
                            {product.name}
                          </span>
                        }
                      />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel component="legend">
                    <Typography variant="smallGreyHeading">SERVICES</Typography>
                  </FormLabel>
                  <FormGroup>
                    {services.map((service, index) => (
                      <FormControlLabel
                        key={service.name}
                        control={
                          <Controller
                            name="services"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                checked={field.value.includes(service.name)}
                                onChange={(e) => {
                                  const newSelection = e.target.checked
                                    ? [...field.value, service.name]
                                    : field.value.filter(
                                        (name) => name !== service.name
                                      );
                                  setValue("services", newSelection);
                                }}
                              />
                            )}
                          />
                        }
                        label={
                          <span style={{ fontSize: "0.94rem" }}>
                            {service.name}
                          </span>
                        }
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={borderMargin} />
            <Box pl={5} pr={3}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Select your Target Personas and Attributes, and Top Target
                  Industy Themes (optional)
                </Typography>
              </FormLabel>

              <Grid
                container
                sx={{
                  marginTop: 1.5,
                  marginBottom: 3.5,
                  width: "77%",
                  border: 1.5,
                  borderColor: "divider",
                  borderRadius: "8px",
                  paddingTop: 2.5,
                  paddingBottom: 2.5,
                }}
              >
                {/* Target Personas */}
                <Grid item xs={12} p={"0rem 1rem"} width={"20rem"}>
                  <FormLabel component="legend">
                    <Typography variant="smallGreyHeading">
                      TARGET PERSONAS
                    </Typography>
                  </FormLabel>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    sx={{ backgroundColor: "#F2F2F2", width: "64%" }}
                  >
                    <Controller
                      name="userPersona"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          sx={{ width: "100%" }}
                          label="userPersona"
                          {...field}
                        >
                          {personas.map((persona) => (
                            <MenuItem
                              onClick={() => handleSelectedPersona(persona)}
                              key={persona._id}
                              value={persona._id}
                            >
                              {`${persona.designation} in ${persona.industry}`}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={3} pl={1}>
                  <FormLabel component="legend">
                    <Typography variant="smallGreyHeading">
                      TARGET INDUSTRY
                    </Typography>
                  </FormLabel>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    // sx={{ backgroundColor: "#F2F2F2" }}
                  >
                    <Controller
                      name="industry"
                      control={control}
                      // defaultValue=""
                      render={({ field }) => (
                        <Select label="industry" {...field}>
                          {targetindustry.map((industry) => (
                            <MenuItem key={industry} value={industry}>
                              {industry}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid> */}
                <Divider sx={{ width: "100%", margin: "1.5rem 0rem" }} />
                {/* persona attribute */}
                <Grid item xs={12} p={"0rem 1rem"}>
                  <FormLabel component="legend">
                    <Typography variant="smallGreyHeading">
                      PERSONA ATTRIBUTE
                    </Typography>
                  </FormLabel>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    // sx={{ backgroundColor: "#F2F2F2" }}
                  >
                    <Grid container alignItems={"center"}>
                      <Grid item xs={2.5}>
                        <Typography>Motivations : </Typography>
                      </Grid>
                      <Grid item xs={9.5}>
                        <Controller
                          name="Motivation"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select label="Motivation" {...field}>
                              {Motivations?.map((attribute) => (
                                <MenuItem key={attribute} value={attribute}>
                                  {attribute}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container mt={2} alignItems={"center"}>
                      <Grid item xs={2.5}>
                        <Typography>Pain Points : </Typography>
                      </Grid>
                      <Grid item xs={9.5}>
                        <Controller
                          name="PainPoints"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select label="Pain Points" {...field}>
                              {PainPoints?.map((attribute) => (
                                <MenuItem key={attribute} value={attribute}>
                                  {attribute}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container mt={2} alignItems={"center"}>
                      <Grid item xs={2.5}>
                        <Typography>KPIs : </Typography>
                      </Grid>
                      <Grid item xs={9.5}>
                        <Controller
                          name="KPI"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select label="KPI" {...field}>
                              {KPIs?.map((attribute) => (
                                <MenuItem key={attribute} value={attribute}>
                                  {attribute}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Divider sx={{ width: "100%", margin: "1.5rem 0rem" }} />

                {/* Target Themes */}
                <Grid item xs={12} sx={{ paddingLeft: 2 }}>
                  {selectedPersona == null ? (
                    <Typography
                      variant="smallGreyHeading1"
                      display="flex"
                      alignItems="center"
                    >
                      <IconInfoCircle style={{ marginRight: "10px" }} />
                      Select a Persona to see Top Themes in its Industry
                    </Typography>
                  ) : (
                    <>
                      <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                        <Typography variant="smallGreyHeading">
                          TARGET INDUSTRY THEMES (OPTIONAL)
                        </Typography>
                      </FormLabel>
                      <FormGroup>
                        {themes.map((theme) => (
                          <FormControlLabel
                            key={theme}
                            control={
                              <Controller
                                name="themes"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                  <Checkbox
                                    checked={value.includes(theme)}
                                    onChange={(e) => {
                                      const newSelection = e.target.checked
                                        ? [...value, theme]
                                        : value.filter((t) => t !== theme);
                                      onChange(newSelection);
                                    }}
                                  />
                                )}
                              />
                            }
                            label={
                              <span style={{ fontSize: "0.94rem" }}>
                                {theme}
                              </span>
                            }
                          />
                        ))}
                      </FormGroup>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Divider sx={borderMargin} />

            <Box paddingX={5} mb={4}>
              <FormLabel component="legend">
                <Typography variant="MainHeading">
                  Mention any special instructions to include in the prompt
                </Typography>
              </FormLabel>
              <Controller
                name="additionalInstructions"
                control={control}
                render={({ field }) => (
                  <TextField
                    placeholder="Mention any special instructions to include in the prompt. These will be added to AI generated prompt."
                    {...field}
                    label=""
                    multiline
                    rows={4}
                    margin="normal"
                    sx={{ backgroundColor: "#fff", marginBottom: 5 }}
                    fullWidth
                  />
                )}
              />
            </Box>
          </form>
        </LocalizationProvider>
      </Drawer>
    </>
  );
};

export default CreateCalendar;
