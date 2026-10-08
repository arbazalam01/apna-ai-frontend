import { Box,  Grid } from "@mui/material";
import { ConfigProvider, Typography } from "antd";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductsAndServices from "./ProductsAndServices";
import Industries from "./Industries";
import TopClients from "./TopClients";
import NewMarketPosition from "./NewMarketPosition";
import NewSWOTAnalysis from "./NewSWOTAnalysis";
import CompanyHeader from "./CompanyHeader";
import FirstPage from "./FirstPage";
import TableContent from "../TableContent";
import ProductsSummary from "./ProductsSummary";
import api from "@utils/api";

const { Title } = Typography;

const NewPdfGenerate = () => {
  let { companyId } = useParams();

  const [allData, setAllData] = useState(null);
  const [industryTrends, setIndustryTrends] = useState([]);

  const fetchData = async () => {
    const apiUrl = `pdf/${companyId}`;
    const apiRes = await api.get(apiUrl);
    setAllData(apiRes?.data);
   
  };
  const fetchIndustryTrends = async () => {
    const apiUrl = `customer/${companyId}/getTopTrends`;
    const apiRes = await api.get(apiUrl);

    setIndustryTrends(apiRes.data.data);
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
      fetchIndustryTrends();
    }
  }, [companyId]);

  if (!allData) return <div>Loading...</div>;



  const { company, competitors, ceo } = allData;

  const competitorServices = competitors.map(
    (competitor) => competitor?.services
  );

  const competitorProducts = competitors.map(
    (competitor) => competitor?.products
  );

  const competitorIndustries = competitors.map(
    (competitor) => competitor?.industries
  );
  const competitorTopClients = competitors.map(
    (competitor) => competitor?.topclients
  );
  const competitorMarketPosition = competitors.map(
    (competitor) => competitor?.marketposition
  );
  const competitorSWOTAnalysis = competitors.map(
    (competitor) => competitor?.swotanalysis
  );
  const competitorSummary = competitors.map(
    (competitor) => competitor?.summary
  );

  const downloadPDF = () => {
    window.print();
  };

  const companyProductsAndServices = [
    ...company?.products,
    ...company?.services,
  ];

  const competitorProductsAndServices = competitorProducts.map(
    (competitor, index) => [...competitor, ...competitorServices[index]]
  );

  return (
    <Box>
      <FirstPage companyData={company} ceo={ceo} />
      <Box sx={{
        bgcolor: "#252840"
      }}>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0, color: "white" }}>
            Top Industry Trends
          </Title>
          <Grid container spacing={2} sx={{
            my: 4
          }} >
          {industryTrends.map((item, index) => (
        <Grid key={index} size={3}>
          <TableContent item={item} textColor="white" />
        </Grid>
      ))}
          </Grid>
        </Box>
      </Box>
      <Box sx={{
        bgcolor: "#252840"
      }}>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0, color: "white" }}>
            Products And Services
          </Title>
          <CompanyHeader />
          <ProductsSummary
            company={company.summary}
            competitors={competitorSummary}
          />
          <ProductsAndServices
            company={companyProductsAndServices}
            competitors={competitorProductsAndServices}
          />
        </Box>
      </Box>
      <Box sx={{
        bgcolor: "#e8e8f2"
      }}>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0 }}>Industries Served</Title>
          <Industries
            company={company?.industries}
            competitors={competitorIndustries}
          />
        </Box>
      </Box>
      <Box sx={{
        bgcolor: "#252840"
      }}>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0, color: "white" }}>Top Clients</Title>
          <TopClients
            company={company?.topclients}
            competitors={competitorTopClients}
          />
        </Box>
      </Box>
      <Box sx={{
        bgcolor: "#e8e8f2"
      }}>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0 }}>Market Positioning</Title>
          <CompanyHeader color="black" />
          <NewMarketPosition
            company={company?.marketposition}
            competitors={competitorMarketPosition}
          />
        </Box>
      </Box>
      <Box>
        <Box
          sx={{
            mx: 4,
            py: 5
          }}>
          <Title style={{ margin: 0 }}>SWOT Analysis</Title>
          <CompanyHeader color="black" />
        </Box>
        <NewSWOTAnalysis
          company={company?.swotanalysis}
          competitors={competitorSWOTAnalysis}
        />
      </Box>
    </Box>
  );
};

export default NewPdfGenerate;
