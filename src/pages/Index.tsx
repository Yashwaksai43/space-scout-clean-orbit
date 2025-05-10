
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const startApp = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 flex flex-col items-center justify-center p-5">
      <div className="card-glass p-8 max-w-md w-full text-center mb-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-6 shadow-3d animate-pulse-light">
            <Sparkles size={40} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 animate-fade-in">SpaceScout</h1>
        <p className="text-gray-600 mb-8 animate-slide-up">
          The intelligent storage optimizer for your device
        </p>
        
        <div className="space-y-4 text-left mb-8">
          <div className="flex items-center animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-bold">1</span>
            </div>
            <p>Identify unused apps and redundant photos</p>
          </div>
          <div className="flex items-center animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-bold">2</span>
            </div>
            <p>Free up valuable storage space with one tap</p>
          </div>
          <div className="flex items-center animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <span className="text-primary font-bold">3</span>
            </div>
            <p>Get personalized optimization recommendations</p>
          </div>
        </div>
        
        <button 
          onClick={startApp}
          className="button-3d bg-primary text-white py-3 px-8 rounded-lg flex items-center justify-center w-full animate-scale-in"
          style={{ animationDelay: "400ms" }}
        >
          Get Started
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
      
      <p className="text-sm text-gray-500 max-w-xs text-center">
        No account required. Your data stays on your device for maximum privacy.
      </p>
    </div>
  );
};

export default Index;
