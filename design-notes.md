# Design System Alignment

This module perfectly matches the root MPATS project design language.

## Color Palette

- **Primary Dark**: `#2D3E50` - Used for headers, buttons, and emphasis
- **Primary Orange**: `#FF7043` - Call-to-action buttons and active states
- **Success Green**: `#10B981` / `emerald-500` - Optimal status
- **Warning Amber**: `#F59E0B` / `amber-500` - Near expiry status
- **Danger Red**: `#EF4444` / `red-500` - Critical status
- **Info Blue**: `#3B82F6` / `blue-500` - QC pending status
- **Neutral Slate**: Various slate shades for text and backgrounds

## Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: `font-black` (900 weight) with `tracking-tight`
- **Labels**: `font-black` with `uppercase` and `tracking-widest`
- **Body**: `font-medium` to `font-bold`
- **Sizes**: Consistent scale from `text-[9px]` to `text-4xl`

## Spacing System

- **Container Padding**: `p-12` (48px) for main content
- **Card Padding**: `p-8` (32px) for cards
- **Element Padding**: `p-6` (24px) for sections
- **Gaps**: `gap-4` (16px), `gap-8` (32px) for consistent spacing

## Border Radius

- **Small**: `rounded-lg` (8px) for badges and small elements
- **Medium**: `rounded-xl` (12px) for buttons and inputs
- **Large**: `rounded-2xl` (16px) for cards and containers

## Shadows

- **Subtle**: `shadow-sm` for cards
- **Medium**: `shadow-xl` for dropdowns
- **Colored**: `shadow-[0_8px_20px_rgba(255,112,67,0.2)]` for primary buttons

## Interactive States

- **Hover**: `hover:bg-slate-50`, `hover:brightness-110`
- **Active**: `active:scale-95` for tactile feedback
- **Focus**: `focus:ring-4 focus:ring-orange-500/10`
- **Transitions**: `transition-all` for smooth animations

## Component Patterns

### Buttons
- Primary: Orange background with white text
- Secondary: White background with slate text and border
- Uppercase text with wide tracking
- Icon + text combination

### Tables
- Dark header (`bg-[#2D3E50]`)
- Hover states on rows
- Uppercase column headers
- Consistent cell padding

### Cards
- White background
- Colored top border (5px)
- Subtle shadow
- Hover shadow increase

### Status Badges
- Rounded full shape
- Colored background with border
- Uppercase tiny text
- Color-coded by status

## Icons

- **Material Symbols Outlined** font
- Consistent sizing (`text-sm`, `text-base`, `text-2xl`)
- Color matches context (slate for neutral, orange for active)

## Animations

- **Fade In**: `animate-in fade-in duration-500`
- **Slide In**: `slide-in-from-bottom`
- **Zoom In**: For filter tags
- Smooth transitions on all interactive elements

## Responsive Design

- Mobile-first approach
- Grid layouts with responsive columns
- Horizontal scroll for tables on small screens
- Consistent spacing across breakpoints

## Accessibility

- Semantic HTML elements
- Proper button elements (not divs)
- Color contrast ratios meet WCAG standards
- Keyboard navigation support (future enhancement)
- Screen reader labels (future enhancement)
