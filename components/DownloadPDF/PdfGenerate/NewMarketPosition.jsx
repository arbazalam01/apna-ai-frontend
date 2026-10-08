import { Box, Grid } from "@mui/material";
import React from "react";
import TableContent from "../TableContent";
import { Typography } from "antd";

const { Title } = Typography;

const Index = ({ company, competitors }) => {
  const competitorCorePurpose = competitors.map(
    (competitor) => competitor?.corepurpose
  );
  const competitorPositioning = competitors.map(
    (competitor) => competitor?.positioning
  );
  const competitorKeyDifferentiators = competitors.map(
    (competitor) => competitor?.keydifferentiators
  );
  const competitorBrandPersonality = competitors.map(
    (competitor) => competitor?.brandpersonality
  );

  return (
    <div>
      <Title level={3}>Core Purpose</Title>
      <Item
        company={company?.corepurpose}
        competitors={competitorCorePurpose}
      />
      <Title level={3}>Positioning</Title>
      <Item
        company={company?.positioning}
        competitors={competitorPositioning}
      />
      <Title level={3}>Key Differentiators</Title>
      <Item
        company={company?.keydifferentiators}
        competitors={competitorKeyDifferentiators}
      />
      <Title level={3}>Brand Personality</Title>
      <Item
        company={company?.brandpersonality}
        competitors={competitorBrandPersonality}
      />
    </div>
  );
};

export default Index;

const Item = ({ company, competitors }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        {company?.map((item, index) => (
          <Box sx={{
            my: 4
          }}>
            <TableContent key={index} item={item}
            //  isBlur={index > 1}
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
  );
};
