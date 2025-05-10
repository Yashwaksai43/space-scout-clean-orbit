
import React, { useEffect, useState } from 'react';
import { Search, Smartphone, Filter, ArrowDown, CheckCircle } from 'lucide-react';

interface AppItem {
  id: string;
  name: string;
  icon: string;
  size: string;
  lastUsed: string;
  days: number;
}

const AppsAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setApps([
        {
          id: '1',
          name: 'Social App',
          icon: '📱',
          size: '245 MB',
          lastUsed: 'Never used',
          days: 120
        },
        {
          id: '2',
          name: 'Game Center',
          icon: '🎮',
          size: '1.2 GB',
          lastUsed: '3 months ago',
          days: 90
        },
        {
          id: '3',
          name: 'Weather App',
          icon: '☀️',
          size: '156 MB',
          lastUsed: '2 months ago',
          days: 60
        },
        {
          id: '4',
          name: 'Fitness Tracker',
          icon: '🏃',
          size: '320 MB',
          lastUsed: '4 months ago',
          days: 120
        },
        {
          id: '5',
          name: 'Note Taking',
          icon: '📝',
          size: '78 MB',
          lastUsed: '3 months ago',
          days: 90
        },
        {
          id: '6',
          name: 'Music Player',
          icon: '🎵',
          size: '245 MB',
          lastUsed: '6 months ago',
          days: 180
        },
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleAppSelection = (id: string) => {
    setSelectedApps(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">Apps Analysis</h1>
      <p className="text-sm text-gray-500 mb-6">
        Identify and remove unused applications
      </p>

      {/* Search and Filter */}
      <div className="flex mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button className="ml-2 p-2 bg-gray-100 rounded-lg">
          <Filter size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="card-glass p-4 mb-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Apps</h3>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Unused Apps</h3>
            <p className="text-2xl font-bold text-primary">15</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Space Used</h3>
            <p className="text-2xl font-bold">32.5 GB</p>
          </div>
        </div>
      </div>

      {/* Apps List */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-semibold">Rarely Used Apps</h2>
        <div className="flex items-center text-sm text-gray-600">
          <span>Sort by size</span>
          <ArrowDown size={14} className="ml-1" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-rotate-circle"></div>
          <p className="mt-4 text-gray-500">Analyzing apps...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div 
              key={app.id} 
              className={`card-3d p-3 ${selectedApps.includes(app.id) ? 'border-2 border-primary' : ''}`}
              onClick={() => toggleAppSelection(app.id)}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">{app.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{app.name}</h3>
                    <span className="text-sm font-medium">{app.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{app.lastUsed}</span>
                    {selectedApps.includes(app.id) && (
                      <CheckCircle size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {selectedApps.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200 animate-slide-up">
          <div className="max-w-md mx-auto flex">
            <button className="button-3d bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex-1 mr-2">
              Archive {selectedApps.length} Apps
            </button>
            <button className="button-3d bg-primary text-white py-2 px-4 rounded-lg flex-1">
              Uninstall {selectedApps.length} Apps
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsAnalysis;
