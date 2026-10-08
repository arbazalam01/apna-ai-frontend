import { Grid, Box, Typography, Button } from "@mui/material";
import { Avatar, Tooltip } from "antd";
import { IconArrowRight, IconMailFilled, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@utils/api";
import { reportCompanyIdStore } from "@store/ReportStore";
import { useAtom, useSetAtom } from "jotai";
import Loader from "@components/Loader";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "antd";
import combinedreport from "/Icons/Misc/CombinedReport.svg";
import ReportToggle from "./ReportToggle";
import { summaryReportUI } from "../../store/ReportStore";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { reportSection } from "@store/ReportStore";
import { UserOutlined } from "@ant-design/icons";
import { notification } from "antd";


const centerItem = {
  display: "flex",
  textAlign: "center",
  alignItems: "center",
};

const Head = () => {
  let { companyId } = useParams();
  const [reportUI, setReportUI] = useAtom(summaryReportUI);
  const [isHovered, setIsHovered] = useState(false);
  const [section, setSection] = useAtom(reportSection);

  const [mainCompanyID, setMainCompanyID] = useState(null);
  const themMobile = useTheme();
  const isMobile = useMediaQuery(themMobile.breakpoints.up("sm"));
  const [currCompanyId, setCompanyId] = useAtom(reportCompanyIdStore);

  const [apis, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    apis[type]({
      message: `Regenerating ${section} Section !!`,
      duration:  4.5,
      
    });
  };

  console.log("mainCompanyIDmainCompanyIDmainCompanyID", mainCompanyID);


  const setCompanyIdAtom = useSetAtom(reportCompanyIdStore);

  const queryClient = useQueryClient();
  const updatedCompanyId = currCompanyId ? currCompanyId : companyId;

  let navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getcompetitors"],
    queryFn: () => {
      const apiUrl = `customer/${companyId}/getcompetitors`;
      // const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const apiRes = api.get(apiUrl);
      return apiRes;
    },
  });

  useEffect(() => {
    if (companyId) {
      setMainCompanyID(companyId);
    }
  }, [companyId]);

  if (isPending) {
    return <Skeleton />;
  }
  if (isError) {
    return <div>Error :{error.message}</div>;
  }

  // console.log("data----->",data?.data)
  const companyData = data?.data.data[0];

  console.log("companyData====>", companyData);

  const handleAlignment = (event, newAlignment) => {
    setCompanyId(newAlignment);
  };

  const handleNavigate = () => {
    navigate(`/${mainCompanyID}/combinedreports`);
  };
  console.log("reportUI CLICK", reportUI);


  let sectiontype='';
  if (section==="About") {
    sectiontype="about";
  }else if (section==="Products & Services") {
    sectiontype="services";
  }else if (section==="SEO") {
    sectiontype="topseos";
  } else if(section==="Leadership") {
    sectiontype="leadership";
  } else if(section==="Blog Activity") {
    sectiontype="blogs";
  } else if(section==="Positioning") {
    sectiontype="marketposition";
  } else if(section==="SWOT") {
    sectiontype="swotanalysis";
  } else{
    sectiontype="about";
  }

  const handleRegenerate = async () => {
    try {
      const type = sectiontype;
      const payLoad = {
        companyId,
        type,
      };
  
      console.log("payLoad", payLoad);
  
      const apiUrl = "customer/run-assistance";
      console.log("Regenerating products",section);
      if (type==="about"){
const summaryPayload={...payLoad,type:"summary"};

        const summaryResponse = await api.post(apiUrl, summaryPayload);
        if (summaryResponse.status === 200) {
          console.log("Summary regeneration successful");
        } else {
          console.error("Failed to regenerate summary");
        }
      }
  
      if (type === "services") {
        console.log("Regenerating services and products",type);
        // Make first API call for products
        const productsPayload = { ...payLoad, type: 'products' };
        const productsResponse = await api.post(apiUrl, productsPayload);
        if (productsResponse.status === 200) {
          console.log("Products regeneration successful");
        } else {
          console.error("Failed to regenerate products");
        }
  
        // Make second API call for services
        const servicesPayload = { ...payLoad, type: 'services' };
        const servicesResponse = await api.post(apiUrl, servicesPayload);
        if (servicesResponse.status === 200) {
          console.log("Services regeneration successful");
        } else {
          console.error("Failed to regenerate services");
        }
      } else {
        // For other sections, make a single API call
        const apiResponse = await api.post(apiUrl, payLoad);
        if (apiResponse.status === 200) {
          console.log("Prompt regeneration successful");
        } else {
          console.error("Failed to regenerate prompt");
        }
      }
    } catch (error) {
      console.error("Error during prompt regeneration:", error);
    } finally{
      queryClient.invalidateQueries({ queryKey: ["companyData", companyId] });
    }
  };
  
  

  return (
    <>
      {/*  
    <Grid sx={{
          
          height: "5rem",
        zIndex: 12,
        backgroundColor: "#fff",
          }} > */}

      <Grid
        container
        sx={{
          // position: "fixed",

          // justifyContent: "space-between",
          alignItems: "center",
          // paddingX: 2,
          // paddingY: 3.3,

          // height: "5rem",
        }}
      > {contextHolder}
        <Grid size={3}>
          <Typography variant="Heading-head"> Reports</Typography>
        </Grid>
        {isMobile && (
          <>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center"
              }}
              size={4.5}>
              {reportUI === null || reportUI === "default" ? (
                ""
              ) : (
                <ToggleButtonGroup
                  value={currCompanyId}
                  onChange={handleAlignment}
                  exclusive
                >
                  <CompanyButton
                    companyId={companyData?.companyId._id}
                    name={companyData?.companyId.name}
                    imgSrc={companyData?.companyId?.about?.companyLogo}
                    selected={companyData?.companyId._id == updatedCompanyId}
                  />
                  {companyData?.competitorsId?.map((company, index) => (
                    <CompanyButton
                      key={company._id}
                      companyId={company._id}
                      name={company.name}
                      imgSrc={company?.about?.companyLogo}
                      selected={company._id == updatedCompanyId}
                    />
                  ))}
                </ToggleButtonGroup>
              )}
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                textAlign: "end",
                gap: 2
              }}
              size={4.5}>
              <Tooltip
                placement="left"
                title={`Regenerate ${section}  Using AI`}
                arrow
                zIndex={10000}
              >
                {reportUI === null || reportUI === "default" ? (
                  <AutoModeIcon
                  onClick={() => {
                    openNotificationWithIcon("success");
                    handleRegenerate();
                  }}
                    style={{
                      fontSize: "1.4rem",
                      cursor: "pointer",
                      color: "#868686",
                    }}
                  />
                ) : (
                  ""
                )}
              </Tooltip>

              <ReportToggle />
              <Tooltip
                placement="bottom"
                title="View Combined Report"
                arrow
                zIndex={10000}
              >
                <Button variant="button1" onClick={handleNavigate}>
                  {/* View Combined Report */}
                  <img src={combinedreport} height={15} width={15} />
                </Button>
              </Tooltip>
            </Grid>
          </>
        )}
      </Grid>
      {/* </Grid> */}
    </>
  );
};

const CompanyButton = ({ companyId, imgSrc, name, selected }) => {
  return (
    <ToggleButton
      value={companyId}
      sx={{
        border: "none",
        textTransform: "none",
        color: "#242842",
        padding: "0.5rem 0.5rem",
        backgroundColor: selected ? "#F0F0F8" : "inherit",
      }}
    >
      <Typography variant="caption" style={centerItem}>
      {imgSrc ? (
         <>
          <img
            src={imgSrc}
            alt={name}
            height={40}
            width={40}
            />
            {name}</>
        ) : (
          <>
          <Avatar size={30} icon={<UserOutlined />} style={{marginRight:"0.5rem"}} />
          {name}
          </>
        )}
      </Typography>
    </ToggleButton>
  );
};

export default Head;
