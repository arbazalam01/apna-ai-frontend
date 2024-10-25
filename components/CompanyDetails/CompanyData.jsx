import { Button, Grid, Paper, Typography } from "@mui/material";
import PaperComp from "../ReportSection/PaperComp";
import YourCompany from "./InnerComponents/YourCompany";
import Competitors from "./InnerComponents/Competitors";
import BrandAssets from "./InnerComponents/BrandAssets";
import UserManagement from "./InnerComponents/UserManagement";
import RoleManagement from "./InnerComponents/RoleManagement";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { notification } from "antd";
import useCompanyId from "@hooks/useCompanyId";
import useCompanyCompetitor from "@hooks/useCompanyCompetitor";
import { useState, useEffect } from "react";
import Loader from "@components/Loader";
import TextArea from "antd/es/input/TextArea";
import api from "@utils/api";

const PaperHeight = {
  cursor: "pointer",
  border: "1px solid #D9D9D9",
  boxShadow: "none",
  borderRadius: "15px",
  padding: "0.5rem 1.5rem ",
  "&:hover": {
    boxShadow: "0px 0px 30px 1px #e6e6e6",
  },
};

const CompanyData = () => {
  const { companyId } = useParams();

  const [notificationapi, contextHolder] = notification.useNotification();

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [showLinks, setShowlinks] = useState(false);

  const handleShowLinks = () => {
    setShowlinks(!showLinks);
  };

  const [url, setUrl] = useState({
    googleSheetUrl: "",
    compositeScoreUrl: "",
  });

  const openNotificationWithIcon = (type) => {
    if (!notificationOpen) {
      setNotificationOpen(true);
      notificationapi[type]({
        message: "Report Regeneration Started !!",
        duration: 10,
        onClose: () => setNotificationOpen(false),
      });
    }
  };

  const { data: company, isLoading } = useCompanyCompetitor(companyId);

  const companyData = company;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getcompetitors"],
    queryFn: () => {
      const apiUrl = `customer/${companyId}/getcompetitors`;
      // const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const apiRes = api.get(apiUrl);
      return apiRes;
    },
  });
  const companyDetails = data?.data.data[0];

  useEffect(() => {
    if (companyId) {
      setUrl({
        googleSheetUrl: companyData?.company?.about?.googleSheetUrl,
        compositeScoreUrl: companyData?.company?.about?.compositeScoreUrl,
      });
    }
  }, [companyId, companyData]);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      {contextHolder}
      <Grid container pt={2} pb={2} pl={2}>
        {/* YOUR COMPANY */}
        <Grid lg={4} mr={2}>
          <Grid item lg={12} mb={2}>
            <Paper sx={PaperHeight}>
              <YourCompany
                companyData={companyData}
                openNotificationWithIcon={openNotificationWithIcon}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={PaperHeight}>
              <Competitors companyData={companyData} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyData;
