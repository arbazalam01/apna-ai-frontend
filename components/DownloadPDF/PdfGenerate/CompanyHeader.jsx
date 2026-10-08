import { Box, Grid } from "@mui/material";
import { Typography } from "antd";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@utils/api";

const { Title, Text } = Typography;

const Index = ({ color = "white" }) => {
 
  const [headersData, setHeadersData] = useState(null);
  const { companyId } = useParams();

  const fetchData = async () => {

    const apiUrl = `customer/${companyId}/getcompetitors`;
    const apiRes = await api.get(apiUrl);
  
    setHeadersData(apiRes.data.data[0]);
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  if (!headersData) return <div>Loading...</div>;

  const { companyId: company, competitorsId: competitors } = headersData;
  console.log(company);

  return (
    <Box sx={{
      mt: 2
    }}>
      <Grid container>
        <Grid size={4}>
          <Text style={{ color: color }}>YOUR COMPANY</Text>
        </Grid>
        <Grid>
          <Text style={{ color: color }}>COMPETITION</Text>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={4}>
          <Title level={2} style={{ color: color }}>
            {company.name}
          </Title>
        </Grid>
        {competitors.map((competitor, index) => (
          <Grid key={index} size={4}>
            <Title level={2} style={{ color: color }}>
              {competitor.name}
            </Title>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
