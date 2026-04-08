import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart3, Package } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard.jsx';
import Reports from './pages/Reports.jsx';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                <Package size={28} className="text-blue-600" />
                <span>Inventory Manager</span>
              </Link>

              {/* Links */}
              <div className="flex items-center gap-8">
                <NavLink to="/" label="Dashboard" icon={<Package size={20} />} />
                <NavLink to="/reports" label="Reports" icon={<BarChart3 size={20} />} />
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-6 px-4 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2026 Inventory & Stock Management System. All rights reserved.</p>
          </div>
        </footer>

        {/* Toast Notifications */}
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

/**
 * NavLink Component - Navigation link with active state
 */
function NavLink({ to, label, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-600 font-medium'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default App;
