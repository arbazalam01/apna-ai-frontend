import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y",
  aspectRatio: 23,
  barPercentage: 12,
  responsive: true,
  borderSkipped: false,
  scales: {
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },
  },
};

const labels = [""];

const HorizontalBar = ({ data, thoughtLeadership, keywordDriven, instructional, companyUpdate, other }) => {
  console.log("datadatadata", data);

  // const thoughtLeadership = data?.filter((val) => {
  //   return val?.blogtype?.toUpperCase() === "THOUGHT LEADERSHIP";
  // });
  // console.log("thoughtLeadership", thoughtLeadership);

  // const keywordDriven = data?.filter((val) => {
  //   return val?.blogtype.toUpperCase() === "KEYWORD DRIVEN";
  // });
  // console.log("keywordDriven", keywordDriven);

  // const instructional = data?.filter((val) => {
  //   return val?.blogtype.toUpperCase() === "INSTRUCTIONAL";
  // });
  // console.log("Instructional", instructional);

  // const companyUpdate = data?.filter((val) => {
  //   return val?.blogtype.toUpperCase() === "COMPANY UPDATE";
  // });
  // console.log("companyUpdate", companyUpdate);

  // const other = data?.filter((val) => {
  //   return (
  //     val?.blogtype.toUpperCase() !== "THOUGHT LEADERSHIP" &&
  //     val?.blogtype.toUpperCase() !== "KEYWORD DRIVEN" &&
  //     val?.blogtype.toUpperCase() !== "INSTRUCTIONAL" &&
  //     val?.blogtype.toUpperCase() !== "COMPANY UPDATE"
  //   );
  // });

  const barData = [
    {
      title: "Thought Leadership",
      percentage: (thoughtLeadership?.length / data?.length) * 100,
    },
    {
      title: "Keyword Driven",
      percentage: (keywordDriven?.length / data?.length) * 100,
    },
    {
      title: "Instructional",
      percentage: (instructional?.length / data?.length) * 100,
    },
    {
      title: "Company update",
      percentage: (companyUpdate?.length / data?.length) * 100,
    },
    {
      title: "Other",
      percentage: (other?.length / data?.length) * 100,
    },
  ];

  const totalDatasets = barData?.map((item) => {
    let bgColor = "#3B3BB6";
    if (item.title === "Thought Leadership") bgColor = "#B5EEFF";
    else if (item.title === "Keyword Driven") bgColor = "#CCE896";
    else if (item.title === "Instructional") bgColor = "#FFD188";
    else if (item.title === "Company update") bgColor = "#F7ACCE";
    else if (item.title === "Other") bgColor = "#A595FF";

    return {
      label: item.title,
      data: [item.percentage],
      backgroundColor: bgColor,
    };
  });

  const chartData = {
    labels,
    datasets: totalDatasets,
  };

  return <Bar options={options} data={chartData} height={10} />;
};

export default HorizontalBar;
