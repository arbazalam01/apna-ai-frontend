import { ConfigProvider, Steps } from "antd";
import React from "react";




const dataCSS = {
    title: {
      fontSize: '0.9rem',
    },
    description: {
      fontSize: '0.75rem',
    },
  };
const ProductAwarenessStepper = ({quesnumber}) => {
  const data = [
    {
      title: "Duration",
      description: "",
    },
    {
      title: "Content Formats",
      description: "",
    },
    {
      title: "Target Product",
      description: "",
    },
    {
      title: "Target Personas",
      description:
        "",
    },
    {
      title: "Industry Themes",
      description: "",
    },
    {
      title: "Review",
},
      {
        title: "AI Campaign Creation",

      }
  ];
 
  return (
    <ConfigProvider
      theme={{
        components: {
          Steps: {
            colorPrimary: "#3B3BB6",

dotCurrentSize:12
          },
        },
      }}
    >
      <Steps progressDot current={quesnumber} orientation="vertical" items={data.map((item) => ({
          title: <div style={dataCSS.title}>{item.title}</div>,
          description: <div style={dataCSS.description}>{item.description}</div>,
        }))}
 />
    </ConfigProvider>
  );
};

export default ProductAwarenessStepper;
