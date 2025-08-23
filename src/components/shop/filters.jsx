import React from 'react';
import { ChevronDown, Filter as FilterIcon } from 'lucide-react';

const Filter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
  isOpen = true,
  onToggle
}) => {
  return (
    <div className="bg-white">
      {/* Mobile filter toggle */}
      <button
        onClick={onToggle}
        className="lg:hidden w-full flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5" />
          <span className="font-medium">Filters</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter content */}
      <div className={`${isOpen ? 'block' : 'hidden lg:block'} p-6 space-y-8`}>
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
          <div className="space-y-4">
            <div>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value) || maxPrice])}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
