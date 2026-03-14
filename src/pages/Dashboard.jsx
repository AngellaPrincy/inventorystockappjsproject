import React, { useState, useMemo } from 'react';
import { AlertCircle, Package, DollarSign, TrendingDown, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import StockForm from '../components/StockForm.jsx';
import StockTable from '../components/StockTable.jsx';
import Filters from '../components/Filters.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Pagination from '../components/Pagination.jsx';
import CSVExport from '../components/CSVExport.jsx';
import useStock from '../hooks/useStock.js';
import useFilters from '../hooks/useFilters.js';
import usePagination from '../hooks/usePagination.js';
import { formatCurrency } from '../utils/helpers.js';

/**
 * Dashboard Page - Main dashboard with StockTable and Filters
 */
const Dashboard = () => {
  const { stocks, loading, addStock, updateStock, deleteStock, bulkDeleteStocks } = useStock();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Use custom hooks
  const {
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
  } = useFilters(stocks);

  const {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  } = usePagination(filteredAndSortedData);

  // Get unique values for filter dropdowns
  const uniqueSuppliers = useMemo(() => {
    return [...new Set(stocks.map(s => s.supplier))].filter(Boolean).sort();
  }, [stocks]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(stocks.map(s => s.location))].filter(Boolean).sort();
  }, [stocks]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    return {
      totalProducts: stocks.length,
      totalValue: stocks.reduce((sum, stock) => sum + stock.totalValue, 0),
      lowStock: stocks.filter(s => s.status === 'Low Stock').length,
      outOfStock: stocks.filter(s => s.status === 'Out of Stock').length,
    };
  }, [stocks]);

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      if (editingStock) {
        await updateStock(editingStock.id, data);
        setEditingStock(null);
      } else {
        await addStock(data);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle edit
  const handleEdit = (stock) => {
    setEditingStock(stock);
    setIsFormOpen(true);
  };

  // Handle delete with confirmation
  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteStock(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
      try {
        await bulkDeleteStocks(selectedItems);
        setSelectedItems([]);
      } catch (error) {
        console.error('Bulk delete error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Inventory Dashboard</h1>
          <p className="text-blue-100">Manage your stock efficiently</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {summaryStats.totalProducts}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Inventory Value */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {formatCurrency(summaryStats.totalValue)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {summaryStats.lowStock}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Out of Stock Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {summaryStats.outOfStock}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown size={24} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        {(summaryStats.lowStock > 0 || summaryStats.outOfStock > 0) && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="ml-4">
                <p className="text-orange-800 font-medium">Stock Alert</p>
                <p className="text-orange-700 text-sm mt-1">
                  {summaryStats.lowStock > 0 && `${summaryStats.lowStock} item(s) have low stock. `}
                  {summaryStats.outOfStock > 0 && `${summaryStats.outOfStock} item(s) are out of stock.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={updateSearch} />
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onCategoryChange={updateCategory}
          onStatusChange={updateStatus}
          onSupplierChange={updateSupplier}
          onLocationChange={updateLocation}
          onClearFilters={() => {
            clearFilters();
            resetPage();
          }}
          uniqueSuppliers={uniqueSuppliers}
          uniqueLocations={uniqueLocations}
        />

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setEditingStock(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              + Add New Stock
            </button>

            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Selected ({selectedItems.length})
              </button>
            )}
          </div>

          <CSVExport
            data={filteredAndSortedData}
            filename={`inventory_${new Date().toISOString().split('T')[0]}.csv`}
          />
        </div>

        {/* Stock Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Loading stocks...
          </div>
        ) : (
          <>
            <StockTable
              stocks={currentItems}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              sortConfig={sortConfig}
              onSort={updateSort}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />

            {/* Deletion Confirmation Modal */}
            {deleteConfirmId && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Delete Stock Item
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete this stock item? This action cannot be undone.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => confirmDelete(deleteConfirmId)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={prevPage}
                onNext={nextPage}
                onGoToPage={goToPage}
                totalItems={totalItems}
                itemsPerPage={10}
              />
            )}
          </>
        )}

        {/* Stock Form Modal */}
        <StockForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingStock(null);
          }}
          onSubmit={handleFormSubmit}
          initialData={editingStock}
        />
      </div>
    </div>
  );
};

export default Dashboard;
