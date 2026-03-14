import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

// Stock endpoints
export const stockAPI = {
  /**
   * Fetch all stocks
   * @returns {Promise} - Response with all stocks
   */
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/stocks', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch single stock by ID
   * @param {number} id - Stock ID
   * @returns {Promise} - Response with stock data
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/stocks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new stock
   * @param {Object} data - Stock data
   * @returns {Promise} - Response with created stock
   */
  create: async (data) => {
    try {
      const response = await api.post('/stocks', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update existing stock
   * @param {number} id - Stock ID
   * @param {Object} data - Updated stock data
   * @returns {Promise} - Response with updated stock
   */
  update: async (id, data) => {
    try {
      const response = await api.put(`/stocks/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete stock
   * @param {number} id - Stock ID
   * @returns {Promise} - Response from delete request
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/stocks/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Bulk delete multiple stocks
   * @param {Array} ids - Array of stock IDs
   * @returns {Promise} - Promise.all for multiple deletes
   */
  bulkDelete: async (ids) => {
    try {
      return Promise.all(ids.map(id => api.delete(`/stocks/${id}`)));
    } catch (error) {
      throw error;
    }
  },
};

// Category endpoints
export const categoryAPI = {
  /**
   * Fetch all categories
   * @returns {Promise} - Response with all categories
   */
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
