import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

/**
 * Charts Component - Graphical representation of stock data
 */
const Charts = ({ stocks = [] }) => {
  // Stock value by category
  const categoryData = useMemo(() => {
    const categoryMap = {};
    stocks.forEach(stock => {
      if (!categoryMap[stock.category]) {
        categoryMap[stock.category] = 0;
      }
      categoryMap[stock.category] += stock.totalValue;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  }, [stocks]);

  // Stock status distribution
  const statusData = useMemo(() => {
    const statusMap = {};
    stocks.forEach(stock => {
      statusMap[stock.status] = (statusMap[stock.status] || 0) + 1;
    });

    return Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stocks]);

  // Inventory trend (quantity distribution)
  const inventoryDistribution = useMemo(() => {
    const ranges = [
      { name: '0', min: 0, max: 0 },
      { name: '1-10', min: 1, max: 10 },
      { name: '11-25', min: 11, max: 25 },
      { name: '26-50', min: 26, max: 50 },
      { name: '50+', min: 50, max: Infinity },
    ];

    return ranges.map(range => ({
      name: range.name,
      count: stocks.filter(
        s => s.quantity >= range.min && s.quantity <= range.max
      ).length,
    }));
  }, [stocks]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Stock Value by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Stock Value by Category
        </h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      {/* Stock Status Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Stock Status Distribution
        </h3>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      {/* Inventory Quantity Distribution */}
      <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Inventory Quantity Distribution
        </h3>
        {inventoryDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
