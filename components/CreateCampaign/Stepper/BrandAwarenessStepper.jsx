import { ConfigProvider, Steps } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const dataCSS = {
  title: {
    fontSize: "0.9rem",
  },
  description: {
    fontSize: "0.75rem",
  },
};

const BrandAwarenessStepper = ({ quesnumber, customCampaign }) => {
  const { getValues } = useFormContext();

  const [data, setData] = useState([
    { title: "Duration", description: "" },
    { title: "Target Industries", description: "" },
    { title: "Content Themes", description: "" },
    { title: "Content Formats", description: "" },
    { title: "Content Mix", description: "" },
    { title: "AI Campaign Creation", description: "" },
  ]);

  useEffect(() => {
    const values = getValues([
      "startDate",
      "endDate",
      "industryThemes",
      "selectedThemes",
      "content_format",
      "content_mix",
    ]);

    const formattedStartDate = values[0] ? dayjs(values[0]).format("D MMM YYYY") : "";
    const formattedEndDate = values[1] ? dayjs(values[1]).format("D MMM YYYY") : "";
    const duration = `${formattedStartDate}  ${formattedEndDate}`;
    const contentMixDescription = values[4]
    ? values[4]
        .map((content, index) => {
          const contentItems = Object.keys(content)
            .map((key) => `${key}: ${content[key]}`)
            .join(", ");
          return `Mix ${index + 1}: ${contentItems}`;
        })
        .join("; ") // Joining multiple sections with a semicolon
    : "";

    const updatedData = [
      {
        title: "Duration",
        description: duration,
      },
      {
        title: "Target Industries",
        description: values[2]
        ? values[2].join(", ") // Handles the array of strings ["Fintech", "EdTech"]
        : "",
      },
      {
        title: "Content Themes",
        description: values[3]
          ?  values[3].join(", ") // Handles the array of strings ["Fintech", "EdTech"]
          : "",
      },
      {
        title: "Content Formats",
        description: values[4] ? values[4].join(", ") // Handles the array of strings ["Fintech", "EdTech"]
        : "",
    },
      {
        title: "Content Mix",
        description: "",
      },
      {
        title: "AI Campaign Creation",
        description: "",
      },
    ];

    setData(updatedData);
  }, [quesnumber, customCampaign, getValues]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Steps: {
            colorPrimary: "#3B3BB6",
            dotCurrentSize: 12,
          },
        },
      }}
    >
      <Steps
        progressDot
        current={quesnumber}
        direction="vertical"
        items={data.map((item) => ({
          title: <div style={dataCSS.title}>{item?.title}</div>,
          description: <div style={dataCSS.description}>{item?.description}</div>,
        }))}
      />
    </ConfigProvider>
  );
};

export default BrandAwarenessStepper;
