import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";
import { Typography } from "antd";

const { Title } = Typography;

const Index = ({ company, competitors }) => {
  const competitorStrengths = competitors.map(
    (competitor) => competitor?.strengths
  );
  const competitorThreats = competitors.map(
    (competitor) => competitor?.threats
  );
  const competitorWeakness = competitors.map(
    (competitor) => competitor?.weaknesses
  );
  const competitorOpportunities = competitors.map(
    (competitor) => competitor?.opportunities
  );

  return (
    <Box>
      <TitleBox title="Strengths" bgColor="#9394B4" />
      <Item
        company={company?.strengths}
        competitors={competitorStrengths}
        bgColor="#e8e8f2"
      />

      <TitleBox title="Weakness" bgColor="#F7D08F" />
      <Item company={company?.weaknesses} competitors={competitorWeakness} />

      <TitleBox title="Opportunities" bgColor="#CEE49C" />
      <Item
        company={company?.opportunities}
        competitors={competitorOpportunities}
      />

      <TitleBox title="Threats" bgColor="#E9ACCA" />
      <Item company={company?.threats} competitors={competitorThreats} />
    </Box>
  );
};

export default Index;

const Item = ({ company, competitors, bgColor }) => {
  return (
    <Box sx={{
      bgcolor: bgColor
    }}>
      <Box sx={{
        mx: 4
      }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            {company?.map((item, index) => (
              <Box sx={{
                my: 4
              }}>
                <TableContent key={index} item={item} 
                // isBlur={index > 1}
                 />
              </Box>
            ))}
          </Grid>
          {competitors?.map((competitor, index) => (
            <Grid key={index} size={4}>
              {competitor?.map((item, index) => (
                <Box sx={{
                  my: 4
                }}>
                  <TableContent key={index} item={item} 
                  // isBlur={index > 1}
                   />
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const TitleBox = ({ title, bgColor }) => {
  return (
    <Box sx={{
      bgcolor: bgColor
    }}>
      <Box
        sx={{
          mx: 4,
          py: 3
        }}>
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
      </Box>
    </Box>
  );
};
