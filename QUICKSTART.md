# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Start JSON Server (Backend)
```bash
npm run json-server
```
This will start the mock API server on http://localhost:3001

### Step 2: Start React App (Frontend)
In a new terminal:
```bash
npm run dev
```
The app will automatically open in your browser at http://localhost:3000

### Step 3: Start Using the App!
- Add stocks using the "Add New Stock" button
- Search and filter your inventory
- View analytics and reports
- Export data to CSV

---

## 📁 Project Structure at a Glance

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API communication
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── App.jsx             # Main app with routing
├── index.css           # Global styles
└── main.jsx            # Entry point
```

---

## 🎯 Key Features

### Dashboard Features
- ✅ Real-time inventory overview
- ✅ Quick add/edit/delete operations
- ✅ Advanced search and filtering
- ✅ Sortable data table
- ✅ Pagination
- ✅ CSV export
- ✅ Status alerts

### Reports Features
- ✅ Visual charts and graphs
- ✅ Detailed analytics
- ✅ Date range filtering
- ✅ Printable reports
- ✅ Data export

---

## 🔧 Available Commands

```bash
# Start development server
npm run dev

# Start JSON Server (backend)
npm run json-server

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📝 Adding Stock Items

1. Click **"+ Add New Stock"** button
2. Fill in the required fields:
   - Product Name (min 2 characters)
   - SKU (unique, format: ABC-123-001)
   - Category (dropdown)
   - Quantity (number)
   - Unit Price (decimal)
   - Reorder Level (number)
   - Supplier (text)
   - Location (dropdown)
3. Click **"Add Stock"** to save

---

## 🔍 Searching and Filtering

### Search
- Use the search bar to find items by **product name** or **SKU**
- Search is **debounced** for better performance

### Filters
- **Category**: Filter by product category
- **Status**: In Stock, Low Stock, or Out of Stock
- **Supplier**: Filter by supplier name
- **Location**: Filter by warehouse/location
- **Combine filters** for precise results
- **Clear all filters** with one click

---

## 📊 Viewing Reports

1. Go to **Reports** page from navigation
2. View charts:
   - Stock value by category
   - Status distribution
   - Quantity distribution
3. (Optional) Filter by date range
4. View detailed tables by category and status
5. Export or print the report

---

## ⚙️ Database

The application uses **JSON Server** with a `db.json` file containing:
- **Stocks**: Inventory items with all details
- **Categories**: Product categories

Sample data is pre-loaded for testing.

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  primary: '#3b82f6',    // Blue
  secondary: '#10b981',  // Green
  danger: '#ef4444',     // Red
  warning: '#f59e0b',    // Amber
}
```

### Categories & Locations
Update in `src/utils/constants.js`:
```javascript
export const CATEGORIES = ['Electronics', 'Furniture', ...];
export const LOCATIONS = ['Warehouse A', 'Warehouse B', ...];
```

---

## 💡 Tips & Tricks

### Performance
- The application automatically debounces search queries
- Filtering is optimized with React.memo and useMemo
- Pagination loads smaller datasets

### Data Entry
- SKU must be unique (prevents duplicates)
- Total Value auto-calculates from Quantity × Unit Price
- Status auto-updates based on quantity vs reorder level

### Export & Print
- Export CSV includes all visible columns
- Print formatting is optimized for A4 paper
- Use browser print settings to save as PDF

---

## 🐛 Troubleshooting

### "Cannot connect to API"
- Ensure JSON Server is running: `npm run json-server`
- Verify port 3001 is available
- Check browser console for errors

### "Port 3000 already in use"
- Change port in `vite.config.js`
- Or kill the process using the port

### "Duplicate SKU error"
- Each stock item must have a unique SKU
- Edit the item to change its SKU

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [JSON Server](https://github.com/typicode/json-server)

---

## 🎓 Learning Path

1. Start with Dashboard to understand the UI
2. Add a few test items
3. Try filtering and sorting
4. Explore Reports page
5. Export data
6. Review the code in `src/` folder

---

## ✨ Next Steps

- Customize categories and locations
- Modify the color scheme
- Add more sample data
- Deploy to production
- Integrate with real backend API

Enjoy managing your inventory! 🎉
