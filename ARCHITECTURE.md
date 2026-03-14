# Architecture & Development Guide

## System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────┐
│                   React Application                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │         React Router (Navigation)                  │ │
│  │  ┌──────────────────┐  ┌──────────────────┐       │ │
│  │  │   Dashboard      │  │   Reports        │       │ │
│  │  │   (Inventory)    │  │   (Analytics)    │       │ │
│  │  └──────────────────┘  └──────────────────┘       │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │            Component Layer                          │ │
│  │  StockForm  StockTable  Filters  Charts  ...       │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │            Custom Hooks Layer                       │ │
│  │  useStock  useFilters  usePagination              │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │            Services Layer                          │ │
│  │  API Service (api.js) - Axios Calls              │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                        │
                        ├──► HTTP Requests (Axios)
                        │
┌─────────────────────────────────────────────────────────┐
│           JSON Server (Mock Backend)                     │
│  ┌──────────────────────────────────────────────┐       │
│  │   db.json                                    │       │
│  │   ├── stocks (Array)                         │       │
│  │   └── categories (Array)                     │       │
│  └──────────────────────────────────────────────┘       │
│  Endpoints: GET, POST, PUT, DELETE /stocks              │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure & Purpose

### `/src`
Main source code directory

### `/src/components`
Reusable UI components:
- **StockForm.jsx** - Form modal for adding/editing stocks with validation
- **StockTable.jsx** - Data table with sorting, selection, and actions
- **Filters.jsx** - Filter controls for category, status, supplier, location
- **SearchBar.jsx** - Search input with debounce
- **Pagination.jsx** - Pagination navigation
- **CSVExport.jsx** - Export button
- **Charts.jsx** - Data visualization using Recharts

### `/src/pages`
Page-level components for routing:
- **Dashboard.jsx** - Main inventory management page
- **Reports.jsx** - Analytics and reporting page

### `/src/services`
API communication:
- **api.js** - Axios instance, API endpoints, error handling

### `/src/hooks`
Custom React hooks for business logic:
- **useStock.js** - Stock CRUD operations and state management
- **useFilters.js** - Filtering, searching, and sorting logic
- **usePagination.js** - Pagination state and logic

### `/src/utils`
Utility functions and constants:
- **helpers.js** - Helper functions (formatters, validators, CSV export)
- **constants.js** - App constants (API URL, categories, validation rules)

### Root Files
- **App.jsx** - Main app component with routing
- **main.jsx** - React entry point
- **App.css** - App-specific styles
- **index.css** - Global styles + Tailwind imports
- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **db.json** - JSON Server database with sample data

## Data Flow

### Adding a Stock Item

```
User clicks "Add New Stock"
    ↓
StockForm opens with empty form
    ↓
User fills form and submits
    ↓
StockForm validates all fields
    ↓
If valid → handleFormSubmit() called
    ↓
Dashboard calls useStock.addStock()
    ↓
addStock() sends POST request via api.js
    ↓
JSON Server receives request and saves to db.json
    ↓
API returns new stock with ID
    ↓
useStock updates local state
    ↓
React re-renders with new stock in table
    ↓
Toast notification shows success
```

### Filtering Stocks

```
User changes filter dropdown
    ↓
Filters component calls updateCategory() etc
    ↓
useFilters updates filter state
    ↓
useMemo recalculates filteredAndSortedData
    ↓
usePagination resets to page 1
    ↓
StockTable receives new currentItems
    ↓
React re-renders table with filtered data
```

### Searching Stocks

```
User types in search bar
    ↓
SearchBar calls onSearch with debounce (300ms)
    ↓
Wait for user to stop typing
    ↓
updateSearch updates filter state
    ↓
useMemo filters data by product name or SKU
    ↓
Table updates in real-time
```

## State Management

### Dashboard State
```
const { stocks, loading, error } = useStock();
  - stocks: Array of all stock items from API
  - loading: Boolean indicating API call in progress
  - error: Error message if API fails

const { filteredAndSortedData, filters } = useFilters(stocks);
  - Computed state based on filters and current stocks
  
const { currentItems, currentPage } = usePagination(filteredAndSortedData);
  - Paginated subset of filtered data
  - Current page number
```

### Local Component State
```
const [isFormOpen, setIsFormOpen] = useState(false);
  - Controls StockForm modal visibility

const [editingStock, setEditingStock] = useState(null);
  - Current stock being edited

const [selectedItems, setSelectedItems] = useState([]);
  - IDs of selected items for bulk operations

const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  - ID of item pending deletion
```

## API Communication

### API Service (api.js)
```javascript
// Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
});

// CRUD operations exported as functions
export const stockAPI = {
  getAll: () => { /* GET /stocks */ },
  getById: (id) => { /* GET /stocks/:id */ },
  create: (data) => { /* POST /stocks */ },
  update: (id, data) => { /* PUT /stocks/:id */ },
  delete: (id) => { /* DELETE /stocks/:id */ },
  bulkDelete: (ids) => { /* Delete multiple */ }
}
```

### Error Handling
- Axios interceptor catches all API errors
- Errors logged to console
- Toast notifications show user-friendly messages
- Error state stored in hook for potential UI display

## Form Validation

### StockForm Validation Rules
```javascript
RULES:
- productName: Required, 2-100 chars
- sku: Required, unique, 3-50 chars, alphanumeric + hyphens
- category: Required (dropdown)
- quantity: Required, >= 0
- unitPrice: Required, >= 0.01
- reorderLevel: Required, >= 0
- supplier: Required, text
- location: Required (dropdown)

VALIDATION FLOW:
1. On submit → validateForm()
2. Check all rules
3. If errors → display in form
4. If valid → submit to API
5. API success → close form, update data
6. API error → show toast error
```

## Performance Optimizations

### 1. Debounced Search
```javascript
const updateSearch = useCallback(
  debounce((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, 300), // Wait 300ms after user stops typing
  []
);
```

### 2. Memoized Filtering
```javascript
const filteredAndSortedData = useMemo(() => {
  // Expensive computation
  // Only recalculates when dependencies change
}, [data, filters, sortConfig]);
```

### 3. Efficient Re-renders
- useCallback for stable function references
- React.memo could wrap expensive components
- useMemo for computed values

### 4. Code Splitting (Optional)
- lazy() for route-based code splitting
- Dynamic imports for heavy components

## Styling Strategy

### Tailwind CSS
- Utility-first CSS framework
- No custom CSS classes needed for most components
- Responsive design with breakpoints (sm, md, lg, xl)

### Custom CSS
- App.css: App-specific styles (animations, overrides)
- index.css: Global styles, Tailwind imports

### Responsive Design
```javascript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
// 1 col on mobile
// 2 cols on medium screens
// 4 cols on large screens
```

## Data Visualization

### Recharts Integration
```javascript
// Components from recharts
import { BarChart, PieChart, LineChart } from 'recharts';

// Charts automatically responsive via ResponsiveContainer
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={categoryData}>
    {/* Chart configuration */}
  </BarChart>
</ResponsiveContainer>
```

## Testing

### Manual Testing Checklist
- [ ] Add stock item
- [ ] Edit stock item
- [ ] Delete stock item
- [ ] Bulk delete items
- [ ] Search by product name
- [ ] Search by SKU
- [ ] Filter by category
- [ ] Filter by status
- [ ] Sort table columns
- [ ] Paginate through results
- [ ] Export to CSV
- [ ] View reports
- [ ] Print reports
- [ ] Date range filtering
- [ ] Validation errors

## Deployment

### Build Process
```bash
npm run build
# Outputs optimized bundle to /dist
```

### Production Checklist
- Update API_BASE_URL for production API
- Configure CORS if needed
- Set up environment variables
- Test all CRUD operations
- Verify CSV export
- Test charts rendering
- Mobile responsiveness check

## Common Modifications

### Add New Filter
1. Add filter field to `useFilters` state
2. Create update function
3. Add filter control to `Filters.jsx`
4. Update filter logic in useMemo

### Change Table Columns
1. Update column mapping in `StockTable.jsx`
2. Adjust if new columns should be exported (CSVExport)

### Customize Colors
1. Update `tailwind.config.js` colors object
2. Update color constants in utilities
3. Rebuild if needed

### Add New Page
1. Create page component in `/src/pages`
2. Add route in `App.jsx`
3. Add navigation link
4. Import necessary hooks and components

## Debugging

### Browser Developer Tools
- Console: Check for errors and logs
- Network: Monitor API calls
- React DevTools: Inspect component state and props
- Performance: Check rendering times

### Common Issues
- **"Cannot GET /stocks"** - JSON Server not running
- **Duplicate SKU error** - Check db.json for existing SKU
- **Form not submitting** - Check validation errors
- **Filters not working** - Verify filter state in React DevTools
- **Charts not showing** - Check if data exists

## Best Practices

1. **Component Structure**: Keep components focused on single responsibility
2. **Custom Hooks**: Extract reusable logic into custom hooks
3. **State Management**: Keep state as close to where it's used as possible
4. **API Calls**: Centralize in service layer
5. **Error Handling**: Always handle promises with try-catch or .catch()
6. **Validation**: Validate on both client and server
7. **Performance**: Use React DevTools Profiler to identify bottlenecks
8. **Code Organization**: Group related files, maintain consistent naming

## Scaling Considerations

For larger applications:
- Consider state management library (Redux, Zustand)
- Implement proper authentication
- Add API request caching
- Use backend pagination
- Implement soft delete for data integrity
- Add audit logging
- Use database transactions
- Implement rate limiting
