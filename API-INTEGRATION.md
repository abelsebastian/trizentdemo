# API Integration Guide

## Overview

The Media Powder Inventory system now includes a complete authentication flow with login screen and API integration.

## Login Flow

### 1. Login Screen

When you first open the app, you'll see a login screen with:
- User ID field (pre-filled: SM1001)
- Password field (pre-filled: FGHj@123)
- Sign In button

### 2. Authentication

On successful login:
- JWT token and user ID are stored in localStorage
- User is redirected to the inventory screen
- All API calls automatically include auth headers

### 3. Logout

Click the power button in the header to logout:
- Clears authentication tokens
- Returns to login screen

## Demo Credentials

```
User ID: Abel234
Password: Test@1234
```

## Setup

### 1. Login First

Before accessing the inventory, you need to login to get authentication tokens:

```typescript
import { login } from './services/api';

const response = await login('SM1001', 'FGHj@123');
// Tokens are automatically stored in localStorage
```

### 2. API Endpoints Used

The inventory screen uses these endpoints:

- **GET /media_powder/statistics** - Summary cards data
- **GET /media_powder/list** - Inventory table data

## Features

### Authentication
- Login screen with empats-web-gui styling
- Auto-login if tokens exist in localStorage
- Logout functionality in header
- Token persistence across page refreshes
- **Auto-logout after 20 minutes (configurable from API)**
- **Session timer countdown in header**
- **User ID display in header**

### Auto-fetch on Load
- Data is automatically fetched when the component mounts
- Loading spinner shown while fetching

### Real-time Statistics
- Available grams
- Near expiry count
- Critical stock (expired + blocked)
- Quarantine count

### Inventory List
- Displays all media powder batches
- Search by name, batch, or manufacturer
- Filter by status (Optimal, Near Expiry, Critical)

## Data Transformation

API data is transformed to match the UI interface:

```typescript
API Response → UI Format
- batch_name → batch
- media_name → name
- manufacturer_name → manufacturer
- available_stock → stock
- storage_temperature → storage
- stock_status (OPTIMAL/NEAR_EXPIRY/CRITICAL) → status
- qa_release_status → qcStatus
```

## Error Handling

- Errors are logged to console
- Loading state is cleared even if fetch fails
- Empty state shown if no data

## Authentication

All API calls require these headers:
- `x-auth-token`: JWT token from login
- `x-userid`: User ID from login

These are automatically added by the `getAuthHeaders()` function.

## Session Management

### Auto-Logout Timer
- Configured from API response (`auto_logout_minutes`)
- Default: 20 minutes
- Countdown displayed in header
- Alert shown when session expires
- Automatic redirect to login

### Stored Data
```javascript
localStorage:
- x-auth-token: JWT token
- x-userid: User ID from API
- auto_logout_minutes: Session duration
- user_id: Login username
- login_time: Timestamp of login
```

## Testing

To test the integration:

1. Open the app - you'll see the login screen
2. Use demo credentials (SM1001 / FGHj@123) or leave pre-filled
3. Click "Sign In"
4. On success, you'll be redirected to inventory
5. Data loads automatically from API
6. Try search and filter functionality
7. Click power button to logout

## Troubleshooting

### "Unable to connect to server"
- Check if API base URL is accessible
- Verify network connection
- Check browser console for CORS errors

### "Login failed"
- Verify credentials are correct
- Check if API endpoint is responding
- Look for error messages in response

### Data not loading
- Ensure you're logged in (check localStorage for tokens)
- Verify API endpoints are accessible
- Check browser console for errors

## Notes

- Date format from API: DD-MM-YYYY
- Quantities are in grams (gms)
- Stock status colors match API values
- No mock data is used anymore
