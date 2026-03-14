#!/bin/bash

echo "🔍 Inventory Management System - Setup Verification"
echo "=================================================="
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "✅ Dependencies installed"
else
  echo "❌ Dependencies not installed. Run: npm install"
  exit 1
fi

# Check if required files exist
echo ""
echo "Checking required files..."

files_to_check=(
  "src/main.jsx"
  "src/App.jsx"
  "src/pages/Dashboard.jsx"
  "src/pages/Reports.jsx"
  "src/components/StockForm.jsx"
  "src/components/StockTable.jsx"
  "src/components/Filters.jsx"
  "src/components/SearchBar.jsx"
  "src/components/Pagination.jsx"
  "src/components/CSVExport.jsx"
  "src/components/Charts.jsx"
  "src/hooks/useStock.js"
  "src/hooks/useFilters.js"
  "src/hooks/usePagination.js"
  "src/services/api.js"
  "src/utils/helpers.js"
  "src/utils/constants.js"
  "db.json"
  "vite.config.js"
  "tailwind.config.js"
)

missing_files=0
for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file"
    missing_files=$((missing_files + 1))
  fi
done

echo ""
if [ $missing_files -eq 0 ]; then
  echo "✅ All files are present!"
  echo ""
  echo "📝 Next steps:"
  echo "1. Terminal 1: npm run json-server"
  echo "2. Terminal 2: npm run dev"
  echo ""
  echo "🌐 Open http://localhost:3000 in your browser"
else
  echo "❌ Missing $missing_files files"
  exit 1
fi
