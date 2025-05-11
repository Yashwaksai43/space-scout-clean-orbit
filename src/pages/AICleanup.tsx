
import React, { useState } from 'react';
import { Brain, Zap, ImageIcon, AppWindow, Trash, Check, Loader2 } from 'lucide-react';
import { useStorage } from '@/contexts/StorageContext';
import { toast } from 'sonner';
import { PhotoGroup, AppInfo } from '../services/api';
import { deviceService } from '../services/deviceService';

const AICleanup: React.FC = () => {
  const { refreshStorage } = useStorage();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [similarImages, setSimilarImages] = useState<PhotoGroup[] | null>(null);
  const [unusedApps, setUnusedApps] = useState<AppInfo[] | null>(null);
  const [cleanupResults, setCleanupResults] = useState<{
    spaceFreed: number;
    details: string[];
  } | null>(null);

  const analyzeStorage = async () => {
    setIsAnalyzing(true);
    setSimilarImages(null);
    setUnusedApps(null);
    setCleanupResults(null);
    
    try {
      // Run AI analysis
      const [imageResults, appResults] = await Promise.all([
        deviceService.analyzeImagesWithAI(),
        deviceService.suggestAppCleanup()
      ]);
      
      setSimilarImages(imageResults);
      setUnusedApps(appResults);
      toast.success('AI analysis complete');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to complete analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runIntelligentCleanup = async () => {
    setIsCleaning(true);
    setCleanupResults(null);
    
    try {
      const results = await deviceService.intelligentCleanup();
      setCleanupResults(results);
      
      // Refresh storage data after cleanup
      await refreshStorage();
      toast.success(`Freed ${results.spaceFreed} MB of space`);
    } catch (error) {
      console.error('Cleanup error:', error);
      toast.error('Failed to perform cleanup');
    } finally {
      setIsCleaning(false);
    }
  };

  // Helper function to format file size
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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">AI-Powered Cleanup</h1>
      <p className="text-sm text-gray-500 mb-6">
        Use AI to intelligently analyze and clean your device
      </p>

      {/* AI Analysis Card */}
      <div className="card-3d mb-6 p-6 bg-white rounded-xl">
        <div className="flex items-center mb-3">
          <Brain className="text-primary mr-2" size={24} />
          <h2 className="text-lg font-semibold">AI Storage Analysis</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          The AI will scan your device to find duplicate photos, unused apps, and other items that can be safely removed.
        </p>
        <button 
          className={`button-3d bg-primary text-white py-3 px-4 rounded-lg w-full flex justify-center items-center ${isAnalyzing ? 'opacity-70' : ''}`}
          onClick={analyzeStorage}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="mr-2" size={18} />
              Analyze with AI
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {(similarImages || unusedApps) && (
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Analysis Results</h2>
          
          {/* Similar Images */}
          {similarImages && similarImages.length > 0 && (
            <div className="card-glass p-4 mb-4">
              <div className="flex items-center mb-2">
                <ImageIcon className="text-green-500 mr-2" size={18} />
                <h3 className="font-medium">Similar Photos</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {similarImages.map(group => (
                  <div key={group.id} className="bg-white rounded-lg overflow-hidden shadow">
                    <div className="h-24 relative">
                      <img 
                        src={group.thumbnailUrl} 
                        alt={group.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 right-1 bg-black/60 text-white text-xs py-0.5 px-2 rounded-full">
                        {group.count} photos
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium">{group.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(group.totalSize)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Unused Apps */}
          {unusedApps && unusedApps.length > 0 && (
            <div className="card-glass p-4">
              <div className="flex items-center mb-2">
                <AppWindow className="text-blue-500 mr-2" size={18} />
                <h3 className="font-medium">Suggested App Removal</h3>
              </div>
              <div className="space-y-2 mt-3">
                {unusedApps.map(app => (
                  <div key={app.id} className="flex items-center bg-white p-2 rounded-lg">
                    <div className="text-xl mr-2">{app.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{app.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(app.size)} • Last used {app.lastUsed ? new Date(app.lastUsed).toLocaleDateString() : 'never'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* One-Click Cleanup Button */}
          <button 
            className={`button-3d mt-4 bg-secondary text-white py-3 px-4 rounded-lg w-full flex justify-center items-center ${isCleaning ? 'opacity-70' : ''}`}
            onClick={runIntelligentCleanup}
            disabled={isCleaning}
          >
            {isCleaning ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={18} />
                Cleaning...
              </>
            ) : (
              <>
                <Trash className="mr-2" size={18} />
                AI-Powered One-Click Cleanup
              </>
            )}
          </button>
        </div>
      )}

      {/* Cleanup Results */}
      {cleanupResults && (
        <div className="card-3d p-5 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center mb-3 text-green-600">
            <Check className="mr-2" size={24} />
            <h3 className="font-semibold text-lg">Cleanup Complete</h3>
          </div>
          <p className="text-sm mb-2 font-medium">
            Freed up {cleanupResults.spaceFreed} MB of space
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {cleanupResults.details.map((detail, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AICleanup;
