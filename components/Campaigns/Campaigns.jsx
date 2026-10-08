import { useEffect, useState } from "react";
import api from "@utils/api";
import { Divider, Grid, Typography } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Styles from "./Campaigns.module.css";
import Loader from "@components/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";
import {
  calendarContentId,
  contentCalendar,
  selectedCampaignDate,
  selectedCampaign,
} from "../../store/CalendarStore";
import CampaignActions from "./CampaignActions";
import { Empty } from "antd";

const campaignTheme = {
  cursor: "pointer",
};

const Campaigns = ({
  setCurrentDate,
  handleOpenSummary,
  handleCloseSummary,
}) => {
  let { companyId } = useParams();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useAtom(selectedCampaignDate);
  const [selectedCampaignData, setSelectedCampaignData] = useAtom(selectedCampaign);
  const setContentCalendar = useSetAtom(contentCalendar);
  const [openOngoing, setOpenOngoing] = useState({
    upcoming: false,
    ongoing: false,
    finished: false,
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const setSelectedCalendarDateId = useSetAtom(calendarContentId);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allCampaigns"],
    queryFn: () => {
      const apiUrl = `calendar/${companyId}/getAllCalendar`;
      return api.get(apiUrl);
    },
  });
  console.log(data, "data");
  console.log(error, "error");
  
  const CampaignData = data?.data || [];
  console.log(CampaignData, "CampaignData");
  
  useEffect(() => {
    if (CampaignData && CampaignData.length > 0 && !selectedDate) {
      const { CampaignId, startDate, endDate } = CampaignData[0];
      setSelectedCampaignData(CampaignData[0]);
      setSelectedDate({ CampaignId, startDate, endDate });
      queryClient.invalidateQueries("contentCalendar");
      setCurrentDate(dayjs(startDate));
    }
  }, [CampaignData, selectedDate, setSelectedDate, setCurrentDate]);
  
  const formatDate = (dateString) => dayjs(dateString).format("D MMM YYYY");
  
  const categorizeCampaigns = () => {
    const today = dayjs();
    const ongoing = [];
    const upcoming = [];
    const finished = [];
  
    CampaignData?.forEach((campaign) => {
      // Extracting startDate and endDate from the campaign's content
      const content = campaign?.content;
      if (content && content.length > 0) {
        const startDate = dayjs(content[0]?.date);  // First content date as startDate
        const endDate = dayjs(content[content.length - 1]?.date);  // Last content date as endDate
  
        if (startDate.isAfter(today)) {
          upcoming.push({ ...campaign, startDate, endDate });
        } else if (endDate.isBefore(today)) {
          finished.push({ ...campaign, startDate, endDate });
        } else {
          ongoing.push({ ...campaign, startDate, endDate });
        }
      }
    });
  
    return { ongoing, upcoming, finished };
  };
  

  const { ongoing, upcoming, finished } = categorizeCampaigns();

  const currCalendarData = CampaignData?.find((val) => {
    return (
      setSelectedDate[0]?.startDate >= val?.startDate &&
      setSelectedDate[0]?.endDate <= val?.endDate &&
      setSelectedDate[0]?.id == val?.id
    );
  });

  const handleCalendarChange = (value) => {
    const selectedCampaign = currCalendarData?.gptoutput.find((campaign) => {
      const currDateSimpleVal = dayjs(campaign?.Date).format("DD/MM/YYYY");
      return currDateSimpleVal === value.format("DD/MM/YYYY");
    });
    if (selectedCampaign) {
      setSelectedCalendarDateId(selectedCampaign);
    } else {
      setSelectedCalendarDateId(null);
    }
  };

  useEffect(() => {
    setOpenOngoing({
      upcoming: upcoming.length > 0,
      ongoing: ongoing.length > 0,
      finished: finished.length > 0,
    });
  }, [upcoming.length, ongoing.length, finished.length]);

  const handleCampaignToggle = (name) => {
    setOpenOngoing((prev) => ({ ...prev, [name]: !prev[name] }));
  };

 

  const handleCampaignSelected=(data)=>{
    setSelectedCampaignData(data);
  }

  console.log("SEEMAB selectedCampaignData", selectedCampaignData);

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handleCampaignView = async (calendarId) => {
    handleOpenSummary();
    const apiUrl = `calendar/${companyId}/getCalendarInput`;
    const apiRes = await api.get(apiUrl, { params: { calendarId } });
    // setViewDetails(apiRes?.data);
  };
 
  const handleDownloadCampaign = async (calendarId) => {
    try {
      const apiUrl = `calendar/downloadCalendar?calendarId=${calendarId}`;
      const apiRes = await api.get(apiUrl);
      const blob = new Blob([apiRes.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const elem = document.createElement("a");
      elem.href = url;
      elem.download = "Calendar.csv";
      elem.click();
    } catch (error) {
      console.log("error", error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (calendarId) => {
    try {
      const apiUrl = `calendar/${companyId}/deleteCalendarInput`;
      const apiRes = await api.delete(apiUrl, {
        params: { calendarId },
      });
      queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
      return apiRes;
    } catch (error) {
      console.log("DELETE NOT CALLED", error);
    }
  };

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return <Empty style={{margin: "0px", paddingTop: "7rem"}} image={Empty.PRESENTED_IMAGE_SIMPLE} description="Create your first campaign" />;
  }

  const renderCampaigns = (campaigns) =>
    campaigns.map((val, index) => (
      <Grid
        key={index}
        container
        className={Styles.campaign_container}
        onClick={() =>
          handleCampaignSelected(val)
        }
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        sx={{
          p: "1rem"
        }}
      >
        <Grid
          sx={{
            bgcolor: "transparent"
          }}
          size={11}>
          <Typography
            sx={{
              color:
              selectedCampaignData && val.CampaignId === selectedCampaignData.CampaignId
                  ? "#3B3BB6"
                  : "#000",
            }}
            className={Styles.campaign_content_head}
          >
            Campaign for Brand Awareness
           
          </Typography>
          <Typography className={Styles.campaign_content_date}>
            {formatDate(val?.startDate)} - {formatDate(val?.endDate)}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "transparent"
          }}
          size={1}>
          {hoveredIndex === index && (
            <CampaignActions
              handleCampaignView={handleCampaignView}
              handleDownloadCampaign={handleDownloadCampaign}
              handleDelete={handleDelete}
              calendarId={val?.CampaignId}
              handleOpenSummary={handleOpenSummary}
            />
          )}
        </Grid>
      </Grid>
    ));
  

  return (
    <>
      <Grid
        container
        sx={{ overflowY: "auto", maxHeight: "calc(100vh - 90px)" }}
      >
        <Grid
          container
          sx={{
            pl: 2,
            alignItems: "center",
            height: 70,
            borderBottom: "1px solid #d9d9d9"
          }}>
          {openOngoing.upcoming ? (
            <IconChevronDown
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("upcoming")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("upcoming")}
              style={campaignTheme}
            />
          )}
          <Typography
            onClick={() => handleCampaignToggle("upcoming")}
            className={Styles.campaign_heading}
          >
            &nbsp;&nbsp;Upcoming
          </Typography>
        </Grid>
        {openOngoing.upcoming ? (
          upcoming.length > 0 ? (
            renderCampaigns(upcoming)
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}

        <Grid
          container
          sx={{
            pl: 2,
            alignItems: "center",
            height: 70,
            borderBottom: "1px solid #d9d9d9"
          }}>
          {openOngoing.ongoing ? (
            <IconChevronDown
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("ongoing")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("ongoing")}
              style={campaignTheme}
            />
          )}
          <Typography
            onClick={() => handleCampaignToggle("ongoing")}
            className={Styles.campaign_heading}
          >
            &nbsp;&nbsp;Ongoing
          </Typography>
        </Grid>
        {openOngoing.ongoing ? (
          ongoing.length > 0 ? (
            renderCampaigns(ongoing)
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}

        <Grid
          container
          sx={{
            p: 2,
            height: 70,
            borderBottom: "1px solid #d9d9d9"
          }}>
          {openOngoing.finished ? (
            <IconChevronDown
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("finished")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.7rem"}
              onClick={() => handleCampaignToggle("finished")}
              style={campaignTheme}
            />
          )}
          <Typography
            onClick={() => handleCampaignToggle("finished")}
            className={Styles.campaign_heading}
          >
            &nbsp;&nbsp;Finished
          </Typography>
        </Grid>
        {openOngoing.finished ? (
          finished.length > 0 ? (
            renderCampaigns(finished)
          ) : (
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}
      </Grid>
    </>
  );
};

export default Campaigns;
