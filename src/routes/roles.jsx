
import { Layout, Typography } from "antd";
import { Grid, IconButton, Button } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RoleManagementTable from "@components/Roles/RolesTable/RolesTable";
import { useParams } from "react-router-dom";
const { Content } = Layout;

const RolesPage = () => {
  
  const { companyId } =  useParams();

  const [isEditable, setIsEditable] = useState(false);
  // Toggle the editable state
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Handle click to save changes
  const handleSaveClick = () => {
    // Logic to save changes
    setIsEditable(false);
  };

  // Handle click to cancel editing
  const handleCancelClick = () => {
    // Logic to cancel changes
    setIsEditable(false);
  };

  return (
    <>
      <Layout
        className="layout"
        style={{ background: "white", minHeight: "100vh" }}
      >
        {/* <HeaderComponent showSignOut={false} /> */}
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            padding: 3.5,
          }}
        >
          <Typography id="title" component="h3" variant="h3" sx={{ mt: 4 }}>
            Role Management
          </Typography>

          {isEditable ? (
            <>
              <Button
                type="submit"
                onClick={handleSaveClick}
                size="small"
                variant="contained"
                sx={{ mt: 2, ml: 2, backgroundColor: "#3B3BB6" }}
              >
                Save Changes
              </Button>
              <Button
                type="submit"
                onClick={handleCancelClick}
                size="small"
                variant="contained"
                sx={{ mt: 2, ml: 2, backgroundColor: "#3B3BB6" }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <IconButton
              size="small"
              onClick={handleEditClick}
              sx={{ mt: 2, ml: 2 }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}
        </Grid>
        <Content>
          <RoleManagementTable companyId={companyId} isEditable={isEditable} />
        </Content>

        {/* <FooterComponent /> */}
      </Layout>
    </>
  );
};
export default RolesPage;
