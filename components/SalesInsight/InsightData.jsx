import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Calendar } from 'lucide-react';
import useCompanyId from "@hooks/useCompanyId";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { Typography } from '@mui/material';

// API call function
const fetchUserSegments = async (companyId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_USER_SEGMENTS_API}/usersegments/getUserSegments/${companyId}`
  );
  return data;
};

const SegmentDropdown = ({ segment }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="mb-4 shadow-md">
      <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          {segment.Title}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <div className="text-xs text-muted-foreground">Demographics</div>
              <div className="font-medium">{segment.Demographics}</div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-muted-foreground">Buying Patterns</div>
              <div className="font-medium">{segment.Buying_Patterns}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-muted-foreground">Product Preferences</div>
            <div className="font-medium">{segment.Product_Preferences}</div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-muted-foreground">Description</div>
            <div className="text-sm">{segment.Description}</div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const CSVDropdown = ({ name, data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card
      className="m-8 shadow-lg"
      style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}
    >
      <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          {data.name}
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              Segments
            </div>
            {data.segments.map((segment, index) => (
              <SegmentDropdown key={index} segment={segment} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const InsightData = () => {
  const companyId = useCompanyId();
  
  // Use TanStack Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userSegments', companyId],
    queryFn: () => fetchUserSegments(companyId),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
      </div>
    );
  }

  if (isError) {
    return <div className="mb-4">Error fetching data: {error.message}</div>;
  }

  return (
    <div
      className="w-full shadow-md max-w-2xl pt-6 pb-6"
      style={{ width: '73%' }}
    >
      <Typography variant="AvgHeading">
        Your User Segments
      </Typography>
      {data.map((segmentData, index) => (
        <CSVDropdown key={index} name={segmentData.name} data={segmentData} />
      ))}
    </div>
  );
};

export default InsightData;
