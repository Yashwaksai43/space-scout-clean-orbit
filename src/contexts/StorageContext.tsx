
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, StorageAnalysis, AppInfo, PhotoGroup } from '../services/api';
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
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [storageAnalysis, setStorageAnalysis] = useState<StorageAnalysis | null>(null);
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedPhotoGroups, setSelectedPhotoGroups] = useState<string[]>([]);

  const refreshStorage = async () => {
    setIsLoading(true);
    try {
      // Fetch storage analysis
      const analysis = await api.analyzeStorage();
      setStorageAnalysis(analysis);
      
      // Fetch apps and photo groups
      const [appsData, photoGroupsData] = await Promise.all([
        api.getApps(),
        api.getPhotoGroups()
      ]);
      
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
  }, []);

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
      await api.deleteApps(selectedApps);
      toast.success(`Successfully uninstalled ${selectedApps.length} apps`);
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
      // In a real app, we'd get all photo IDs from the selected groups
      // For simulation, we'll just use the group IDs
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
      const mbFreed = await api.quickCleanup();
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
    performQuickCleanup
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
