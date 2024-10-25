import { Table } from "antd";
import { Button, CircularProgress } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { prospectStore, campaignGuidlineStore } from "@store/ProspectStore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import api from "@utils/api";
import { useParams } from "react-router-dom";
import { campaignId } from "@store/ProspectStore";
import { tabValueStore } from "@store/EmailCampaignStore";
import { notification } from "antd";
const tableTheme = {
  display: "flex",
  alignItems: "flex-end",
  fontSize: "0.8rem",
  fontWeight: "400",
  color: "grey",
};
const columns = [
  {
    title: (
      <span style={tableTheme}>
        PROSPECT NAME <ArrowDropDownIcon />{" "}
      </span>
    ),
    dataIndex: "prospectname",
    key: "prospectname",
    render: (text) => (
      <div style={{ fontSize: "0.9rem", fontWeight: "500", color: "#000" }}>
        {text}
      </div>
    ),
  },
  {
    title: <span style={tableTheme}>EMAIL</span>,
    dataIndex: "email",
    key: "email",
    render: (text) => <div style={tableTheme}>{text}</div>,
  },
  {
    title: <span style={tableTheme}>ROLE</span>,
    dataIndex: "role",
    key: "role",
    render: (text) => <div style={tableTheme}>{text}</div>,
  },
  {
    title: <span style={tableTheme}>INDUSTRY</span>,
    dataIndex: "industry",
    key: "industry",
    render: (text) => <div style={tableTheme}>{text}</div>,
  },
  {
    title: <span style={tableTheme}>COMPANY</span>,
    dataIndex: "company",
    key: "company",
    render: (text) => <div style={tableTheme}>{text}</div>,
  },
  {
    title: <span style={tableTheme}>DESIGNATION</span>,
    dataIndex: "designation",
    key: "",
    render: (text) => <div style={tableTheme}>{text}</div>,
  },
];
const ProspectTable = () => {
  let { companyId } = useParams();
  const prospectList = useAtomValue(prospectStore);
  const campaignGuidlines = useAtomValue(campaignGuidlineStore);
  const [campaignIdState, setCampaignId] = useAtom(campaignId);
  const [isLoading, setIsLoading] = useState(false);
  const setTabValue = useSetAtom(tabValueStore);
  const [apiCheck, contextHolder] = notification.useNotification();


  const openNotificationWithIcon = (type) => {
    apiCheck[type]({
      message: "Emails would be send to your personal email id !!",
      duration: 1,
    });
  };


  const [slectedProspects, setSelectedProspects] = useState([]);

  const rowSelection = {
    type: "checkbox",

    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProspects(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.email === "kwoolley@claritybenefitsolutions.com",
      // disable checkbox for user with name 'Disabled User'
      email: record.email, // use title for checkbox name
    }),
  };

  const handleProspectSelection = async () => {
    setIsLoading(true);
    if (!campaignIdState) {
      const prospectIds = slectedProspects.map(
        (prospect) => prospect.prospectId
      );
      const apiUrl = "prospects/createEmails";
      const apiRes = await api.post(apiUrl, {
        prospectIds,
        companyId,
        campaignGuidlines,
      });
      const { data } = apiRes;
      setCampaignId(data.campaignId);
    }
    setIsLoading(false);
    openNotificationWithIcon("success");
   // setTabValue("preview&export");
  };
  return (
    <>
      <Table
        style={{ paddingLeft: 1 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={prospectList}
      />
        {contextHolder}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button 
        sx={{marginLeft: "1.6rem"}}

        variant="button1" onClick={handleProspectSelection}
        startIcon={<IconPlus size={19} />}
        >
           Create for {slectedProspects.length} {" "}
          Prospects
        </Button>
      )}
    </>
  );
};

export default ProspectTable;
