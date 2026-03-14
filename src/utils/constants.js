// Constants used throughout the application

export const API_BASE_URL = 'http://localhost:3001';

export const STOCK_STATUS = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock',
};

export const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Office Supplies',
  'Accessories',
];

export const LOCATIONS = [
  'Warehouse A',
  'Warehouse B',
  'Warehouse C',
  'Shelf A',
  'Shelf B',
];

export const ITEMS_PER_PAGE = 10;

export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TABLE_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'productName', label: 'Product Name' },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'totalValue', label: 'Total Value' },
  { key: 'reorderLevel', label: 'Reorder Level' },
  { key: 'supplier', label: 'Supplier' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'lastUpdated', label: 'Last Updated' },
];

export const TOAST_MESSAGES = {
  ADD_SUCCESS: 'Stock added successfully!',
  UPDATE_SUCCESS: 'Stock updated successfully!',
  DELETE_SUCCESS: 'Stock deleted successfully!',
  BULK_DELETE_SUCCESS: 'Stocks deleted successfully!',
  DELETE_ERROR: 'Error deleting stock. Please try again.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
  DUPLICATE_SKU: 'SKU already exists. Please use a unique SKU.',
};

export const VALIDATION_RULES = {
  PRODUCT_NAME_MIN: 2,
  PRODUCT_NAME_MAX: 100,
  SKU_MIN: 3,
  SKU_MAX: 50,
  QUANTITY_MIN: 0,
  PRICE_MIN: 0.01,
};
