# Quick Start Guide

## Installation

```bash
cd media-powder-inventory
npm install
```

## Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## What You'll See

- **Full MPATS Navigation**: Sidebar with all modules (most are static/disabled)
- **Header**: Top bar with live clock and user info
- **Media Powder Inventory**: The only fully functional view

## Demo Features

### ✅ Functional (Media Powder Inventory)
1. **Search**: Type in the search bar to filter by name, lot, or manufacturer
2. **Filter by Status**: Click on summary cards to filter by status
3. **View Details**: Click "View" button on any row (console log for now)
4. **Actions**: Click "Log New Shipment" or "Reconcile Stock" buttons (console log)

### 🎨 Static (All Other Menu Items)
- Dashboard, GPT Test, Batch Management, etc. are **disabled**
- Solutions and Containers under Inventory are marked **"Soon"**
- These show the complete MPATS structure but aren't clickable

## Navigation

- **Inventory** section is expandable
- **Media Powder** is the only active sub-item (orange when selected)
- Other menu items are grayed out with "Demo" badges

## Next Steps

- Explore the Media Powder Inventory features
- Check the mock data in `src/data/mock-inventory.ts`
- Replace mock data with API calls when ready
- Implement other views by removing disabled states in sidebar
