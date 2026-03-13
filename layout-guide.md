# Layout Guide

## Complete Application Layout

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ☰  MICROBIAL MEDIA PLATES TRACKING & MANAGEMENT SYSTEM    Help  02 Feb 2026... │ ← Header (Dark)
├─────────────────────────────────────────────────────────────────────────────────┤
│ COMPLIANCE OVERVIEW DASHBOARD          Session: 16:22  P Shyam Kumar [Admin] 🔔│ ← Sub-header (White)
├──────────┬──────────────────────────────────────────────────────────────────────┤
│          │                                                                       │
│  MPATS   │                        MAIN CONTENT AREA                            │
│          │                                                                       │
│ ● Dashb. │  ┌─────────────────────────────────────────────────────────────┐   │
│          │  │                                                               │   │
│ ○ GPT    │  │  Current View Content (Dashboard, Inventory, etc.)          │   │
│          │  │                                                               │   │
│ ▼ Invent.│  │  - Dashboard: 4 KPI cards                                   │   │
│   • Powd.│  │  - Inventory Powder: Full inventory management              │   │
│   ○ Solu.│  │  - Other views: Placeholder screens                         │   │
│   ○ Cont.│  │                                                               │   │
│          │  └─────────────────────────────────────────────────────────────┘   │
│ ○ Batch  │                                                                       │
│          │                                                                       │
│ ▼ Post A.│                                                                       │
│   ○ Stat.│                                                                       │
│   ○ Remo.│                                                                       │
│          │                                                                       │
│ ▼ Recon. │                                                                       │
│   ○ Powd.│                                                                       │
│   ○ Solu.│                                                                       │
│          │                                                                       │
│ ▼ Report │                                                                       │
│          │                                                                       │
│ ▼ Produc.│                                                                       │
│          │                                                                       │
└──────────┴──────────────────────────────────────────────────────────────────────┘
  Sidebar      Content Area (scrollable)
  (fixed)
```

## Layout Breakdown

### 1. Header (Top Bar - Dark Slate #2D3E50)
- **Left**: Menu icon + System title
- **Right**: Help button + Date/Time + User info + Notifications + Logout

### 2. Sub-header (White)
- **Left**: Current view title (dynamic)
- **Right**: Session timeout + User details + Notification bell + Power button

### 3. Sidebar (Left - White, 256px wide)
- **Logo**: MPATS branding at top
- **Navigation Menu**:
  - Dashboard (single item)
  - GPT Test (single item)
  - Inventory (expandable with 3 sub-items)
  - Media Prep Batch (single item)
  - Post Autoclave Process (expandable with 5 sub-items)
  - Reconciliation (expandable with 4 sub-items)
  - Reports (expandable with 1 sub-item)
  - Product Master (expandable with 2 sub-items)

### 4. Main Content Area (Right - Gray background)
- **Scrollable**: Vertical scroll for long content
- **Dynamic**: Changes based on sidebar selection
- **Animated**: Smooth fade-in transitions

## Responsive Behavior

### Desktop (1200px+)
```
[Sidebar: 256px] [Content: Remaining width]
```

### Tablet (768px - 1199px)
```
[Sidebar: 256px] [Content: Remaining width]
(Sidebar may overlay on mobile menu click)
```

### Mobile (< 768px)
```
[Content: Full width]
(Sidebar hidden, accessible via menu button)
```

## Color Scheme

### Header
- Background: `#2D3E50` (Dark Slate)
- Text: White
- Hover: `#FF7043` (Orange)

### Sub-header
- Background: White
- Text: Slate-800
- Accent: `#FF7043` (Orange)

### Sidebar
- Background: White
- Active item: `#FF7043` (Orange text) + Orange-50 background
- Inactive: Slate-500
- Hover: Slate-50 background

### Content Area
- Background: Gray-50
- Cards: White with shadows
- Primary actions: `#FF7043` (Orange)

## Navigation States

### Active Item
- Orange text color (`#FF7043`)
- Orange icon
- Light orange background (for sub-items)
- Bold font weight

### Inactive Item
- Slate-500 text
- Slate-400 icon
- No background
- Normal font weight

### Hover State
- Slate-50 background
- Slate-600 text (for inactive items)
- Smooth transition

### Expanded Section
- Arrow rotates 180°
- Sub-items slide in
- Indented with left margin

## View Transitions

When switching views:
1. Fade out current view (200ms)
2. Update content
3. Fade in new view (300ms)
4. Update header title
5. Update sidebar active state

## Fixed Elements

- **Header**: Always visible at top
- **Sidebar**: Fixed on left (desktop)
- **Content**: Scrollable independently

## Z-Index Layers

1. Header: `z-50` (highest)
2. Sidebar: `z-40`
3. Dropdowns: `z-20`
4. Content: `z-10` (base)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators
- ARIA labels (future enhancement)
- Screen reader friendly (future enhancement)

## Performance

- Smooth 60fps animations
- Efficient re-renders
- Lazy loading for views (future)
- Code splitting by route (future)
