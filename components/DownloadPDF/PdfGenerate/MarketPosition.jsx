import { Divider, Typography, Space, Row, Col } from "antd";

import TableContent from "../TableContent";

const { Title, Text } = Typography;

const MarketPosition = ({ tableData }) => {
  return (
    <div style={{ backgroundColor: "#e8e8f2" }}>
      <Title style={{ color: "#3B3BB3", padding: "10px 30px" }} level={2}>
        Market Positioning
      </Title>

      {/* To show companies  */}

      <Row style={{ padding: "10px 30px" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Title level={3}>{item.title}</Title>
          </Col>
        ))}
      </Row>
      <Title
        style={{
          color: "#15BCEC",
          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Core Purpose
      </Title>
      <Row style={{ padding: "10px 30px" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space direction="vertical" size={20}>
              {item.columnData.CorePurposeFields.map((columnItem, index) => (
                <TableContent key={index} item={columnItem} />
              ))}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          color: "#15BCEC",

          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Positioning
      </Title>
      <Row style={{ padding: "10px 30px" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space direction="vertical" size={20}>
              {item.columnData.PositioningFields.map((columnItem, index) => (
                <TableContent key={index} item={columnItem} />
              ))}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          color: "#15BCEC",

          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Key Differentiator
      </Title>
      <Row style={{ padding: "10px 30px" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space direction="vertical" size={20}>
              {item.columnData.KeyDifferentiatorsFields.map(
                (columnItem, index) => (
                  <TableContent key={index} item={columnItem} />
                )
              )}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          color: "#15BCEC",

          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        SWOT Analysis
      </Title>
      <Row style={{ padding: "10px 30px" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space direction="vertical" size={20}>
              {item.columnData.SWOTAnalysisFields.map((columnItem, index) => (
                <TableContent key={index} item={columnItem} />
              ))}
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MarketPosition;
