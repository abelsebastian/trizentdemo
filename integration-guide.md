# Integration Guide

## How to Integrate into Main MPATS Project

### Option 1: Copy Components (Recommended)

```bash
# Copy components to main project
cp -r media-powder-inventory/src/components/* ../components/
cp media-powder-inventory/src/types.ts ../types/inventory-types.ts
cp media-powder-inventory/src/data/mock-inventory.ts ../data/
```

Then import in your main app:

```typescript
import { InventoryTable } from './components/inventory-table';
import { SummaryCards } from './components/summary-cards';
```

### Option 2: Use as Standalone Module

Keep it as a separate module and link via routing:

```typescript
// In main App.tsx
import { App as InventoryApp } from './media-powder-inventory/src/app';

// In your router
<Route path="/inventory/powder" element={<InventoryApp />} />
```

### Option 3: Monorepo Structure

Convert to a workspace package:

```json
// package.json
{
  "workspaces": [
    ".",
    "media-powder-inventory"
  ]
}
```

## API Integration Steps

### 1. Create API Service

```typescript
// services/inventory-api.ts
export const inventoryApi = {
  async getAll() {
    const response = await fetch('/api/inventory/powder');
    return response.json();
  },
  
  async getById(id: string) {
    const response = await fetch(`/api/inventory/powder/${id}`);
    return response.json();
  },
  
  async create(data: Partial<PowderItem>) {
    const response = await fetch('/api/inventory/powder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  async update(id: string, data: Partial<PowderItem>) {
    const response = await fetch(`/api/inventory/powder/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  async delete(id: string) {
    await fetch(`/api/inventory/powder/${id}`, { method: 'DELETE' });
  }
};
```

### 2. Replace Mock Data

```typescript
// In app.tsx
import { useEffect, useState } from 'react';
import { inventoryApi } from './services/inventory-api';

export const App: React.FC = () => {
  const [items, setItems] = useState<PowderItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    inventoryApi.getAll()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);
  
  // Rest of component...
};
```

### 3. Add Loading States

```typescript
// components/loading-spinner.tsx
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7043]"></div>
  </div>
);
```

### 4. Add Error Handling

```typescript
// components/error-message.tsx
export const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center gap-4 p-12 text-slate-400">
    <span className="material-symbols-outlined text-5xl">error</span>
    <p className="text-sm font-bold">{message}</p>
    <button onClick={onRetry} className="px-4 py-2 bg-[#FF7043] text-white rounded-xl">
      Retry
    </button>
  </div>
);
```

## State Management

### Option 1: React Context

```typescript
// context/inventory-context.tsx
export const InventoryContext = createContext<InventoryContextType | null>(null);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PowderItem[]>([]);
  
  return (
    <InventoryContext.Provider value={{ items, setItems }}>
      {children}
    </InventoryContext.Provider>
  );
};
```

### Option 2: Redux/Zustand

```typescript
// store/inventory-store.ts
import { create } from 'zustand';

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, data) => set((state) => ({
    items: state.items.map(item => item.id === id ? { ...item, ...data } : item)
  })),
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  }))
}));
```

## Routing Integration

```typescript
// routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { App as InventoryApp } from './media-powder-inventory/src/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'inventory/powder', element: <InventoryApp /> },
      { path: 'inventory/powder/:id', element: <InventoryDetail /> },
      // ... other routes
    ]
  }
]);
```

## Testing

```typescript
// app.test.tsx
import { render, screen } from '@testing-library/react';
import { App } from './app';

describe('Inventory App', () => {
  it('renders summary cards', () => {
    render(<App />);
    expect(screen.getByText('AVAILABLE (GMS)')).toBeInTheDocument();
  });
  
  it('filters items by search term', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'TSA' } });
    // Assert filtered results
  });
});
```

## Performance Optimization

```typescript
// Use React.memo for expensive components
export const InventoryTable = React.memo<InventoryTableProps>(({ items, onViewDetails }) => {
  // Component implementation
});

// Use useMemo for expensive calculations
const filteredItems = useMemo(() => {
  return items.filter(/* filter logic */);
}, [items, searchTerm, statusFilter]);

// Use useCallback for event handlers
const handleViewDetails = useCallback((id: string) => {
  // Handler logic
}, []);
```

## Deployment Checklist

- [ ] Replace mock data with API calls
- [ ] Add loading states
- [ ] Add error handling
- [ ] Implement authentication checks
- [ ] Add permission-based actions
- [ ] Test responsive design
- [ ] Test accessibility
- [ ] Add analytics tracking
- [ ] Configure environment variables
- [ ] Set up CI/CD pipeline
