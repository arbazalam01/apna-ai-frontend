import DownloadingIcon from "@mui/icons-material/Downloading";
import { Box } from "@mui/system";
import { Button, Upload, Layout, message } from "antd";
import React, { useState } from "react";
import api from "@utils/api";
import { useAtomValue, useSetAtom } from "jotai";
import {
  campaignGuidlineStore,
  prospectStore,
  prospectUploadDialogStore,
} from "@store/ProspectStore";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const { Content } = Layout;

const UploadProspects = () => {
  let { companyId } = useParams();
  const [currFile, setCurrFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const setProspectUploadDialog = useSetAtom(prospectUploadDialogStore);
  const setPrsopectList = useSetAtom(prospectStore);
  const guidelines = useAtomValue(campaignGuidlineStore);

  const props = {
    name: "file",
    beforeUpload: (file) => {
      setCurrFile(file);
      return false;
    },
    onRemove: (file) => {
      setCurrFile(null);
    },
    maxCount: 1,
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", currFile);
      formData.append("product",guidelines.product)
      formData.append("objectives",guidelines.objectives)
      formData.append("numberOfEmails",guidelines.numberOfEmails)
      // console.log("CurrFile------->", currFile);
      // formData.append("companyId", companyId);

      // Object.keys(guidelines).forEach((key) => {
      //   formData.append(key, guidelines[key]);
      // });

      const apiUrl = `prospects/uploadProfiles`;

      const res = await api.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = res;
      const updatedProspectList = data.prospects.map((prospect, index) => {
        return {
          key: prospect._id,
          prospectname: prospect.name,
          email: prospect.email,
          role: prospect.title,
          company: prospect.companyName,
          designation: prospect.title,
          prospectId: prospect._id,
          industry: prospect.industry,
        };
      });
      setProspectUploadDialog(false);
      setPrsopectList(updatedProspectList);
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };
  return (
    <>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ padding: 3 }}
        mt={2}
      >
        <Content
          style={{
            borderWidth: "2px",
            border: "2px dashed #4f55fff5",
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
              color: "#4f55fff5",
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
          <Upload {...props}>
            <Button style={{ color: "#525252", fontSize: "0.88rem" }}>
              Browse File
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={!currFile}
            loading={uploading}
            style={{
              marginTop: 5,
            }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </Content>
      </Box>
    </>
  );
};

export default UploadProspects;
