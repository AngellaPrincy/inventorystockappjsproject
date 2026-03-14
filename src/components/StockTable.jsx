import React, { useState } from 'react';
import { Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers.js';

/**
 * StockTable Component - Display stock records with sorting and actions
 */
const StockTable = ({
  stocks,
  onEdit,
  onDelete,
  sortConfig,
  onSort,
  selectedItems = [],
  onSelectionChange,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(stocks.map(s => s.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (id, e) => {
    e.stopPropagation();
    if (selectedItems.includes(id)) {
      onSelectionChange(selectedItems.filter(item => item !== id));
    } else {
      onSelectionChange([...selectedItems, id]);
    }
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-gray-400 ml-1">↕️</span>;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={stocks.length > 0 && selectedItems.length === stocks.length}
                onChange={handleSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('productName')}
            >
              Product Name <SortIcon columnKey="productName" />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('sku')}
            >
              SKU <SortIcon columnKey="sku" />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('category')}
            >
              Category <SortIcon columnKey="category" />
            </th>
            <th
              className="px-4 py-3 text-right cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('quantity')}
            >
              Qty <SortIcon columnKey="quantity" />
            </th>
            <th
              className="px-4 py-3 text-right cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('unitPrice')}
            >
              Unit Price <SortIcon columnKey="unitPrice" />
            </th>
            <th
              className="px-4 py-3 text-right cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('totalValue')}
            >
              Total Value <SortIcon columnKey="totalValue" />
            </th>
            <th
              className="px-4 py-3 text-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => onSort('status')}
            >
              Status <SortIcon columnKey="status" />
            </th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                No stock items found
              </td>
            </tr>
          ) : (
            stocks.map((stock) => (
              <tr
                key={stock.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  stock.status === 'Low Stock' ? 'bg-yellow-50' : ''
                } ${stock.status === 'Out of Stock' ? 'bg-red-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(stock.id)}
                    onChange={(e) => handleSelectItem(stock.id, e)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{stock.productName}</td>
                <td className="px-4 py-3 text-gray-600">{stock.sku}</td>
                <td className="px-4 py-3 text-gray-600">{stock.category}</td>
                <td className="px-4 py-3 text-right text-gray-900 font-medium">{stock.quantity}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {formatCurrency(stock.unitPrice)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 font-medium">
                  {formatCurrency(stock.totalValue)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stock.status)}`}>
                    {stock.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(stock)}
                      className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                      title="Edit stock"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(stock.id)}
                      className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                      title="Delete stock"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
