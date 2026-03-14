import React, { useMemo, useState } from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';
import Charts from '../components/Charts.jsx';
import CSVExport from '../components/CSVExport.jsx';
import useStock from '../hooks/useStock.js';
import { formatCurrency, formatDate } from '../utils/helpers.js';

/**
 * Reports Page - Reports page with charts and export options
 */
const Reports = () => {
  const { stocks } = useStock();
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  // Filter stocks by date range
  const filteredStocks = useMemo(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      return stocks;
    }

    return stocks.filter(stock => {
      const stockDate = new Date(stock.lastUpdated);
      const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

      if (start && stockDate < start) return false;
      if (end && stockDate > end) return false;
      return true;
    });
  }, [stocks, dateRange]);

  // Calculate report statistics
  const reportStats = useMemo(() => {
    return {
      totalItems: filteredStocks.length,
      totalValue: filteredStocks.reduce((sum, stock) => sum + stock.totalValue, 0),
      avgUnitPrice: filteredStocks.length > 0
        ? filteredStocks.reduce((sum, stock) => sum + stock.unitPrice, 0) / filteredStocks.length
        : 0,
      totalQuantity: filteredStocks.reduce((sum, stock) => sum + stock.quantity, 0),
      categoriesCount: new Set(filteredStocks.map(s => s.category)).size,
    };
  }, [filteredStocks]);

  // Category-wise report
  const categoryReport = useMemo(() => {
    const categoryMap = {};
    filteredStocks.forEach(stock => {
      if (!categoryMap[stock.category]) {
        categoryMap[stock.category] = {
          count: 0,
          value: 0,
          quantity: 0,
        };
      }
      categoryMap[stock.category].count += 1;
      categoryMap[stock.category].value += stock.totalValue;
      categoryMap[stock.category].quantity += stock.quantity;
    });

    return Object.entries(categoryMap).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [filteredStocks]);

  // Status-wise report
  const statusReport = useMemo(() => {
    const statusMap = {};
    filteredStocks.forEach(stock => {
      if (!statusMap[stock.status]) {
        statusMap[stock.status] = {
          count: 0,
          value: 0,
          quantity: 0,
        };
      }
      statusMap[stock.status].count += 1;
      statusMap[stock.status].value += stock.totalValue;
      statusMap[stock.status].quantity += stock.quantity;
    });

    return Object.entries(statusMap).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [filteredStocks]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={32} />
            <h1 className="text-4xl font-bold">Reports & Analytics</h1>
          </div>
          <p className="text-blue-100">View inventory insights and generate reports</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Filter by Date Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setDateRange({ startDate: '', endDate: '' })}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Clear Dates
              </button>
            </div>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Items</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{reportStats.totalItems}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Value</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(reportStats.totalValue)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Avg Unit Price</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {formatCurrency(reportStats.avgUnitPrice)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Quantity</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{reportStats.totalQuantity}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Categories</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{reportStats.categoriesCount}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8">
          <Charts stocks={filteredStocks} />
        </div>

        {/* Category Report Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-800">Category Report</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryReport.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  categoryReport.map((category) => (
                    <tr key={category.name} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-3 text-right text-gray-600">{category.count}</td>
                      <td className="px-6 py-3 text-right text-gray-600">{category.quantity}</td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(category.value)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Report Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-800">Stock Status Report</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {statusReport.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                ) : (
                  statusReport.map((status) => (
                    <tr key={status.name} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{status.name}</td>
                      <td className="px-6 py-3 text-right text-gray-600">{status.count}</td>
                      <td className="px-6 py-3 text-right text-gray-600">{status.quantity}</td>
                      <td className="px-6 py-3 text-right font-medium text-gray-900">
                        {formatCurrency(status.value)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export and Print Actions */}
        <div className="flex gap-4 justify-center mb-8 no-print">
          <CSVExport
            data={filteredStocks}
            filename={`inventory-report_${new Date().toISOString().split('T')[0]}.csv`}
          />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Printer size={20} />
            Print Report
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            background-color: white;
          }
          .max-w-7xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;
