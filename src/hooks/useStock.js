import { useState, useCallback, useEffect } from 'react';
import { stockAPI } from '../services/api.js';
import toast from 'react-hot-toast';
import { TOAST_MESSAGES } from '../utils/constants.js';

/**
 * Custom hook for managing stock data and operations
 * @returns {Object} - Stock state and operations
 */
export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all stocks
   */
  const fetchAllStocks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await stockAPI.getAll();
      setStocks(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch stocks');
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch single stock by ID
   */
  const fetchStockById = useCallback(async (id) => {
    try {
      const data = await stockAPI.getById(id);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch stock');
      console.error('Error fetching stock:', err);
    }
  }, []);

  /**
   * Add new stock
   */
  const addStock = useCallback(async (data) => {
    try {
      // Check if SKU already exists
      const exists = stocks.some(stock => stock.sku === data.sku);
      if (exists) {
        toast.error(TOAST_MESSAGES.DUPLICATE_SKU);
        throw new Error(TOAST_MESSAGES.DUPLICATE_SKU);
      }

      const newStock = await stockAPI.create(data);
      setStocks([...stocks, newStock]);
      toast.success(TOAST_MESSAGES.ADD_SUCCESS);
      return newStock;
    } catch (err) {
      setError(err.message);
      if (!err.message.includes('SKU already exists')) {
        toast.error('Failed to add stock');
      }
      throw err;
    }
  }, [stocks]);

  /**
   * Update existing stock
   */
  const updateStock = useCallback(async (id, data) => {
    try {
      // Check if SKU already exists (excluding current stock)
      const skuExists = stocks.some(stock => stock.sku === data.sku && stock.id !== id);
      if (skuExists) {
        toast.error(TOAST_MESSAGES.DUPLICATE_SKU);
        throw new Error(TOAST_MESSAGES.DUPLICATE_SKU);
      }

      const updatedStock = await stockAPI.update(id, data);
      setStocks(stocks.map(stock => stock.id === id ? updatedStock : stock));
      toast.success(TOAST_MESSAGES.UPDATE_SUCCESS);
      return updatedStock;
    } catch (err) {
      setError(err.message);
      if (!err.message.includes('SKU already exists')) {
        toast.error('Failed to update stock');
      }
      throw err;
    }
  }, [stocks]);

  /**
   * Delete single stock
   */
  const deleteStock = useCallback(async (id) => {
    try {
      await stockAPI.delete(id);
      setStocks(stocks.filter(stock => stock.id !== id));
      toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
    } catch (err) {
      setError(err.message);
      toast.error(TOAST_MESSAGES.DELETE_ERROR);
      console.error('Error deleting stock:', err);
      throw err;
    }
  }, [stocks]);

  /**
   * Bulk delete multiple stocks
   */
  const bulkDeleteStocks = useCallback(async (ids) => {
    try {
      await stockAPI.bulkDelete(ids);
      setStocks(stocks.filter(stock => !ids.includes(stock.id)));
      toast.success(TOAST_MESSAGES.BULK_DELETE_SUCCESS);
    } catch (err) {
      setError(err.message);
      toast.error(TOAST_MESSAGES.DELETE_ERROR);
      console.error('Error bulk deleting stocks:', err);
      throw err;
    }
  }, [stocks]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchAllStocks();
  }, [fetchAllStocks]);

  return {
    stocks,
    loading,
    error,
    fetchAllStocks,
    fetchStockById,
    addStock,
    updateStock,
    deleteStock,
    bulkDeleteStocks,
  };
};

export default useStock;
