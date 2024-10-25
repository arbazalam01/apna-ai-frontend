import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@utils/api";
import { Skeleton } from "antd";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const AiResponse = (props) => {
  const { previousStep, triggerNextStep } = props;
  const params = useParams();
  const companyId = params.companyId;

  const [response, setResponse] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["chatbotResponse", previousStep.message],
    queryFn: () => api.post("/openai/runaprompt", {
      prompt: previousStep.message,
      companyId,
    }),
    enabled: !apiCalled,
  });

  useEffect(() => {
    if (data && !isLoading && !isError && !apiCalled) {
      setResponse(data?.data);
      setApiCalled(true);
      triggerNextStep();
    }
  }, [data, isLoading, isError, apiCalled, triggerNextStep]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Error: Failed to fetch response.</div>;
  }

  // Ensure response or data is properly rendered
  if (response) {
    // Check if response is an object and render its properties
    // if (typeof response === 'object' && response !== null) {
    //   return (
    //     <div>
    //       {Object.keys(response).map(key => (
    //         <Typography key={key} style={{ fontSize: "0.94rem" }}>
    //           <strong>{key}:</strong> {Array.isArray(response[key]) ? response[key].join(', ') : response[key]}
    //         </Typography>
    //       ))}
    //     </div>
    //   );
    // }
    // If response is a string or number
    return (
      <Typography style={{ fontSize: "0.94rem" }}>
        {response && response}
      </Typography>
    );
  }

  return null;
};

export default AiResponse;
