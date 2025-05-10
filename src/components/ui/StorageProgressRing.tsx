
import React, { useEffect, useState } from 'react';

interface StorageProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const StorageProgressRing: React.FC<StorageProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "#2563EB"
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="progress-ring-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="progress-ring"
      >
        <circle
          className="transition-all duration-300 ease-out"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring transition-all duration-700 ease-out"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold">{Math.round(progress)}%</span>
        <span className="text-xs text-gray-500">used</span>
      </div>
    </div>
  );
};

export default StorageProgressRing;
