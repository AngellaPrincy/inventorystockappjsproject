import { useState, useCallback, useMemo } from 'react';
import { debounce } from '../utils/helpers.js';

/**
 * Custom hook for managing filters and search
 * @param {Array} data - Data to filter
 * @returns {Object} - Filtered data and filter operations
 */
export const useFilters = (data = []) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    supplier: '',
    location: '',
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'productName',
    direction: 'asc',
  });

  /**
   * Update search filter
   */
  const updateSearch = useCallback(
    debounce((searchTerm) => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 300),
    []
  );

  /**
   * Update category filter
   */
  const updateCategory = useCallback((category) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  /**
   * Update status filter
   */
  const updateStatus = useCallback((status) => {
    setFilters(prev => ({ ...prev, status }));
  }, []);

  /**
   * Update supplier filter
   */
  const updateSupplier = useCallback((supplier) => {
    setFilters(prev => ({ ...prev, supplier }));
  }, []);

  /**
   * Update location filter
   */
  const updateLocation = useCallback((location) => {
    setFilters(prev => ({ ...prev, location }));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      status: '',
      supplier: '',
      location: '',
    });
  }, []);

  /**
   * Update sort configuration
   */
  const updateSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  /**
   * Apply filters and sorting to data
   */
  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(item =>
        item.productName?.toLowerCase().includes(searchLower) ||
        item.sku?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(item => item.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }

    // Apply supplier filter
    if (filters.supplier) {
      result = result.filter(item => item.supplier === filters.supplier);
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter(item => item.location === filters.location);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        let comparison = 0;
        if (typeof aValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else {
          comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, filters, sortConfig]);

  return {
    filters,
    filteredAndSortedData,
    updateSearch,
    updateCategory,
    updateStatus,
    updateSupplier,
    updateLocation,
    clearFilters,
    updateSort,
    sortConfig,
  };
};

export default useFilters;
