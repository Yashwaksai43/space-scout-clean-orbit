
import React, { useState } from 'react';
import { User, Bell, Moon, Sun, Shield, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  description, 
  action, 
  onClick 
}) => {
  return (
    <div 
      className="card-3d p-4 mb-3 flex items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="text-primary mr-3">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      {action ? action : <ArrowRight size={18} className="text-gray-400" />}
    </div>
  );
};

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-sm text-gray-500 mb-6">
        Customize your SpaceScout experience
      </p>
      
      {/* User Profile */}
      <div className="card-glass p-6 mb-6 flex items-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User size={24} className="text-primary" />
        </div>
        <div className="ml-4">
          <h2 className="font-semibold">Guest User</h2>
          <button className="text-sm text-primary mt-1">Create Account</button>
        </div>
      </div>
      
      {/* Settings Groups */}
      <h3 className="text-sm font-medium text-gray-500 mb-2">Preferences</h3>
      <SettingItem 
        icon={<Bell size={20} />} 
        title="Notifications"
        description="Cleanup reminders and alerts"
      />
      <SettingItem 
        icon={isDarkMode ? <Moon size={20} /> : <Sun size={20} />} 
        title="Appearance"
        description="Dark and light mode settings"
        action={
          <div 
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
              isDarkMode ? 'bg-primary' : 'bg-gray-300'
            }`}
            onClick={toggleDarkMode}
          >
            <div 
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all ${
                isDarkMode ? 'right-0.5' : 'left-0.5'
              }`} 
            />
          </div>
        }
      />
      <SettingItem 
        icon={<Shield size={20} />} 
        title="Privacy Controls"
        description="Manage your data and permissions"
      />
      
      <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Support</h3>
      <SettingItem 
        icon={<HelpCircle size={20} />} 
        title="Help & Support"
        description="FAQ and contact options"
      />
      <SettingItem 
        icon={<ExternalLink size={20} />} 
        title="About SpaceScout"
        description="Version 1.0.0"
      />
      
      <div className="mt-8 text-center text-xs text-gray-400">
        <p>SpaceScout © 2025</p>
        <p className="mt-1">Privacy Policy • Terms of Service</p>
      </div>
    </div>
  );
};

export default Settings;
