import React, { useState } from "react";
import { Upload, Button } from "antd";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DownloadingIcon from "@mui/icons-material/Downloading";
import api from "@utils/api";

const UploadSales = () => {
  const { companyId } = useParams();
  const [currFile, setCurrFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const props = {
    name: "file",
    beforeUpload: (file) => {
      setCurrFile(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => setCurrFile(null),
    maxCount: 1,
  };

  const handleUpload = async () => {
    if (!currFile || !companyId) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", currFile);
      formData.append("companyId", companyId);

      await api.post(`${import.meta.env.VITE_USER_SEGMENTS_API}/usersegments/createUserSegment`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set success message and reset states
      setSuccessMessage("Document uploaded successfully!");
      setCurrFile(null); // Reset the file input

      // Clear the message after 3 seconds and refresh the page
      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload(); // Refresh the page
      }, 3000);
    } catch (error) {
      console.error(error);
      // handle error (e.g., display an error message)
    }
    setUploading(false);
  };

  return (
    <div className="w-2xl mx-4 p-2 bg-white">
      <Box
        sm={{ padding: 3 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          width: "70%"
        }}>
        <div
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
          <DownloadingIcon style={{ fontSize: "4rem", color: "#4f55fff5", marginBottom: "0.5rem" }} />
          <Typography align="center" sx={{ fontSize: "0.8rem", fontWeight: "500", color: "grey" }}>
            Drag & Drop to Upload
            <br /> or <br />
          </Typography>
          <Upload {...props}>
            <Button style={{ color: "#525252", fontSize: "0.88rem" }}>Browse File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={!currFile}
            loading={uploading}
            style={{ marginTop: 5 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
          {successMessage && (
            <p style={{ color: "green", marginTop: 10 }}>{successMessage}</p>
          )}
        </div>
      </Box>
    </div>
  );
};

export default UploadSales;
