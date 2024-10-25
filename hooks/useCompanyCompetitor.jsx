import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

const useCompanyCompetitor = (companyId) => {
  // fetch company all data from API using react query
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["companyCompetitor", companyId],
    queryFn: async () => {
      const response = await api.get(`/customer/${companyId}/getAlldataV2`);
      return response.data;
    },
  });

  return { data, error, isLoading, isError };
};

export default useCompanyCompetitor;
