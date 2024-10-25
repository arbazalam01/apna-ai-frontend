import React from "react";
import { useParams } from "react-router-dom";
import useCompanyCompetitor from "@hooks/useCompanyCompetitor";
import Loader from "@components/Loader";
import UploadSales from "@components/SalesInsight/UploadSales";
import InsightData from "@components/SalesInsight/InsightData";

const DataInsights = () => {
  const { companyId } = useParams();
  const { data, error, isLoading, isError } = useCompanyCompetitor(companyId);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        <div className="w-full">
          <UploadSales />
        </div>
        <div className="w-full">
          <InsightData />
        </div>
      </div>
    </div>
  );
};

export default DataInsights;