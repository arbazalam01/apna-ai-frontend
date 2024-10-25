import { Typography, Divider, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyData from "@components/CompanyDetails/CompanyData";
import api from "@utils/api";
import { Skeleton } from "antd";

const CompanyDetails = () => {
  const [headersData, setHeadersData] = useState(null);
  let { companyId } = useParams();

  const fetchData = async () => {
    const apiUrl = `customer/${companyId}/getcompetitors`;
    try {
      const response = await api.get(apiUrl);
      const data = response.data;
      setHeadersData(data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  if (!headersData) return <Skeleton />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <CompanyData />
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
