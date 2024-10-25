import { useAtomValue } from "jotai";

import { reportCompanyIdStore } from "@store/ReportStore";
import { useParams } from "react-router-dom";

const useCompanyId = () => {
  let { companyId } = useParams();
  const jotaiCompanyId = useAtomValue(reportCompanyIdStore);
  if (jotaiCompanyId) {
    return jotaiCompanyId;
  }
  return companyId;
};

export default useCompanyId;
