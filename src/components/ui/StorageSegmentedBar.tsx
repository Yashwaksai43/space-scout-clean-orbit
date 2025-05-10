
import React, { useEffect, useState } from 'react';

export interface StorageSegment {
  name: string;
  percentage: number;
  color: string;
}

interface StorageSegmentedBarProps {
  segments: StorageSegment[];
}

const StorageSegmentedBar: React.FC<StorageSegmentedBarProps> = ({ segments }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full">
      <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="transition-all duration-1000 ease-out"
            style={{
              width: isVisible ? `${segment.percentage}%` : '0%',
              backgroundColor: segment.color,
              transition: `width 1s ease-out ${index * 0.1}s`
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: segment.color }}
            ></span>
            <span className="text-xs text-gray-600">{segment.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageSegmentedBar;
