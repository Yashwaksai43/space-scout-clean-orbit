
import React from 'react';
import { Search, Filter, CheckCircle, Trash } from 'lucide-react';
import { useStorage } from '@/contexts/StorageContext';

const PhotosAnalysis: React.FC = () => {
  const {
    isLoading,
    photoGroups,
    selectedPhotoGroups,
    togglePhotoGroupSelection,
    deleteSelectedPhotoGroups
  } = useStorage();

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

  // Calculate totals
  const totalPhotos = photoGroups.reduce((sum, group) => sum + group.count, 0);
  const duplicatePhotos = totalPhotos;
  const totalSize = photoGroups.reduce((sum, group) => sum + group.totalSize, 0);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">Photos Analysis</h1>
      <p className="text-sm text-gray-500 mb-6">
        Find and remove duplicate or low-quality photos
      </p>

      {/* Search and Filter */}
      <div className="flex mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search photos..."
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
            <h3 className="text-sm font-medium text-gray-500">Total Photos</h3>
            <p className="text-2xl font-bold">{totalPhotos}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Duplicates</h3>
            <p className="text-2xl font-bold text-primary">{duplicatePhotos}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Space Used</h3>
            <p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
          </div>
        </div>
      </div>

      {/* Photo Groups */}
      <div className="mb-4">
        <h2 className="font-semibold">Optimize These Photos</h2>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-rotate-circle"></div>
          <p className="mt-4 text-gray-500">Analyzing photos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {photoGroups.map((group) => (
            <div
              key={group.id}
              className={`card-3d overflow-hidden ${
                selectedPhotoGroups.includes(group.id) ? 'border-2 border-primary' : ''
              }`}
              onClick={() => togglePhotoGroupSelection(group.id)}
            >
              <div className="relative h-32 bg-gray-200">
                <img
                  src={group.thumbnailUrl}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full">
                  {group.count} items
                </div>
                {selectedPhotoGroups.includes(group.id) && (
                  <div className="absolute top-2 left-2">
                    <CheckCircle size={20} className="text-primary bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">{group.name}</h3>
                  <span className="text-xs">{formatFileSize(group.totalSize)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {selectedPhotoGroups.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200 animate-slide-up">
          <div className="max-w-md mx-auto flex">
            <button className="button-3d bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex-1 mr-2">
              View Selected
            </button>
            <button 
              className="button-3d bg-primary text-white py-2 px-4 rounded-lg flex-1 flex items-center justify-center"
              onClick={deleteSelectedPhotoGroups}
            >
              <Trash size={18} className="mr-2" />
              Delete Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosAnalysis;
