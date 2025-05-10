
import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  accentColor?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  onClick,
  accentColor = "bg-primary hover:bg-primary/90"
}) => {
  return (
    <div className="card-glass p-4 mb-4 animate-fade-in">
      <div className="flex items-center mb-3">
        <div className="mr-3 text-primary">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className={`button-3d ${accentColor} text-white py-2 px-4 rounded-lg w-full`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;
