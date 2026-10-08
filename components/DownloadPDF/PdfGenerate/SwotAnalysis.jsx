import { Divider, Typography, Space, Row, Col } from "antd";

import TableContent from "../TableContent";

const { Title, Text } = Typography;

const SwotAnalysis = ({ tableData }) => {
  return (
    <>
      <Title style={{ color: "#3B3BB3", padding: "10px 30px" }} level={2}>
        SWOT Analysis
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
          backgroundColor: "#9394B4",
          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Strengths
      </Title>
      <Row style={{ padding: "10px 30px", backgroundColor: "#e8e8f2" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space orientation="vertical" size={20}>
              {item.columnData.StrengthsFields.map((columnItem, index) => (
                <TableContent
                  key={index}
                  item={columnItem}
                  titleColor="#13ccff"
                />
              ))}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          backgroundColor: "#F7D08F",
          color: "black",
          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Weakness
      </Title>
      <Row style={{ padding: "10px 30px", backgroundColor: "#f2efe9" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space orientation="vertical" size={20}>
              {item.columnData.WeaknessFields.map((columnItem, index) => (
                <TableContent
                  key={index}
                  item={columnItem}
                  titleColor="#e8ae63"
                />
              ))}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          backgroundColor: "#CEE49C",
          color: "black",
          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Opportunities
      </Title>
      <Row style={{ padding: "10px 30px", backgroundColor: "#e0e3da" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space orientation="vertical" size={20}>
              {item.columnData.OpportunitiesFields.map((columnItem, index) => (
                <TableContent
                  key={index}
                  item={columnItem}
                  titleColor="#8cbf13"
                />
              ))}
            </Space>
          </Col>
        ))}
      </Row>

      <Title
        style={{
          backgroundColor: "#E9ACCA",
          padding: "10px 30px",
          margin: 0,
        }}
        level={2}
      >
        Threats
      </Title>
      <Row style={{ padding: "10px 30px", backgroundColor: "#f2e9ed" }}>
        {tableData.map((item, index) => (
          <Col span={6} key={index}>
            <Space orientation="vertical" size={20}>
              {item.columnData.ThreatsFields.map((columnItem, index) => (
                <TableContent
                  key={index}
                  item={columnItem}
                  titleColor="#e73a88"
                />
              ))}
            </Space>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SwotAnalysis;
