
import React, { useEffect, useState } from 'react';
import { Search, Filter, Image, CheckCircle, Trash } from 'lucide-react';

interface PhotoGroup {
  id: string;
  title: string;
  count: number;
  thumbnailUrl: string;
  size: string;
}

const PhotosAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPhotoGroups([
        {
          id: '1',
          title: 'Similar Selfies',
          count: 24,
          thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          size: '245 MB'
        },
        {
          id: '2',
          title: 'Screenshots',
          count: 56,
          thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          size: '120 MB'
        },
        {
          id: '3',
          title: 'Blurry Photos',
          count: 18,
          thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
          size: '86 MB'
        },
        {
          id: '4',
          title: 'Downloaded Images',
          count: 42,
          thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          size: '190 MB'
        },
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleGroupSelection = (id: string) => {
    setSelectedGroups(prev => 
      prev.includes(id) 
        ? prev.filter(groupId => groupId !== id) 
        : [...prev, id]
    );
  };

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
            <p className="text-2xl font-bold">1,248</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Duplicates</h3>
            <p className="text-2xl font-bold text-primary">127</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Space Used</h3>
            <p className="text-2xl font-bold">18.2 GB</p>
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
                selectedGroups.includes(group.id) ? 'border-2 border-primary' : ''
              }`}
              onClick={() => toggleGroupSelection(group.id)}
            >
              <div className="relative h-32 bg-gray-200">
                <img
                  src={group.thumbnailUrl}
                  alt={group.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full">
                  {group.count} items
                </div>
                {selectedGroups.includes(group.id) && (
                  <div className="absolute top-2 left-2">
                    <CheckCircle size={20} className="text-primary bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">{group.title}</h3>
                  <span className="text-xs">{group.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {selectedGroups.length > 0 && (
        <div className="fixed bottom-24 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200 animate-slide-up">
          <div className="max-w-md mx-auto flex">
            <button className="button-3d bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex-1 mr-2">
              View Selected
            </button>
            <button className="button-3d bg-primary text-white py-2 px-4 rounded-lg flex-1 flex items-center justify-center">
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
