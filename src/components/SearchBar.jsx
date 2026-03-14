import React from 'react';
import { Search } from 'lucide-react';

/**
 * SearchBar Component - Search functionality
 */
const SearchBar = ({ onSearch, placeholder = 'Search by product name or SKU...' }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search
        size={20}
        className="absolute left-3 top-3.5 text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
