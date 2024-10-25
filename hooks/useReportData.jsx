import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useReportData = (tabType) => {
  const router = useRouter();
  const [reportData, setReportData] = useState(null);

  const { company_name } = router.query;

  const fetchData = async () => {
    const endpoint = `report/${company_name}/${tabType}`;
    const apiUrl = `/api/proxy?endpoint=${endpoint}`;

    const { data } = await axios.get(apiUrl);
    setReportData(data);
  };

  useEffect(() => {
    if (company_name) fetchData();
  }, [company_name]);

  if (!reportData) return null;

  const {
    companyId: company,
    competitorsId: competitors,
    industryLeaderId: industryLeader,
  } = reportData;

  return {
    company,
    competitors,
    industryLeader,
  };
};

export default useReportData;
