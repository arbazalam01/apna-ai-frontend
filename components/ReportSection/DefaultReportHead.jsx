import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { reportCompanyIdStore } from "../../store/ReportStore";
import { Skeleton, Tooltip, Avatar } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { styled } from "@mui/material/styles";
import { UserOutlined } from "@ant-design/icons";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#3b3bb6",
    width: "auto",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "capitalize", 
  "&.Mui-selected": {
    color: "#3b3bb6 !important",
    fontWeight: "600",
  },
  "&.MuiTab-root": {
    fontFamily: "Figtree",
    fontSize: "0.95rem",
    color: "#9e9e9e",
    fontWeight: "600",
    minWidth: "0px !important",
    "&:hover": {
      color: "#3b3bb6",
    },
  },
}));

const DefaultReportHead = ({ handleChange, section }) => {
  let { companyId } = useParams();

  const [currCompanyId, setCompanyId] = useAtom(reportCompanyIdStore);
  const [mainCompanyID, setMainCompanyID] = useState(null);

  const updatedCompanyId = currCompanyId ? currCompanyId : companyId;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getcompetitors"],
    queryFn: () => {
      const apiUrl = `customer/${companyId}/getcompetitors`;
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

  const companyData = data?.data.data[0];

  const handleAlignment = (event, newAlignment) => {
    setCompanyId(newAlignment);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={2}
        display={"flex"}
        justifyContent={"center"}
        borderRight={"1px solid #E5E5E5"}
      >
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
      </Grid>
      <Grid item xs={10} pt={0.5}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
          }}
        >
          <StyledTabs
            value={section}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <StyledTab value="About" label="About" />
            <StyledTab value="Positioning" label="Positioning" />
            <StyledTab value="SWOT" label="SWOT" />
            <StyledTab value="Products & Services" label="Products & Services" />
            <StyledTab value="SEO" label="SEO Keywords" />
          </StyledTabs>
        </Box>
      </Grid>
    </Grid>
  );
};

const CompanyButton = ({ companyId, imgSrc, name, selected }) => {
  return (
    <Tooltip title={name} placement="bottom">
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
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            height={40}
            width={40}
          />
        ) : (
          <Avatar size={40} icon={<UserOutlined />} />
        )}
      </ToggleButton>
    </Tooltip>
  );
};

export default DefaultReportHead;
