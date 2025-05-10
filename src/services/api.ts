
/**
 * API service for SpaceScout - simulates backend functionality
 * 
 * Note: In a real application, this would connect to native device APIs
 * through platform-specific code (iOS/Android) to access file system,
 * app usage data, etc.
 */

// Types for our storage analysis
export interface StorageAnalysis {
  totalStorage: number; // in GB
  usedStorage: number; // in GB
  freeStorage: number; // in GB
  segments: {
    apps: number; // in GB
    photos: number; // in GB
    media: number; // in GB
    other: number; // in GB
  };
}

export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  size: number; // in bytes
  lastUsed: Date | null;
  isSystem: boolean;
}

export interface PhotoGroup {
  id: string;
  name: string;
  count: number;
  thumbnailUrl: string;
  totalSize: number; // in bytes
  photos: PhotoInfo[];
}

export interface PhotoInfo {
  id: string;
  path: string;
  thumbnailUrl: string;
  size: number; // in bytes
  taken: Date;
  hash: string; // Used for duplicate detection
}

// Simulate API calls with delayed responses
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service singleton
export const api = {
  /**
   * Analyze device storage
   * Returns general storage statistics
   */
  analyzeStorage: async (): Promise<StorageAnalysis> => {
    // Simulate API delay
    await delay(1500);
    
    // In a real app, this would access native APIs to get actual storage info
    return {
      totalStorage: 128,
      usedStorage: 87,
      freeStorage: 41,
      segments: {
        apps: 32.5,
        photos: 18.2,
        media: 9.8,
        other: 7.5
      }
    };
  },
  
  /**
   * Get list of apps on the device with usage info
   */
  getApps: async (): Promise<AppInfo[]> => {
    // Simulate API delay
    await delay(2000);
    
    // In a real app, this would access package manager APIs
    return [
      {
        id: '1',
        name: 'Social App',
        icon: '📱',
        size: 256 * 1024 * 1024, // 256MB
        lastUsed: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
        isSystem: false
      },
      {
        id: '2',
        name: 'Game Center',
        icon: '🎮',
        size: 1.2 * 1024 * 1024 * 1024, // 1.2GB
        lastUsed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        isSystem: false
      },
      {
        id: '3',
        name: 'Weather App',
        icon: '☀️',
        size: 156 * 1024 * 1024, // 156MB
        lastUsed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        isSystem: false
      },
      {
        id: '4',
        name: 'Fitness Tracker',
        icon: '🏃',
        size: 320 * 1024 * 1024, // 320MB
        lastUsed: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
        isSystem: false
      },
      {
        id: '5',
        name: 'Note Taking',
        icon: '📝',
        size: 78 * 1024 * 1024, // 78MB
        lastUsed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        isSystem: false
      },
      {
        id: '6',
        name: 'Music Player',
        icon: '🎵',
        size: 245 * 1024 * 1024, // 245MB
        lastUsed: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 180 days ago
        isSystem: false
      },
    ];
  },
  
  /**
   * Get groups of duplicate/similar photos
   */
  getPhotoGroups: async (): Promise<PhotoGroup[]> => {
    // Simulate API delay
    await delay(2500);
    
    // In a real app, this would use image analysis algorithms
    return [
      {
        id: '1',
        name: 'Similar Selfies',
        count: 24,
        thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        totalSize: 245 * 1024 * 1024, // 245MB
        photos: [] // We'd populate this when a group is selected
      },
      {
        id: '2',
        name: 'Screenshots',
        count: 56,
        thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        totalSize: 120 * 1024 * 1024, // 120MB
        photos: []
      },
      {
        id: '3',
        name: 'Blurry Photos',
        count: 18,
        thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
        totalSize: 86 * 1024 * 1024, // 86MB
        photos: []
      },
      {
        id: '4',
        name: 'Downloaded Images',
        count: 42,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        totalSize: 190 * 1024 * 1024, // 190MB
        photos: []
      },
    ];
  },
  
  /**
   * Get photos in a group
   */
  getPhotosInGroup: async (groupId: string): Promise<PhotoInfo[]> => {
    // Simulate API delay
    await delay(1000);
    
    // Generate some mock photos based on group ID
    const count = groupId === '1' ? 24 : groupId === '2' ? 56 : groupId === '3' ? 18 : 42;
    
    return Array.from({ length: count }, (_, i) => ({
      id: `${groupId}-${i}`,
      path: `/photos/${groupId}/${i}.jpg`,
      thumbnailUrl: `https://picsum.photos/id/${Number(groupId) * 100 + i}/200/200`,
      size: Math.round((0.5 + Math.random() * 4) * 1024 * 1024), // 0.5-4.5MB
      taken: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date in last year
      hash: `hash-${groupId}-${i}` // This would be used for identifying similar images
    }));
  },
  
  /**
   * Delete apps (simulated)
   */
  deleteApps: async (appIds: string[]): Promise<boolean> => {
    // Simulate API delay
    await delay(1000);
    
    // In a real app, this would use package manager APIs to uninstall apps
    console.log(`Deleting apps: ${appIds.join(', ')}`);
    
    // Always return success in our simulation
    return true;
  },
  
  /**
   * Delete photos (simulated)
   */
  deletePhotos: async (photoIds: string[]): Promise<boolean> => {
    // Simulate API delay
    await delay(1000);
    
    // In a real app, this would use file system APIs to delete files
    console.log(`Deleting photos: ${photoIds.join(', ')}`);
    
    // Always return success in our simulation
    return true;
  },

  /**
   * Perform quick cleanup (simulated)
   * Returns amount of space freed
   */
  quickCleanup: async (): Promise<number> => {
    // Simulate API delay for scanning
    await delay(3000);
    
    // Return space freed in MB
    return 1250; // 1.25 GB
  }
};
