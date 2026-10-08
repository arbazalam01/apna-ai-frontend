import React from "react";
import { Space, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const TableContent = ({
  item,
  titleColor = "#15BCEC",
  textColor = "black",
  isBlur = false,
  headingSize='1rem',
  textSize='1rem'
}) => {
  return (
    <Space orientation="vertical" size={1}>
      {item && typeof item === "string" ? (
        <Text style={{ color: textColor  }} className={isBlur && "blurry-text"}>
          {item}
        </Text>
      ) : (
        <>
          {item?.name && (
            <Text
              style={{ color: titleColor, fontSize:headingSize }}
              className={isBlur && "blurry-text"}
            >
              {item?.name}
            </Text>
          )}
          <Text
            style={{ color: textColor,  fontSize:textSize }}
            className={isBlur && "blurry-text"}
          >
            {item?.description}
          </Text>
        </>
      )}
    </Space>
  );
};

export default TableContent;
