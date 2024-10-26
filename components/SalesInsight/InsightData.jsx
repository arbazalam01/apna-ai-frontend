import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const InsightData = () => {
  // Sample data structure
  const csvData = {
    "happySalesCSV": {
      "csv name": "happy",
      "start date": "01 Oct 2024",
      "end date": "24 Oct 2024",
      segments: [
        {
          segmentName: "Age Group",
          "Buying pattern": "rich",
          demographicName: "Demographics",
          "Product Category": "Cloth",
          analysisDescription: "Customer segmentation based on age ranges"
        },
        {
          segmentName: "Money",
          "Buying pattern": "rich",
          demographicName: "Demographics",
          "Product Category": "Cloth",
          analysisDescription: "Customer segmentation based on age ranges"
        }
      ]
    },
    "sadSalesCSV": {
      "csv name": "sad",
      "start date": "01 Oct 2024",
      "end date": "24 Oct 2024",
      segments: [
        {
          segmentName: "Age Group",
          "Buying pattern": "rich",
          demographicName: "Demographics",
          "Product Category": "Cloth",
          analysisDescription: "Customer segmentation based on age ranges"
        },
        {
          segmentName: "Money",
          "Buying pattern": "rich",
          demographicName: "Demographics",
          "Product Category": "Cloth",
          analysisDescription: "Customer segmentation based on age ranges"
        }
      ]
    }
  };

  const SegmentDropdown = ({ segment }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Card className="mb-4 shadow-md"> {/* Added shadow-md for subtle shadow */}
        <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CardTitle className="text-sm font-medium flex justify-between items-center">
            {segment.segmentName}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {isOpen && (
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Demographic Name</div>
                <div className="font-medium">{segment.demographicName}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Buying Pattern</div>
                <div className="font-medium">{segment["Buying pattern"]}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-xs text-muted-foreground">Product Category</div>
              <div className="font-medium">{segment["Product Category"]}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Analysis Description</div>
              <div className="text-sm">{segment.analysisDescription}</div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const CSVDropdown = ({ name, data }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Card className="mt-6 mb-6 shadow-lg" style={{
         boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
         marginTop:'10px',
         marginBottom:'10px'
      }}> {/* Added shadow-lg for more pronounced shadow */}
        <CardHeader className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <CardTitle className="text-lg font-medium flex justify-between items-center">
            {data["csv name"]}
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </CardTitle>
        </CardHeader>
        {isOpen && (
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Date Range</span>
              </div>
              <div className="font-medium">
                {data["start date"]} - {data["end date"]}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground mb-2">Segments</div>
              {data.segments.map((segment, index) => (
                <SegmentDropdown key={index} segment={segment} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  // Simulating loading state
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="w-full shadow-md max-w-2xl pt-6 pb-6"
    style={{
      width:'73%',
    }}>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        Object.entries(csvData).map(([name, data]) => (
          <CSVDropdown key={name} name={name} data={data} />
        ))
      )}
    </div>
  );
};

export default InsightData;
