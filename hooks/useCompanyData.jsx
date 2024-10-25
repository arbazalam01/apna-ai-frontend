import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";

const useCompanyData = (companyId) => {
  // fetch company all data from API using react query
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["companyData", companyId],
    queryFn: async () => {
      const response = await api.get(`/customer/${companyId}/getAlldata`);
      return response.data;
    },
  });

  return { data, error, isLoading, isError };
};

export default useCompanyData;
