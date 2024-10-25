import { useEffect, useState } from "react";
import api from "@utils/api";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Styles from "./Campaigns.module.css";
import Loader from "@components/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useAtom, useSetAtom } from "jotai";
import { contentCalendar, selectedCampaignDate } from "@store/CalendarStore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Empty } from "antd";
import { selectedCampaign } from "@store/CalendarStore";

const campaignTheme = {
  cursor: "pointer",
};

const calendarStyle = {
  color: "#F787BB",

  display: "flex",
  alignItems: "center",
};

const Campaign = () => {
  let { companyId } = useParams();
  const queryClient = useQueryClient();

  const [selectedDate, setSelectedDate] = useAtom(selectedCampaignDate);
  const setContentCalendar = useSetAtom(contentCalendar);
  const [selectedCampaignData, setSelectedCampaignData] = useAtom(
    selectedCampaign
  );
  const [openSections, setOpenSections] = useState({
    upcoming: false,
    ongoing: true,
    finished: false,
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allCampaigns"],
    queryFn: () => api.get(`calendar/${companyId}/getAllCalendar`),
  });

  const CampaignData = data?.data;

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  const handleDelete = async (calendarId) => {
    try {
      const apiUrl = `calendar/${companyId}/deleteCalendarInput`;
      await api.delete(apiUrl, {
        params: { calendarId },
      });
      queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
    } catch (error) {
      console.log("DELETE NOT CALLED", error);
    }
  };

  const formatDate = (dateString) => dayjs(dateString).format("D MMM YYYY");

  const handleCampaignToggle = (name) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleDateClick = (id, title, startDate, endDate) => {
    setSelectedDate({ id, title, startDate, endDate });
    queryClient.invalidateQueries("contentCalendar");
  };

  const handleCampaignView = async (calendarId) => {
    const apiUrl = `calendar/${companyId}/getCalendarInput`;
    await api.get(apiUrl, { params: { calendarId } });
    // Handle view details here
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

  const categorizeCampaigns = () => {
    const today = dayjs();
    const ongoing = [];
    const upcoming = [];
    const finished = [];

    CampaignData?.forEach((campaign) => {
      // Extracting startDate and endDate from the campaign's content
      const content = campaign?.content;
      if (content && content.length > 0) {
        const startDate = dayjs(content[0]?.date); // First content date as startDate
        const endDate = dayjs(content[content.length - 1]?.date); // Last content date as endDate

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

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { upcoming, ongoing, finished } = categorizeCampaigns(
    CampaignData || []
  );

  const renderCampaigns = (campaigns) => (
    <>
      {campaigns.length === 0 ? (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderBottom={"1px solid #d9d9d9"}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Grid>
      ) : (
        campaigns.map((val, index) => (
          <Grid key={index} container px={4} pb={2}>
            <Grid item xs={11} bgcolor={"transparent"}>
              <Typography
                sx={{
                  color:
                    selectedDate && val.id !== selectedDate.id
                      ? "#3B3BB6"
                      : "#000",
                }}
                className={Styles.campaign_content_head}
              >
                {val?.Name}
                Campaign for Brand Awareness
              </Typography>
              <Typography className={Styles.campaign_content_date}>
                {formatDate(val?.startDate)} - {formatDate(val?.endDate)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              bgcolor={"transparent"}
            >
              <IconButton
                edge="end"
                aria-label="go"
                onClick={() => handleCampaignView(val.id)}
              >
                {/* <ArrowForwardIosIcon color="#000" style={{ fontSize: "1.1rem" }} /> */}
              </IconButton>
            </Grid>
          </Grid>
        ))
      )}
    </>
  );

  return (
    <Grid container pt={2} sx={{ maxHeight: "90vh" }}>
      <Grid
        item
        xs={12}
        sx={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
      >
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={2}
        >
          <Typography variant="MainHeading">Campaigns</Typography>
          <span style={calendarStyle}>
            <Typography variant="MainHeading" style={{ color: "#F787BB" }}>
              {CampaignData?.length}
            </Typography>
            <AppsOutlinedIcon sx={{ fontSize: "2rem", marginLeft: "0.3rem" }} />
          </span>
        </Grid>
        <Grid item xs={12} px={2} mb={1}>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Create impactful, targeted campaigns in minutes with AI assistance.
            <br />
            You have created {CampaignData?.length} campaign
            {CampaignData?.length > 1 ? "s" : ""} so far.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ overflowY: "auto", maxHeight: "calc(90vh - 150px)" }}
      >
        {/* Upcoming Section */}
        <Grid
          container
          p={2}
          alignItems={"center"}
          height={60}
          sx={{
            ...(openSections.upcoming && {
              borderBottom: "1px solid #d9d9d9",
              mb: 1,
            }),
          }}
        >
          {openSections.upcoming ? (
            <IconChevronDown
              size={"1.5rem"}
              onClick={() => handleCampaignToggle("upcoming")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.5rem"}
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

          <Typography
            className={Styles.campaign_heading}
            style={{ marginLeft: "auto" }}
          >
            {upcoming.length > 0 ? <> {upcoming.length}</> : "0"}
          </Typography>
        </Grid>
        {openSections.upcoming ? (
          ongoing.length > 0 ? (
            renderCampaigns(upcoming)
          ) : (
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}
        {/* Ongoing Section */}
        <Grid
          container
          p={2}
          alignItems={"center"}
          height={60}
          sx={{
            borderTop: "1px solid #d9d9d9",
            ...(openSections.ongoing
              ? { borderBottom: "1px solid #d9d9d9", mb: 1 }
              : {}),
          }}
        >
          {openSections.ongoing ? (
            <IconChevronDown
              size={"1.5rem"}
              onClick={() => handleCampaignToggle("ongoing")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.5rem"}
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
          <Typography
            className={Styles.campaign_heading}
            style={{ marginLeft: "auto" }}
          >
            {ongoing.length > 0 ? <> {ongoing.length}</> : "0"}
          </Typography>
        </Grid>
        {openSections.ongoing ? (
          ongoing.length > 0 ? (
            renderCampaigns(ongoing)
          ) : (
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}
        {/* Finished Section */}
        <Grid
          container
          p={2}
          height={60}
          sx={{
            borderTop: "1px solid #d9d9d9",
            borderBottom: "1px solid #d9d9d9",
            mb: 1,
          }}
        >
          {openSections.finished ? (
            <IconChevronDown
              size={"1.5rem"}
              onClick={() => handleCampaignToggle("finished")}
              style={campaignTheme}
            />
          ) : (
            <IconChevronRight
              size={"1.5rem"}
              onClick={() => handleCampaignToggle("finished")}
              style={campaignTheme}
            />
          )}
          <Typography
            onClick={() => handleCampaignToggle("finished")}
            className={Styles.campaign_heading}
          >
            &nbsp;&nbsp;Previous
          </Typography>
          <Typography
            className={Styles.campaign_heading}
            style={{ marginLeft: "auto" }}
          >
            {finished.length > 0 ? <> {finished.length}</> : "0"}
          </Typography>
        </Grid>
        {openSections.finished ? (
          finished.length > 0 ? (
            <Grid container mb={2} borderBottom={"1px solid #d9d9d9"}>
              {renderCampaigns(finished)}
            </Grid>
          ) : (
            <Grid
              container
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              borderBottom={"1px solid #d9d9d9"}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Grid>
          )
        ) : null}{" "}
      </Grid>
    </Grid>
  );
};

export default Campaign;
