# Inventory & Stock Management System

A complete, production-ready React.js inventory and stock management system with a modern UI, comprehensive CRUD operations, advanced filtering, sorting, pagination, and detailed reporting capabilities.

## Features

### Core Features
- ✅ **CRUD Operations**: Add, edit, delete, and manage stock entries
- ✅ **Real-time Search**: Debounced search by product name or SKU
- ✅ **Advanced Filtering**: Filter by category, status, supplier, and location
- ✅ **Sorting**: Click column headers to sort ascending/descending
- ✅ **Pagination**: Efficient pagination for large datasets
- ✅ **Data Summary**: Cards showing total products, inventory value, low stock, and out-of-stock items
- ✅ **Status Tracking**: Automatic status calculation (In Stock, Low Stock, Out of Stock)
- ✅ **Stock Alerts**: Visual alerts for critical inventory levels

### Dashboard
- Summary cards with key metrics
- Stock summary with quick statistics
- Color-coded status indicators
- Responsive table with all operations
- Bulk delete functionality
- Quick actions (Edit/Delete)

### Reports & Analytics
- **Visual Charts**:
  - Stock value by category (bar chart)
  - Stock status distribution (pie chart)
  - Inventory quantity distribution (bar chart)
- **Detailed Reports**:
  - Category-wise breakdown
  - Status-wise breakdown
  - Date range filtering
- **Export Options**:
  - CSV export with all data
  - Printable reports
  - Print-friendly formatting

### Data Management
- **Form Validation**: Comprehensive validation for all fields
- **Unique SKU Checking**: Prevents duplicate SKUs
- **Bulk Operations**: Select and delete multiple items
- **Confirmation Dialogs**: Safe deletion with confirmation
- **Auto-calculation**: Total value calculated based on quantity and unit price

### UI/UX
- Modern, clean design with Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Color-coded status badges
- Toast notifications for user actions
- Smooth animations and transitions
- Keyboard-friendly navigation
- Print-optimized layouts

## Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Data Visualization**: Recharts
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Notifications**: React Hot Toast
- **Backend**: JSON Server (mock API)

## Project Structure

```
src/
├── components/
│   ├── StockForm.jsx       # Form for adding/editing stocks
│   ├── StockTable.jsx      # Table displaying stocks
│   ├── Filters.jsx         # Filter controls
│   ├── SearchBar.jsx       # Search functionality
│   ├── Pagination.jsx      # Pagination controls
│   ├── CSVExport.jsx       # CSV export button
│   └── Charts.jsx          # Data visualization charts
├── pages/
│   ├── Dashboard.jsx       # Main dashboard page
│   └── Reports.jsx         # Reports & analytics page
├── services/
│   └── api.js              # API service with axios
├── hooks/
│   ├── useStock.js         # Hook for stock operations (CRUD)
│   ├── useFilters.js       # Hook for filtering and sorting
│   └── usePagination.js    # Hook for pagination logic
├── utils/
│   ├── helpers.js          # Utility functions
│   └── constants.js        # App constants
├── App.jsx                 # Main app with routing
├── App.css                 # App styles
├── index.css               # Tailwind imports
└── main.jsx                # Entry point

db.json                      # JSON Server database file
vite.config.js              # Vite configuration
tailwind.config.js          # Tailwind CSS configuration
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install JSON Server globally** (if using -g flag):
   ```bash
   npm install -g json-server
   ```
   Or use locally (already in package.json devDependencies for development).

### Running the Application

**Terminal 1 - Start JSON Server**:
```bash
npm run json-server
```
This starts the mock backend API on `http://localhost:3001`

**Terminal 2 - Start React Development Server**:
```bash
npm run dev
```
This starts the React app on `http://localhost:3000`

The browser will automatically open to the application.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the build locally:
```bash
npm run preview
```

## API Endpoints

All endpoints are served by JSON Server on `http://localhost:3001`:

### Stock Endpoints
- `GET /stocks` - Fetch all stocks
- `GET /stocks/:id` - Fetch single stock
- `POST /stocks` - Create new stock
- `PUT /stocks/:id` - Update stock
- `DELETE /stocks/:id` - Delete stock

### Category Endpoints
- `GET /categories` - Fetch all categories

## Database Schema

### Stocks
```json
{
  "id": 1,
  "productName": "Laptop Dell XPS",
  "sku": "LAP-DEL-001",
  "category": "Electronics",
  "quantity": 25,
  "unitPrice": 899.99,
  "totalValue": 22499.75,
  "reorderLevel": 10,
  "supplier": "Tech Distributors Inc",
  "location": "Warehouse A",
  "lastUpdated": "2024-03-15",
  "status": "In Stock"
}
```

### Categories
```json
{
  "id": 1,
  "name": "Electronics"
}
```

## Features in Detail

### Dashboard Page
1. **Summary Statistics**
   - Total Products count
   - Total Inventory Value
   - Low Stock items count
   - Out of Stock items count

2. **Search & Filter**
   - Real-time search by product name or SKU
   - Filter by category, status, supplier, location
   - Multiple filters work in combination
   - Clear all filters option

3. **Stock Sorting**
   - Click any column header to sort
   - Ascending/descending toggle
   - Visual indicators for sort direction

4. **Table Actions**
   - Edit stock details
   - Delete individual items
   - Select multiple items for bulk delete
   - Checkbox selection with select-all

5. **Pagination**
   - Shows page range and total items
   - Navigation buttons (Previous/Next)
   - Direct page number input
   - Configurable items per page

6. **Export**
   - Export filtered data to CSV
   - Includes all columns
   - Proper formatting with special character handling

### Reports Page
1. **Charts & Visualizations**
   - Stock value by category (bar chart)
   - Stock status distribution (pie chart)
   - Inventory quantity distribution (bar chart)

2. **Detailed Tables**
   - Category-wise report with totals
   - Status-wise report with totals
   - Sortable columns

3. **Date Range Filtering**
   - Filter reports by last updated date
   - Start and end date pickers
   - Clear dates option

4. **Export & Print**
   - Export report data to CSV
   - Print-friendly formatting
   - Optimized print styles

## Form Validation

The StockForm includes comprehensive validation:
- **Product Name**: Required, minimum 2 characters
- **SKU**: Required, unique, alphanumeric with hyphens (min 3 chars)
- **Category**: Required selection
- **Quantity**: Required, non-negative number
- **Unit Price**: Required, positive number
- **Reorder Level**: Required, non-negative number
- **Supplier**: Required field
- **Location**: Required selection

## Custom Hooks

### useStock
Manages all stock-related operations:
```javascript
const {
  stocks,              // Array of all stocks
  loading,             // Loading state
  error,              // Error state
  fetchAllStocks,     // Fetch all stocks
  fetchStockById,     // Fetch single stock
  addStock,           // Add new stock
  updateStock,        // Update existing stock
  deleteStock,        // Delete single stock
  bulkDeleteStocks    // Delete multiple stocks
} = useStock();
```

### useFilters
Handles filtering, searching, and sorting:
```javascript
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
  sortConfig
} = useFilters(stocks);
```

### usePagination
Manages pagination logic:
```javascript
const {
  currentItems,
  currentPage,
  totalPages,
  totalItems,
  nextPage,
  prevPage,
  goToPage,
  resetPage
} = usePagination(data);
```

## Utility Functions

### helpers.js
- `formatCurrency(value)` - Format numbers as currency
- `formatDate(date)` - Format date strings
- `getStockStatus(quantity, reorderLevel)` - Calculate stock status
- `calculateTotal(quantity, unitPrice)` - Calculate total value
- `debounce(func, delay)` - Debounce function for search
- `exportToCSV(data, filename)` - Export data to CSV
- `isValidSKU(sku)` - Validate SKU format

## Performance Optimizations

1. **Debounced Search**: Search input is debounced to avoid excessive re-renders
2. **Memoization**: Components and computed values use React.memo and useMemo
3. **Lazy Loading**: Components loaded via React Router
4. **Efficient Filtering**: Client-side filtering optimized with useMemo
5. **Optimized Re-renders**: useCallback for stable function references

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Keyboard Shortcuts

- `Enter` - Submit form
- `Escape` - Close modal/dialog
- `Tab` - Navigate form fields
- `Ctrl/Cmd + S` - Trigger search focus

## Troubleshooting

### JSON Server not connecting
- Ensure JSON Server is running on port 3001
- Check that `http://localhost:3001/stocks` is accessible
- Verify no other services are using port 3001

### Form validation errors
- Ensure SKU is unique and follows format (e.g., LAP-DEL-001)
- Check all required fields are filled
- Product name must be at least 2 characters

### Data not updating
- Check browser console for errors
- Ensure JSON Server is running
- Try refreshing the page
- Check network tab in developer tools

## Future Enhancements

- User authentication and roles
- Advanced report scheduling
- Barcode scanning functionality
- Email notifications for low stock
- Dark mode theme toggle
- Stock movement history
- Supplier management
- Inventory forecasting
- Mobile app version
- Real-time notifications

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Support

For issues or questions, please check the browser console for error messages and ensure all services are running correctly.

---

**Built with ❤️ using React and Vite**
#   i n v e n t o r y s t o c k m a n a g e m e n t j s p r o j e c t n e w  
 