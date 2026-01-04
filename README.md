# React Frontend - Items Manager

A production-ready React application that communicates with a Rust backend.

## 📁 Project Structure

```
react-frontend/
├── src/
│   ├── api/
│   │   ├── client.js        # HTTP request wrapper
│   │   └── items.js         # Items API endpoints
│   ├── components/
│   │   ├── ItemList.jsx     # Display items
│   │   ├── ItemForm.jsx     # Create item form
│   │   ├── Loader.jsx       # Loading indicator
│   │   ├── ErrorBanner.jsx  # Error display
│   │   ├── ItemList.css
│   │   ├── ItemForm.css
│   │   ├── Loader.css
│   │   └── ErrorBanner.css
│   ├── hooks/
│   │   └── useItems.js      # Items logic hook
│   ├── pages/
│   │   ├── HomePage.jsx     # Main page
│   │   └── HomePage.css
│   ├── App.jsx              # Root component
│   ├── App.css
│   ├── index.jsx            # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Build configuration
├── .env.example             # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Rust backend running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000` with hot module replacement enabled.

## 📝 Environment Configuration

Create a `.env.local` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8000/api
```

Or update the `api/client.js` file to point to your backend URL.

## 🏗️ Architecture

### API Layer (`api/`)
- **client.js**: Low-level HTTP wrapper with error handling
- **items.js**: High-level functions for items endpoints

### Components (`components/`)
- **ItemList**: Displays items with empty state handling
- **ItemForm**: Controlled form with validation
- **Loader**: Reusable loading indicator
- **ErrorBanner**: Error message display with dismiss

### Hooks (`hooks/`)
- **useItems**: Encapsulates all items-related logic (fetch, create, state)

### Pages (`pages/`)
- **HomePage**: Orchestrates components and manages overall state

## 🔄 Data Flow

```
HomePage (useItems hook)
    ├── fetchItems() on mount
    ├── ItemList (display items)
    └── ItemForm
        └── createNewItem() on submit
            └── Optimistic update to state
```

## ✨ Key Features

- ✅ Fetch items from backend on load
- ✅ Create new items with form validation
- ✅ Optimistic UI updates (instant feedback)
- ✅ Comprehensive error handling
- ✅ Loading indicators during async operations
- ✅ Responsive design (mobile-friendly)
- ✅ Semantic HTML for accessibility
- ✅ Clean component composition
- ✅ TypeScript-ready JSDoc comments

## 🛠️ Development Tips

### Logging
All API errors are logged to the browser console:
```javascript
console.error('Fetch error:', err);
console.error('Create error:', err);
```

### Testing
To manually test:
1. Start Rust backend on port 8000
2. Run `npm run dev`
3. Open http://localhost:3000
4. Use the form to create items
5. Check Network tab in browser DevTools for API calls

### Debugging
- Use React DevTools browser extension for component inspection
- Check Network tab for API request/response details
- Check Console for error messages

## 📦 Dependencies

- **React 18.2.0**: UI library
- **Vite 4.3.9**: Build tool (faster than Create React App)

## 🔒 Security

- CORS requests to backend are handled by Vite proxy in development
- Form inputs are validated and trimmed
- API errors are caught and displayed safely

## 📱 Browser Support

- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14

## 🎯 Next Steps

After this is working:
1. Add unit tests with Vitest
2. Add routing with React Router
3. Implement state management with Context API or Redux
4. Add more API endpoints (update, delete, filter)
5. Implement pagination and search
6. Add TypeScript for type safety

## 📄 License

Training project - Use freely for learning purposes.
