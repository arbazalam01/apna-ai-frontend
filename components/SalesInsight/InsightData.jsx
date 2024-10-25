import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

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
      <div className="ml-8 mb-2">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-left shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{segment.segmentName}</span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              />
            </div>
          </button>

          {isOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Demographic Name</div>
                    <div className="font-medium text-gray-900">{segment.demographicName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Buying Pattern</div>
                    <div className="font-medium text-gray-900">{segment["Buying pattern"]}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Product Category</div>
                  <div className="font-medium text-gray-900">{segment["Product Category"]}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Analysis Description</div>
                  <div className="text-gray-700">{segment.analysisDescription}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CSVDropdown = ({ name, data }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="mb-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">{data["csv name"]}</span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              />
            </div>
          </button>

          {isOpen && (
            <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Date Range</span>
                </div>
                <div className="font-medium text-gray-900">
                  {data["start date"]} - {data["end date"]}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Segments</div>
                {data.segments.map((segment, index) => (
                  <SegmentDropdown key={index} segment={segment} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {Object.entries(csvData).map(([name, data]) => (
        <CSVDropdown key={name} name={name} data={data} />
      ))}
    </div>
  );
};

export default InsightData;