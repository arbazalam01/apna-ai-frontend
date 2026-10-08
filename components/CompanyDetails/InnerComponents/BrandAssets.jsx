import React, { useState } from "react";
import { Button, Grid, Typography, Divider, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconDots } from "@tabler/icons-react";
import { Upload } from "antd";
import { useParams } from "react-router-dom";
import api from "@utils/api";
import { useQueryClient } from "@tanstack/react-query";
import CompanyActions from "../CompanyActions";

const BrandAssets = ({ assets }) => {
  const { companyId } = useParams();
  const [currFile, setCurrFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const props = {
    name: "files",
    beforeUpload: (file) => {
      setCurrFile((prevFiles) => [...prevFiles, file]); // Append the new file to the existing files
      return false; // Prevent automatic upload
    },
    onRemove: (file) => {
      setCurrFile((prevFiles) => prevFiles.filter((f) => f !== file)); // Remove the file from the array
    },
    
    maxCount: 5,
  };

  const handleSubmitAll = async () => {
    if (currFile.length === 0) return;

    setLoading(true);
    try {
      if (companyId) {
        const formData = new FormData();
        currFile.forEach((file) => {
          formData.append("files", file); // Append each file to formData
        });

        const apiUrl = `customer/addassets/${companyId}?rerun=0`;
        await api.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setCurrFile([]); // Clear the current files after successful upload
      } else {
        console.error("Cannot upload assets. Company ID is missing.");
      }
    } catch (err) {
      console.error("Error during file upload:", err);
    } finally {
      queryClient.invalidateQueries({ queryKey: ["companyCompetitor"] });

      setLoading(false);
    }
  };

  console.log("currFile", currFile);


  const handleDelete = async (fileId) => {
    setLoading(true);
    try {
      const apiUrl = `customer/deleteasset/${fileId}`;
      await api.delete(apiUrl);

      queryClient.invalidateQueries({ queryKey: ["companyCompetitor"] });
    } catch (err) {
      console.error("Error during file deletion:", err);
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        pb: 2,
        borderRadius: "15px"
      }}>
      <Grid
        sx={{
          p: "0.5rem 1.5rem",
          borderRadius: "15px"
        }}
        size={12}>
        <Typography variant="AvgHeading">Brand Assets</Typography>
      </Grid>
      <Grid
        sx={{
          mb: 2,
          p: "0rem 1.5rem"
        }}
        size={12}>
        <Typography variant="caption1">
        Sharing Brochures, Presentations, Marketing materials or other documents with us will help our AI create a richer knowledge base about your business and offerings. Please ensure the assets you add are current and relevant.

        </Typography>
      </Grid>
      <Grid
        style={{maxHeight: "23rem",overflow: "auto",padding: " 0rem 1rem"}}
        size={12}>
        {assets && assets.map((value, index) => {
          const formattedValue = value?.filename.replace(/_/g, " ");
          return (
            <Grid key={index} >
              <Grid container>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                  size={11}>
                  <CheckCircleIcon style={{ color: "#90CE53" }} />
                  <Typography
                    style={{
                      paddingLeft: "0.8rem",
                      fontSize: "0.88rem",
                      fontWeight: "500",
                    }}
                  >
                    {formattedValue}
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center"
                  }}
                  size={1}>
                 
                  <CompanyActions
                        handleDelete={() => handleDelete(value.file_id)} 
                        assetId={"persona._id"}
                      />
                </Grid>
                 </Grid>
              {index !== assets?.length - 1 && (
               <Divider
                 textAlign="center"
                 sx={{
                   borderColor: "#eeeeee",
                   margin: "1rem 0.5rem",
                   width: "90%",
                 }}
               />
             )}
            </Grid>
          );
        })}
      </Grid>
      <Grid
        sx={{
          mt: 1,
          p: "0.5rem 1.5rem"
        }}>
        <Upload {...props} maxCount={5}
      multiple>
          <Button variant="button2">Add Assets</Button>
        </Upload>
        {currFile.length > 0 && (
          <Button
            style={{ marginTop: "1rem" }}
            variant="button2"
            onClick={handleSubmitAll}
            disabled={loading}
          >
            
             {loading &&   <CircularProgress size={18} sx={{ marginRight: "0.5rem" }}/>} Upload Assets
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default BrandAssets;
