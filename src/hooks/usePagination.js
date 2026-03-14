import { useState, useCallback, useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants.js';

/**
 * Custom hook for managing pagination
 * @param {Array} data - Data to paginate
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} - Pagination state and operations
 */
export const usePagination = (data = [], itemsPerPage = ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calculate pagination details
   */
  const paginationData = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return {
      currentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      currentItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [data, currentPage, itemsPerPage]);

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNextPage]);

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    if (paginationData.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPrevPage]);

  /**
   * Go to specific page
   */
  const goToPage = useCallback((page) => {
    const pageNum = Math.max(1, Math.min(page, paginationData.totalPages));
    setCurrentPage(pageNum);
  }, [paginationData.totalPages]);

  /**
   * Reset to first page
   */
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    ...paginationData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  };
};

export default usePagination;
