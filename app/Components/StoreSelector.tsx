// app/components/StoreSelector.tsx
import React, { useState } from 'react';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  isActive: boolean;
  distance?: string;
  timing: string;
}

interface StoreSelectorProps {
  stores: StoreLocation[];
  selectedStore: StoreLocation | null;
  onStoreSelect: (store: StoreLocation | null) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({ 
  stores, 
  selectedStore, 
  onStoreSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[#333333]">Select Pickup Store</h4>
        <span className="text-sm text-[#696969]">
          {filteredStores.length} stores available
        </span>
      </div>

      {/* Search Store */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search stores by name, city, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none text-sm"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Store List */}
      <div className="max-h-60 overflow-y-auto space-y-3 border rounded-lg p-2">
        {filteredStores.map(store => (
          <div
            key={store.id}
            onClick={() => onStoreSelect(store)}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              selectedStore?.id === store.id 
                ? 'border-green-500 bg-green-50 shadow-sm' 
                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-medium text-[#333333]">{store.name}</h5>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
                </div>
                <p className="text-sm text-[#696969] mb-2">{store.address}, {store.city}</p>
                <div className="flex items-center space-x-4 text-xs text-[#696969]">
                  <span>📞 {store.phone}</span>
                  <span>🕒 {store.timing}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-[#333333]">{store.distance}</div>
                <div className="text-xs text-[#696969]">~20 min drive</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Store Info */}
      {selectedStore && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-blue-900">Selected Store:</span>
                <span className="text-blue-800">{selectedStore.name}</span>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                {selectedStore.address}, {selectedStore.city}
              </p>
              <p className="text-xs text-blue-600">
                📞 {selectedStore.phone} | 🕒 {selectedStore.timing}
              </p>
              <p className="text-xs text-green-600 mt-2 font-medium">
                ✅ Product available for pickup at this location
              </p>
            </div>
            <button 
              onClick={() => onStoreSelect(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSelector;