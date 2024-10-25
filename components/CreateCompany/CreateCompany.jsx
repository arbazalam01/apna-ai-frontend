import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import { Image, Upload, Layout } from "antd";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { Controller, useForm, useFormContext } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Company from "./CompanyCreationQuestions/Questions/Company";
import Competitor from "./CompanyCreationQuestions/Questions/Competitor";
import BrandAssets from "./CompanyCreationQuestions/Questions/BrandAssets";
import { styled } from "@mui/system";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";

const { Content } = Layout;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateCompany = ({ competitorsField, AddSection, DeleteSection }) => {
  const methods = useFormContext();
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, getValues, reset } = methods;
  const [isDisabled, setIsDisabled] = useState(false);

  const [companyId, setCompanyId] = useState(null);
  const [currFile, setCurrFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const props = {
    name: "files",
    beforeUpload: (file) => {
      setCurrFile((prevFiles) => [...prevFiles, file]); // Append the new file to the existing files
      return false;
    },
    onRemove: () => {
      setCurrFile((prevFiles) => prevFiles.filter((f) => f !== file)); // Remove the file from the array
    },
    maxCount: 5,
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // const onSubmit = async (data) => {
  //   const apiUrl = "customer/addcustomer";

  //   const payLoad = data;
  //   console.log("payLoad", payLoad);
  //   const apiRes = await api.post(apiUrl, payLoad);
  //   if (apiRes.status === 200) {
  //     console.log("in 200 block", apiRes);
  //     // handleCloseDrawer();
  //     // setCompanyId(apiRes.data.data.companyId);
  //     queryClient.invalidateQueries({ queryKey: ["customers"] });
  //   } else {
  //     console.error("Failed to create user");
  //   }
  // };

  const nextStep = () => {
    if (step === 1) {
      const companyDetails = getValues('company');
      if (!companyDetails.name || !companyDetails.websiteUrl) {
        alert('Company name and website cannot be empty');
        return;
      }
    }
  
    if (step === 2) {
      const competitors = getValues('competitors');
      if (competitors.length === 0 || competitors.length > 2) {
        alert('You need to add at least 1 competitor and no more than 2 competitors.');
        return;
      }
  
      const invalidCompetitors = competitors.some(
        (competitor) => !competitor.name || !competitor.websiteUrl
      );
      if (invalidCompetitors) {
        alert('Competitor details cannot be empty');
        return;
      }
    }
  
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  // http://localhost:3001/customer/addassets/:companyId

  const handleSubmitAll = async (companyId) => {
    // if (currFile.length === 0) return;
  
    console.log("companyId in HandleSubmitAll:", companyId);
  
    try {
      if (companyId) {
        const formData = new FormData();
        currFile.forEach((file) => {
          formData.append("files", file); // Append each file to formData
        });
  
        const apiUrl = `customer/addassets/${companyId}?rerun=1`;
        await api.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        navigate(`/${companyId}/overview`);
        setCurrFile([]); // Clear the current files after successful upload

      } else {
        console.error("Cannot upload assets. Company ID is missing.");
      }
    } catch (err) {
      console.error("Error during file upload:", err);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["getcompetitors"] });

    }
  };
  
  console.log("companyId after onSubmit:", companyId);

  console.log("currFile", currFile);
  return (
    <Grid
      container
      minHeight={"88vh"}
      // spacing={2}
      justifyContent={"space-between"}
      // mb={10}
    >
      <Grid item p={2}>
        <Grid container>
          <Typography variant="Heading-head">
            Create your Company’s Profile
          </Typography>
        </Grid>
        <Grid container>
          <Typography
            variant="smallGreyHeading1"
            style={{ lineHeight: "2.5rem" }}
          >
            Step {step} of 3
          </Typography>
        </Grid>

        {step === 1 && (
          <Box>
            <Grid>
              <Company nextStep={nextStep} />
            </Grid>
            <SectionInput name="company" control={control} />
          </Box>
        )}

        {step === 2 && (
          <Box mb={10}>
            <Grid>
              <Competitor nextStep={nextStep} />
            </Grid>

            {competitorsField.map((field, index) => (
              <SectionInput
                key={field.id}
                name={`competitors[${index}]`}
                handleDelete={DeleteSection}
                index={index}
                control={control}
                isDelete={true}
              />
            ))}
            {getValues('competitors').length < 2 && (
            <Button
  variant="button2"
  style={{ marginTop: "1rem" }}
  onClick={() => {
    const competitors = getValues('competitors');
    if (competitors.length < 2) {
      AddSection();
    } else {
      alert('You can only add up to 2 competitors.');
    }
  }}
  startIcon={<AddIcon />}
>

              Add Competitor
            </Button>)}
          </Box>
        )}

        {step === 3 && (
          <Box>
            <Grid>
              <BrandAssets nextStep={nextStep} />
            </Grid>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ padding: 3 }}
              mt={2}
            >
              <Content
                style={{
                  borderWidth: "2px",
                  border: "2px dashed #A6A8B2",
                  borderRadius: "1rem",
                  padding: "3rem 0rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DownloadingIcon
                  style={{
                    fontSize: "4rem",
                    color: "#A6A8B2",
                    marginBottom: "0.5rem",
                  }}
                />
                <Typography
                  align="center"
                  sx={{ fontSize: "0.8rem", fontWeight: "500", color: "grey" }}
                >
                  Drag & Drop to Upload
                  <br /> or <br />
                </Typography>
                <Upload
                  {...props}
                  listType="picture-card"
                  onPreview={handlePreview}
                  maxCount={5}
                  multiple
                >
                  {/* <Button style={{ color: "#525252", fontSize: "0.88rem" }}>
                  Browse File
                </Button> */}
                  <div>
                    <div>
                      <PlusOutlined />
                    </div>
                    <div>
                      <Typography variant="caption">Upload</Typography>
                    </div>
                  </div>
                </Upload>

                <Modal
                  open={previewOpen}
                  onClose={() => setPreviewOpen(false)}
                  aria-labelledby="image-preview-title"
                  aria-describedby="image-preview-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "auto",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Modal>
              </Content>
            </Box>
          </Box>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"end"}
        pl={2}
        mb={10}
      >
        {step > 0 && (
          <Button
            variant="button2"
            onClick={prevStep}
            sx={{ mr: 2 }}
            disabled={step === 1}
          >
            Previous
          </Button>
        )}
        {step < 3 && (
          <Button variant="button2" onClick={nextStep}>
            Next
          </Button>
        )}
        {step === 3 && (
         <Button
         variant="button1"
         style={{color:"#fff"}}
         disabled={isDisabled}
         onClick={async () => {
          setIsDisabled(true); // Disable the button

           await handleSubmit(async (data) => {
             const apiUrl = "customer/addcustomer";
             const payLoad = data;
             const apiRes = await api.post(apiUrl, payLoad);
             console.log(apiRes);
             console.log("apiRes.data.message", apiRes?.data?.message);
       
             if (apiRes.status === 200) {
               const newCompanyId = apiRes.data.message;
               setCompanyId(newCompanyId);
       
               // Call handleSubmitAll after companyId is updated
               await handleSubmitAll(newCompanyId);
             } else {
               console.error("Failed to create user");
             }
           })();
         }}
       >
         Start Data Collection
       </Button>
       
     
        )}
      </Grid>
    </Grid>
  );
};

export default CreateCompany;

const SectionInput = ({
  name,
  handleDelete,
  index,
  control,
  isDelete = false,
}) => {
  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={12} mb={2}>
          <Controller
            name={`${name}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField
                {...field}
                label="Company Name"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Controller
            name={`${name}.websiteUrl`}
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Enter a valid Website URL",
              },
            }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Company Website URL"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name={`${name}.linkedinUrl`}
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                message: "Enter a valid LinkedIn URL",
              },
            }}
            render={({ field, fieldState }) => (
              <StyledTextField
                {...field}
                label="Company Linkedin URL"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
        </Grid>
        {isDelete && (
          <Grid item xs={12} md={2}>
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "#f5f5f5", // grey background
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // remove border
    },
    "&:hover fieldset": {
      borderColor: "transparent", // remove hover border
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // remove focus border
    },
  },
  "& .MuiInputLabel-root": {
    color: "#b0aeae", // primary color for label
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3b3bb6", // primary color for focused label
  },
}));
