// Utility functions for the inventory management system

/**
 * Format currency values
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

/**
 * Format date to readable string
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Determine stock status based on quantity and reorder level
 * @param {number} quantity - Current quantity
 * @param {number} reorderLevel - Reorder level threshold
 * @returns {string} - Status value
 */
export const getStockStatus = (quantity, reorderLevel) => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= reorderLevel) return 'Low Stock';
  return 'In Stock';
};

/**
 * Calculate total value
 * @param {number} quantity - Quantity available
 * @param {number} unitPrice - Price per unit
 * @returns {number} - Total value
 */
export const calculateTotal = (quantity, unitPrice) => {
  return parseFloat((quantity * unitPrice).toFixed(2));
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Export data to CSV
 * @param {Array} data - Data to export
 * @param {string} filename - Name of the CSV file
 */
export const exportToCSV = (data, filename = 'inventory.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        return typeof value === 'string' && value.includes(',')
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate SKU format (basic validation)
 * @param {string} sku - SKU to validate
 * @returns {boolean} - Is valid SKU
 */
export const isValidSKU = (sku) => {
  return /^[A-Z0-9\-]{3,}$/.test(sku);
};
