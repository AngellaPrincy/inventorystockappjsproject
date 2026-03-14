import React from 'react';
import { Download } from 'lucide-react';
import { exportToCSV } from '../utils/helpers.js';

/**
 * CSVExport Component - Export data to CSV
 */
const CSVExport = ({ data, filename = 'inventory.csv' }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }
    exportToCSV(data, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data || data.length === 0}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      title="Export to CSV"
    >
      <Download size={20} />
      Export to CSV
    </button>
  );
};

export default CSVExport;
