
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, StorageAnalysis, AppInfo, PhotoGroup } from '../services/api';
import { deviceService } from '../services/deviceService';
import { toast } from 'sonner';

interface StorageContextType {
  isLoading: boolean;
  storageAnalysis: StorageAnalysis | null;
  apps: AppInfo[];
  photoGroups: PhotoGroup[];
  selectedApps: string[];
  selectedPhotoGroups: string[];
  refreshStorage: () => Promise<void>;
  toggleAppSelection: (appId: string) => void;
  togglePhotoGroupSelection: (groupId: string) => void;
  deleteSelectedApps: () => Promise<void>;
  deleteSelectedPhotoGroups: () => Promise<void>;
  performQuickCleanup: () => Promise<void>;
  isNativeDevice: boolean;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storageAnalysis, setStorageAnalysis] = useState<StorageAnalysis | null>(null);
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedPhotoGroups, setSelectedPhotoGroups] = useState<string[]>([]);
  const [isNativeDevice, setIsNativeDevice] = useState(false);

  // Check if running on a native device
  useEffect(() => {
    const checkPlatform = async () => {
      const isNative = deviceService.isNative();
      setIsNativeDevice(isNative);
      
      if (isNative) {
        const deviceInfo = await deviceService.getDeviceInfo();
        console.log('Running on native device:', deviceInfo);
      } else {
        console.log('Running in browser environment');
      }
    };
    
    checkPlatform();
  }, []);

  const refreshStorage = async () => {
    setIsLoading(true);
    try {
      let analysisData: StorageAnalysis | null = null;
      let appsData: AppInfo[] = [];
      let photoGroupsData: PhotoGroup[] = [];
      
      // Try to get data from native device first, fall back to simulated data
      if (isNativeDevice) {
        // Get data from device
        analysisData = await deviceService.getStorageInfo();
        const nativeApps = await deviceService.getInstalledApps();
        const nativePhotos = await deviceService.getPhotoGroups();
        
        // Use native data if available, otherwise fall back to simulated
        if (nativeApps) appsData = nativeApps;
        else appsData = await api.getApps();
        
        if (nativePhotos) photoGroupsData = nativePhotos;
        else photoGroupsData = await api.getPhotoGroups();
        
        if (!analysisData) analysisData = await api.analyzeStorage();
      } else {
        // When in browser, use simulated data
        analysisData = await api.analyzeStorage();
        [appsData, photoGroupsData] = await Promise.all([
          api.getApps(),
          api.getPhotoGroups()
        ]);
      }
      
      setStorageAnalysis(analysisData);
      setApps(appsData);
      setPhotoGroups(photoGroupsData);
      
    } catch (error) {
      console.error('Error fetching storage data:', error);
      toast.error('Failed to analyze storage');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    refreshStorage();
  }, [isNativeDevice]);

  const toggleAppSelection = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId) 
        : [...prev, appId]
    );
  };

  const togglePhotoGroupSelection = (groupId: string) => {
    setSelectedPhotoGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const deleteSelectedApps = async () => {
    if (selectedApps.length === 0) return;
    
    try {
      if (isNativeDevice) {
        // On native device, delete apps one by one
        const results = await Promise.all(
          selectedApps.map(appId => deviceService.deleteApp(appId))
        );
        
        const successCount = results.filter(result => result).length;
        if (successCount > 0) {
          toast.success(`Successfully uninstalled ${successCount} apps`);
        }
      } else {
        // In browser, use simulated API
        await api.deleteApps(selectedApps);
        toast.success(`Successfully uninstalled ${selectedApps.length} apps`);
      }
      
      setSelectedApps([]);
      await refreshStorage();
    } catch (error) {
      console.error('Error deleting apps:', error);
      toast.error('Failed to uninstall apps');
    }
  };

  const deleteSelectedPhotoGroups = async () => {
    if (selectedPhotoGroups.length === 0) return;
    
    try {
      if (isNativeDevice) {
        // This would need to be implemented with actual paths to photos
        // For now, we'll just use the simulated API
        console.log('Would delete photos on native device');
      } 
      
      // Use simulated API for now in all cases
      await api.deletePhotos(selectedPhotoGroups);
      toast.success(`Successfully deleted photos from ${selectedPhotoGroups.length} groups`);
      
      setSelectedPhotoGroups([]);
      await refreshStorage();
    } catch (error) {
      console.error('Error deleting photos:', error);
      toast.error('Failed to delete photos');
    }
  };

  const performQuickCleanup = async () => {
    try {
      let mbFreed: number;
      
      if (isNativeDevice) {
        mbFreed = await deviceService.cleanupCaches();
      } else {
        mbFreed = await api.quickCleanup();
      }
      
      toast.success(`Cleanup complete! Freed ${mbFreed} MB of space`);
      await refreshStorage();
    } catch (error) {
      console.error('Error performing cleanup:', error);
      toast.error('Cleanup failed');
    }
  };

  const value = {
    isLoading,
    storageAnalysis,
    apps,
    photoGroups,
    selectedApps,
    selectedPhotoGroups,
    refreshStorage,
    toggleAppSelection,
    togglePhotoGroupSelection,
    deleteSelectedApps,
    deleteSelectedPhotoGroups,
    performQuickCleanup,
    isNativeDevice
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
