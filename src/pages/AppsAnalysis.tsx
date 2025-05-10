
import React from 'react';
import { Search, Filter, ArrowDown, CheckCircle } from 'lucide-react';
import { useStorage } from '@/contexts/StorageContext';
import { formatDistanceToNow } from 'date-fns';

const AppsAnalysis: React.FC = () => {
  const { 
    isLoading,
    apps,
    selectedApps,
    toggleAppSelection,
    deleteSelectedApps
  } = useStorage();

  // Function to format the "last used" date
  const formatLastUsed = (date: Date | null): string => {
    if (!date) return 'Never used';
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Function to format file size
  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
  };

  // Calculate total stats
  const totalApps = apps.length;
  const unusedApps = apps.filter(app => 
    app.lastUsed && (new Date().getTime() - app.lastUsed.getTime() > 90 * 24 * 60 * 60 * 1000)
  ).length;
  const totalSize = apps.reduce((sum, app) => sum + app.size, 0);

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
            <p className="text-2xl font-bold">{totalApps}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Unused Apps</h3>
            <p className="text-2xl font-bold text-primary">{unusedApps}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Space Used</h3>
            <p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
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
                    <span className="text-sm font-medium">{formatFileSize(app.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{formatLastUsed(app.lastUsed)}</span>
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
            <button 
              className="button-3d bg-primary text-white py-2 px-4 rounded-lg flex-1"
              onClick={deleteSelectedApps}
            >
              Uninstall {selectedApps.length} Apps
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsAnalysis;
