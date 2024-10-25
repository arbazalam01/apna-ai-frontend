import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../utils/api";
import { useAtom } from "jotai";
import { startDateAtom, endDateAtom } from "../store/DataInsightStore";
import useCompanyId from "@hooks/useCompanyId";
// Function to fetch Google Sheet ID
const fetchSheetId = async (companyId) => {
  const { data } = await api.get(`/customer/${companyId}/getAlldata`);
  const sheetId = data.company.about.googleSheetUrl;
  return sheetId;
};
const fetchData = async (sheetId, platform, startDate, endDate) => {
  const { data } = await api.get("/datainsight/analytics", {
    params: {
      sheetId: sheetId,
      tab: platform,
      startDate: startDate.toISOString(), // Convert to ISO string
      endDate: endDate.toISOString(), // Convert to ISO string
    },
  });
  return data;
};

const useDataInsight = (platform) => {
  const [startDate] = useAtom(startDateAtom);
  const [endDate] = useAtom(endDateAtom);
  const companyId = useCompanyId();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dataInsights", platform, startDate, endDate],
    queryFn: async () => {
      const sheetId = await fetchSheetId(companyId);
      return fetchData(sheetId, platform, startDate, endDate);
    },
  });

  return { data, error, isLoading };
};

export default useDataInsight;
