
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  icon,
  onClick
}) => {
  return (
    <div 
      className="card-3d p-4 border-l-4 border-primary cursor-pointer mb-3"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="text-primary mr-3 mt-1">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="text-primary">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
