
import React from 'react';
import { Zap, Smartphone, Image, FileText, ArrowRight, Filter } from 'lucide-react';
import StorageProgressRing from '@/components/ui/StorageProgressRing';
import StorageSegmentedBar, { StorageSegment } from '@/components/ui/StorageSegmentedBar';
import StorageCard from '@/components/ui/StorageCard';
import ActionCard from '@/components/ui/ActionCard';
import InsightCard from '@/components/ui/InsightCard';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '@/contexts/StorageContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isLoading, 
    storageAnalysis, 
    performQuickCleanup,
    refreshStorage,
    isNativeDevice
  } = useStorage();

  // Calculate the storage percentage used
  const storageUsed = storageAnalysis 
    ? Math.round((storageAnalysis.usedStorage / storageAnalysis.totalStorage) * 100) 
    : 0;

  // Create storage segments for the segmented bar
  const storageSegments: StorageSegment[] = storageAnalysis ? [
    { name: 'Apps', percentage: Math.round((storageAnalysis.segments.apps / storageAnalysis.usedStorage) * 100), color: '#2563EB' },
    { name: 'Photos', percentage: Math.round((storageAnalysis.segments.photos / storageAnalysis.usedStorage) * 100), color: '#10B981' },
    { name: 'Media', percentage: Math.round((storageAnalysis.segments.media / storageAnalysis.usedStorage) * 100), color: '#F97316' },
    { name: 'Other', percentage: Math.round((storageAnalysis.segments.other / storageAnalysis.usedStorage) * 100), color: '#94A3B8' }
  ] : [];

  const handleCleanup = () => {
    performQuickCleanup();
  };

  const handleScheduleScan = () => {
    // In a real app, this would schedule a background scan
    // For now, just refresh the storage
    refreshStorage();
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">SpaceScout</h1>
          <p className="text-sm text-gray-500">Free up your device storage</p>
          {isNativeDevice && (
            <p className="text-xs text-green-500 font-medium mt-1">
              ● Connected to real device
            </p>
          )}
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse-light"></div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-rotate-circle"></div>
          <p className="mt-4 text-gray-500">Analyzing storage...</p>
        </div>
      ) : (
        <>
          {/* Storage Overview */}
          <div className="card-3d mb-6 p-6 bg-white rounded-xl">
            <h2 className="font-semibold mb-4">Storage Overview</h2>
            <div className="flex flex-col items-center">
              <StorageProgressRing percentage={storageUsed} />
              <div className="mt-6 w-full">
                <StorageSegmentedBar segments={storageSegments} />
              </div>
              <div className="mt-4 w-full bg-blue-50 p-3 rounded-lg text-center">
                <span className="text-sm font-medium">
                  {storageAnalysis ? `${storageAnalysis.freeStorage} GB free of ${storageAnalysis.totalStorage} GB` : 'No storage data'}
                </span>
              </div>
            </div>
          </div>

          {/* Storage Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <StorageCard
              title="Apps"
              value={`${storageAnalysis?.segments.apps.toFixed(1)} GB`}
              icon={<Smartphone size={20} />}
              color="bg-primary"
            />
            <StorageCard
              title="Photos"
              value={`${storageAnalysis?.segments.photos.toFixed(1)} GB`}
              icon={<Image size={20} />}
              color="bg-secondary"
            />
            <StorageCard
              title="Media"
              value={`${storageAnalysis?.segments.media.toFixed(1)} GB`}
              icon={<FileText size={20} />}
              color="bg-accent"
            />
            <StorageCard
              title="Other"
              value={`${storageAnalysis?.segments.other.toFixed(1)} GB`}
              icon={<Filter size={20} />}
              color="bg-gray-500"
            />
          </div>

          {/* Quick Actions */}
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <ActionCard
            title="One-Tap Cleanup"
            description="Quickly scan and remove junk files, caches, and unused apps."
            icon={<Zap size={24} />}
            buttonText="Clean Now"
            onClick={handleCleanup}
            accentColor="bg-secondary hover:bg-secondary/90"
          />
          <ActionCard
            title="Schedule Scan"
            description="Set automatic scanning during device idle time."
            icon={<Filter size={24} />}
            buttonText="Schedule"
            onClick={handleScheduleScan}
          />

          {/* Insights */}
          <div className="mt-6 mb-3 flex justify-between items-center">
            <h2 className="font-semibold">Insights</h2>
            <button className="flex items-center text-sm text-primary">
              <span className="mr-1">View all</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <InsightCard
            title="Duplicate Photos"
            description="Found 127 similar photos taking up 1.2GB"
            icon={<Image size={20} />}
            onClick={() => navigate('/photos')}
          />
          
          <InsightCard
            title="Unused Apps"
            description="15 apps haven't been used in over 3 months"
            icon={<Smartphone size={20} />}
            onClick={() => navigate('/apps')}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
