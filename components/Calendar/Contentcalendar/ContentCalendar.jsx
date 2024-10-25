import React, { useRef } from "react";
import { Anchor, Col, ConfigProvider, Row } from "antd";
import SideComponent from "./SideComponent";
import { Grid, Typography } from "@mui/material";
import {
  calendarContentId,
  contentCalendar,
  selectedCampaignDate,
  selectedCampaign,
} from "@store/CalendarStore";
import { useAtom } from "jotai";

// Dynamic generation of items based on content dates
const App = () => {
  const scrollContainerRef = useRef(null);

  const [selectedCampaignData, setSelectedCampaignData] = useAtom(
    selectedCampaign
  );

  const content = [
    {
      date: "Friday, 1 March 2024",
      platforms: [
        {
          platform: "Instagram Post",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
        {
          platform: "Blog Post",
          Title:
            "Blog title lorem ipsum dolor sit amet, consectetur adipiscing elit vestibulum mattis",
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely apaper-based to electronic health records (EHR) is trend but a necessity. For large hospitals,",
        },
        {
          platform: "LinkedIn",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.is not merely apaper-based to electronic health records (EHR) is trend but a necessity.",
        },
        {
          platform: "Blog Post",
          Title:
            "Blog title lorem ipsum dolor sit amet, consectetur adipiscing elit vestibulum mattis",
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
      ],
    },
    {
      date: "Sunday, 2 March 2024",
      platforms: [
        {
          platform: "Instagram Post",
          Title: null,
          Theme:
            "In the fast-paced paper-based to electronic health records (EHR) is world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
      ],
    },
    {
      date: "Tuesday, 4 March 2024",
      platforms: [
        {
          platform: "Instagram Post",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
        {
          platform: "Blog Post",
          Title:
            "Blog title lorem ipsum dolor sit amet, consectetur adipiscing elit vestibulum mattis",
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity. For large hospitals,",
        },
        {
          platform: "LinkedIn",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) ispaper-based to electronic health records (EHR) is not merely a trend but a necessity.is not merely apaper-based to electronic health records (EHR) is trend but a necessity.",
        },
      ],
    },
    {
      date: "Sunday, 3 April 2024",
      platforms: [
        {
          platform: "Instagram Post",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
      ],
    },
    {
      date: "Wednesday, 7 April 2024",
      platforms: [
        {
          platform: "Instagram Post",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
        {
          platform: "Blog Post",
          Title:
            "Blog title lorem ipsum dolor sit amet, consectetur adipiscing elit vestibulum mattis",
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity. For large hospitals,",
        },
        {
          platform: "LinkedIn",
          Title: null,
          Theme:
            "In the fast-paced world of healthcare, the transition from paper-based to electronic health records (EHR) is not merely a trend but a necessity.",
        },
      ],
    },
  ];

  // Function to format date to only show "1 March"
  const formatDate = (dateString) => {
    const dateParts = dateString.split(" ");
    return `${dateParts[2].replace(",","")} ${dateParts[1]}`; // Returns "2October"
  };

  // Dynamically generate items based on formatted content dates
  const items = selectedCampaignData?.content?.map((entry, index) => ({
    key: `part-${index}`,
    href: `#part-${index}`,
    title: formatDate(entry.date), // Use formatted date for the title
  }));

  return (
    <Row>
      <Col span={4}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3B3BB6",
              fontFamily:"Figtree",
              fontSize: "0.9rem",
            },
          }}
        >
          <Anchor
            targetOffset={50} // Adjust this for any header offset if needed
            style={{ marginTop: "0.9rem" }}
            getContainer={() => scrollContainerRef.current} // Pointing to the scroll container
            items={items} // Dynamically generated items with formatted date

          />
        </ConfigProvider>
      </Col>
      <Col
        span={20}
        style={{
          maxHeight: "82vh",
          overflow: "auto",
          padding: "1rem 1rem 30rem 1rem",
        }}
        ref={scrollContainerRef} // Ref for the scrolling container
      >
        {selectedCampaignData?.content?.map((entry, index) => (
          <div id={`part-${index}`} key={index}>
            <Typography variant="campaignDate">{entry?.date}</Typography>{" "}
            {/* Display the full date as a header */}
            {entry?.platforms.map((platformData, platformIndex) => (
              <Grid mb={1.8} key={platformIndex}>
                <SideComponent selectedCalendarData={platformData} />
              </Grid>
            ))}
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default App;
