
import React from 'react';

interface StorageCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
  children?: React.ReactNode;
}

const StorageCard: React.FC<StorageCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = "bg-primary",
  children
}) => {
  return (
    <div className="card-3d p-4 mb-4 animate-scale-in">
      <div className="flex items-start">
        <div className={`${color} text-white p-3 rounded-lg mr-3`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{value}</span>
            {subtitle && <span className="ml-1 text-xs text-gray-500">{subtitle}</span>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StorageCard;
