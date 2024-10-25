import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Typography } from "@mui/material";
import { Layout } from "antd";
import { Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProspectTable from "./ProspectTable/ProspectTable";
import CSVProspectUpload from "./CSVProspectUpload/csvProspectUpload";
import CSVProspectPrevUpload from "./CSVProspectPrevUpload/csvProspectPrevUpload";
import PreviewEmailCampaign from "./PreviewEmailCampaign/PreviewEmailCampaign";
import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { useAtom, useSetAtom } from "jotai";
import {
  campaignStore,
  prospectUploadDialogStore,
  campaignDialogStore,
} from "@store/ProspectStore";
import EmailGuideLines from "./EmailGuideLines/EmailGuideLines";
import { useParams } from "react-router-dom";
import { tabValueStore } from "@store/EmailCampaignStore";
import Loader from "@components/Loader";

const { Content } = Layout;

const tabTheme = {
  fontSize: "1rem",
  textTransform: "none",
  width: "auto",
};

function EmailCampaign() {
  let { companyId } = useParams();
  const [value, setValue] = useAtom(tabValueStore);
  const setProspectUploadDialog = useSetAtom(prospectUploadDialogStore);
  const setCampaignDialog = useSetAtom(campaignDialogStore);
  const setCampaignList = useSetAtom(campaignStore);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllCampaigns"],
    queryFn: () => {
      // const endpoint = `campaign/getCampaign?companyId=${companyId}`;
      const apiUrl = `campaign/getCampaign?companyId=${companyId}`;
      const apiRes = api.get(apiUrl);
      return apiRes;
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [prospectType, setprospectType] = useState("Import Prospects");

  const handleDropdownChange = (event) => {
    setprospectType(event.target.value);
    console.log(event.target.value);
    if (event.target.value == 1) {
      setProspectUploadDialog(true);
    } else {
      setCampaignDialog(true);
    }
  };

  if (isPending) return <Loader />;
  if (isError) return <div>Error:{error.message}</div>;
  const { data: campaignList } = data;

  const formattedCampaignList = campaignList.map((campaign) => {
    return {
      campaignId: campaign._id,
      name: campaign.name,
      prospects: campaign.prospectIds.length,
      date: new Date(campaign.createdAt).toDateString(),
      theme:
        "Introducing the Electronic Health Records (EHR) product to Private Hospitals",
      product: "Electronic Health Records",
      industry: "Private Hospitals",
    };
  });

  setCampaignList(formattedCampaignList);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Typography variant="h6" sx={{ mt: 2, ml: 2, mb: 1 }}>
        Email Campaign
      </Typography>

      <Tabs value={value} onChange={handleChange}>
        <Tab value="guidelines" label="Guidelines" style={tabTheme} />
        {/* <Tab
          value="template"
          label="Template"
          style={{ textTransform: "none" }}
        /> */}
        <Tab value="prospects" label="Prospects" style={tabTheme} />
        {/* <Tab
          value="creation"
          label="Creation"
          style={{ textTransform: "none" }}
        /> */}
        <Tab value="preview&export" label="Preview & Export" style={tabTheme} />
      </Tabs>
      <Divider sx={{ marginTop: 1 }} />
      {value === "prospects" && (
        <Box sx={{ py: 2 }}>
          <Content>
            <FormControl
              // variant="filled"
              sx={{
                m: "0.6rem 1rem 1rem 1rem",
                minWidth: "16rem",
              }}
            >
              <Select
                // sx={{
                //   border: "1px solid grey",
                // }}
                defaultValue="defaultValue"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={prospectType}
                onChange={handleDropdownChange}
              >
                <MenuItem value={1}>From CSV File</MenuItem>
                <MenuItem value={2}>From Previous Campaigns</MenuItem>
              </Select>
            </FormControl>

            <CSVProspectUpload />

            <ProspectTable />

            <CSVProspectPrevUpload />
          </Content>
        </Box>
      )}
      {value === "preview&export" && (
        <Box>
          <Content>
            <PreviewEmailCampaign />
          </Content>
        </Box>
      )}
      {value === "guidelines" && (
        <Box>
          <Content>
            <EmailGuideLines />
          </Content>
        </Box>
      )}
    </Box>
  );
}

export default EmailCampaign;
