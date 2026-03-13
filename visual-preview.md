# Visual Preview

## What You'll See When You Run This

### Header Section
```
Media Powder Inventory
Centralized tracking of dehydrated media substrates and active lot management.

[Reconcile Stock Button]  [Log New Shipment Button (Orange)]
```

### Summary Cards (4 KPIs in a row)
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ AVAILABLE (GMS) │  │  NEAR EXPIRY    │  │ CRITICAL STOCK  │  │  QC PENDING     │
│                 │  │                 │  │                 │  │                 │
│    22,600       │  │       08        │  │       03        │  │       12        │
│                 │  │                 │  │                 │  │                 │
│  QC APPROVED    │  │   < 30 DAYS     │  │ REPLENISH NOW   │  │   IN TESTING    │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
  Green border         Amber border         Red border           Blue border
```

### Search & Filter Bar
```
┌────────────────────────────────────────────────────────────────────────────┐
│ 🔍 Search by lot number, media name, or manufacturer...                   │
└────────────────────────────────────────────────────────────────────────────┘
                                                    [Filter: Optimal ✕]  [Filter ▼]
```

### Inventory Table
```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ Media & Lot Detail          │ Storage  │ Stock Level    │ Status      │ Expiry      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Tryptic Soy Agar (TSA)     │ 2-8°C    │ 12,500 gms    │ ● Optimal   │ 2026-05-12  │
│ Lot: LOT-2023-X1           │          │ ████████░░    │             │             │
│ THERMO FISHER              │          │               │             │             │
│                            │          │               │             │ [View]      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ Sabouraud Dextrose Agar    │ Room     │ 400 gms       │ ● Critical  │ 2026-02-15  │
│ Lot: LOT-2023-A2           │ Temp     │ ██░░░░░░░░    │             │             │
│ MERCK                      │          │               │             │             │
│                            │          │               │             │ [View]      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ ... (10 more rows)                                                                   │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Primary Colors
- **Dark Slate**: `#2D3E50` - Table headers, view buttons
- **Orange**: `#FF7043` - Primary action button, active states
- **White**: `#FFFFFF` - Card backgrounds, table rows

### Status Colors
- **Green** (Optimal): Emerald shades
- **Amber** (Near Expiry): Amber/yellow shades
- **Red** (Critical): Red shades
- **Blue** (QC Pending): Blue shades

### Text Colors
- **Primary**: Slate-800 (dark gray)
- **Secondary**: Slate-400 (medium gray)
- **Tertiary**: Slate-300 (light gray)

## Interactive Elements

### Hover States
- Cards: Shadow increases
- Table rows: Light gray background
- Buttons: Brightness increases
- Filter dropdown: Appears on hover

### Click Actions
- Summary cards: Toggle filter by status
- View button: Console log (ready for implementation)
- Log Shipment: Console log (ready for implementation)
- Reconcile Stock: Console log (ready for implementation)
- Filter dropdown: Toggle status filter
- Active filter tag: Clear filter

### Animations
- Page load: Fade in
- Filter tag: Zoom in
- All transitions: Smooth 300ms

## Responsive Behavior

### Desktop (1200px+)
- 4 summary cards in a row
- Full table visible
- All columns shown

### Tablet (768px - 1199px)
- 2 summary cards per row
- Table scrolls horizontally
- All columns shown

### Mobile (< 768px)
- 1 summary card per row
- Table scrolls horizontally
- Compact spacing

## Typography

### Headings
- Page title: 3xl, black weight
- Card labels: 11px, uppercase, wide tracking
- Card values: 4xl, black weight

### Body Text
- Table headers: 10px, uppercase, wide tracking
- Table cells: 14px, bold
- Descriptions: 16px, medium weight

### Special Text
- Lot numbers: Mono font
- Status badges: 9px, uppercase
- Buttons: 10px, uppercase, wide tracking

## Spacing

### Padding
- Page container: 48px (p-12)
- Cards: 32px (p-8)
- Table cells: 24px vertical, 32px horizontal

### Gaps
- Between cards: 32px (gap-8)
- Between elements: 16px (gap-4)
- Between sections: 48px (mb-12)

## Shadows

### Elevation Levels
- Cards: Subtle shadow (shadow-sm)
- Hover cards: Medium shadow (shadow-md)
- Dropdown: Strong shadow (shadow-xl)
- Primary button: Colored shadow with orange tint

## Border Radius

### Sizes
- Small elements: 8px (rounded-lg)
- Medium elements: 12px (rounded-xl)
- Large containers: 16px (rounded-2xl)
- Status badges: Full rounded (rounded-full)

## Icons

All icons use Material Symbols Outlined:
- Search: `search`
- Filter: `filter_list`
- View: `visibility`
- Add: `add_box`
- Edit: `rebase_edit`
- Status indicators: `check_circle`, `schedule`, `report`, `science`

## Empty State

When no results match filters:
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                        📦                                  │
│                                                            │
│        No inventory items match your current filters       │
│                                                            │
│                  [Reset All Filters]                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Loading State (Future)

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                        ⟳                                   │
│                   Loading inventory...                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Overall Feel

The interface feels:
- **Professional**: Clean, organized, enterprise-grade
- **Modern**: Contemporary design patterns
- **Consistent**: Matches root project perfectly
- **Responsive**: Works on all screen sizes
- **Interactive**: Smooth animations and feedback
- **Accessible**: High contrast, clear labels
- **Scannable**: Easy to find information quickly
