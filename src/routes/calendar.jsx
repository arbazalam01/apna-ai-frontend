import { Calendar, Layout, Skeleton } from "antd";
import { Grid, Divider, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateCalendarNew from "@components/Calendar/CreateCalendar/CreateCalendarNew";
import { useEffect, useState } from "react";
import ContentCalendar from "@components/Calendar/Contentcalendar/ContentCalendar.jsx";

import SummaryModal from "@components/Calendar/CalendarSummary/CalendarSummary";
import { useAtom, useSetAtom } from "jotai";
import { contentCalendar } from "@store/CalendarStore";
import dayjs from "dayjs";
import Campaigns from "@components/Campaigns/Campaigns";
import api from "@utils/api";

import close from "/Icons/Misc/Close.svg";

import {
  calendarContentId,
  
  selectedCampaign,
  
  selectedCampaignDate,
} from "@store/CalendarStore";
import { getOverflowOptions } from "antd/es/_util/placements";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const campaignTheme = {
  fontSize: "1.3rem",
  fontWeight: "500",
};

const nonSelectCampaign = {
  marginTop: "4rem",
  fontSize: "1.1rem",
  fontWeight: "200",
  color: "#afaeae",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "0.4rem",
  padding: "4rem 0rem",
};
const CalendarPage = () => {
  const [calendarContent, setContentCalendar] = useAtom(contentCalendar);
  const setSelectedDate = useAtom(selectedCampaignDate);
  const selectedCampaignData = useAtom(selectedCampaign);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const setSelectedCalendarDateId = useSetAtom(calendarContentId);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  const [summaryData, setSummaryData] = useState({});

  let { companyId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allCampaignsList"],
    queryFn: () => {
      const apiUrl = `calendar/${companyId}/getAllCalendar`;
      return api.get(apiUrl);
    },
  });

  const CalendarData = data?.data;
  console.log("CalendarDatasss", CalendarData);

  const currCalendarData = CalendarData?.find((val) => {
    return (
      setSelectedDate[0]?.startDate >= val?.startDate &&
      setSelectedDate[0]?.endDate <= val?.endDate &&
      setSelectedDate[0]?.id == val?.id
    );
  });


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenSummary = async (calendarId) => {
    const apiUrl = `calendar/getSummaryData`;
    try {
      const summaryRes = await api.get(apiUrl, {
        params: { calendarId },
      });
      setSummaryData(summaryRes?.data || []);
    } catch (error) {
      console.error("Failed to fetch summary data:", error);
    }
    setSummaryOpen(true);
  };

  const handleCloseSummary = () => {
    setSummaryOpen(false);
  };
  console.log("summaryData", summaryData);

  useEffect(() => {
    const formattedCurrentDate = currentDate.format("DD MMMM, YYYY"); // Format the date
    setContentCalendar(formattedCurrentDate); // Update contentCalendar state with selected date
  }, [currentDate]);

  return (
    <>
      <Grid container>
        <Grid
          sx={{
            height: "auto",
            overflow: "auto"
          }}
          size={3.1}>
          <Grid
            sx={{
              height: "91vh",
              borderRight: "1px solid #d9d9d9"
            }}>
            <Campaigns
              setCurrentDate={setCurrentDate}
              handleOpenSummary={handleOpenSummary}
              handleCloseSummary={handleCloseSummary}
            />
          </Grid>
          {/* <PersonaTable data={tableData} onRowClick={handleRowClick} /> */}
        </Grid>
        <Grid size={8.9}>
          <Grid container sx={{ borderBottom: "1px solid #d9d9d9" }}>
            <Grid
              // p={2}
              container
              sx={{
                pl: 2,
                alignItems: "center",
                textAlign: "center"
              }}
              size={9}>
               {CalendarData && CalendarData.length > 0 ? (
                        <Typography sx={campaignTheme}>
                        Campaign for Brand Awareness
                      </Typography>
                  ) : (
                    <></>
                  )}
    
             
          
            </Grid>
            <Grid
              sx={{
                alignItems: "center",
                textAlign: "right",
                height: 70,
                display: "flex",
                justifyContent: "flex-end"
              }}
              size={3}>
              {isSummaryOpen == true ? (
                <Button
                  variant="button2"
                  sx={{ mr: "3.2rem", padding: "0.5rem" }}
                  onClick={handleCloseSummary}
                >
                  <img
                    src={close}
                    style={{ height: "12px" }}
                    alt="close summary"
                  />
                </Button>
              ) : (
                <>
                  {CalendarData && CalendarData.length > 100 ? (
                    <Button
                      variant="button2"
                      sx={{ mr: "3.2rem", padding: "0.5rem" }}
                      onClick={() => handleOpenSummary(selectedCampaignData.campaignId)}
                    >
                      Open Summary
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          {isSummaryOpen == false ? (
            <Grid container>
              {/* <Grid
                item
                xs={7.2}
                height={"82vh"}
                sx={{ borderRight: "1px solid #d9d9d9" }}
              >
                <CalendarComponent
                  handlePrevMonth={handlePrevMonth}
                  handleNextMonth={handleNextMonth}
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                />
              </Grid>*/}
              <Grid
                sx={{
                  maxHeight: "82vh",
                  overflow: "auto"
                }}
                size={12}>
                <ContentCalendar
                  // handlePrevMonth={handlePrevMonth}
                  // handleNextMonth={handleNextMonth}
                />
              </Grid> 
            </Grid>
          ) : (
            <SummaryModal
              handleCloseSummary={handleCloseSummary}
              summaryData={summaryData}
            />
          )}
        </Grid>
      </Grid>{" "}
      {/* </Layout> */}
    </>
  );
};
export default CalendarPage;
