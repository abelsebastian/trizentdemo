# Login System Implementation

## Overview

A complete authentication system has been added to the Media Powder Inventory application, matching the empats-web-gui design style.

## Features

### 1. Login Screen
- Clean, modern design matching empats-web-gui colors
- Pre-filled demo credentials for easy testing
- Loading state during authentication
- Error message display
- Responsive design

### 2. Authentication Flow
```
User opens app
    ↓
Check localStorage for tokens
    ↓
If tokens exist → Go to inventory
If no tokens → Show login screen
    ↓
User enters credentials
    ↓
Call /empats/login API
    ↓
Store x-auth-token and x-userid
    ↓
Redirect to inventory
```

### 3. Session Management
- Tokens stored in localStorage
- Auto-login on page refresh if tokens exist
- Logout clears tokens and returns to login

### 4. Protected Routes
- All API calls require authentication
- Headers automatically added from localStorage
- Logout button in header

## Files Created/Modified

### New Files
- `src/views/login.tsx` - Login screen component

### Modified Files
- `src/app.tsx` - Added authentication state and login flow
- `src/components/header.tsx` - Added logout functionality
- `src/services/api.ts` - Already had login function

## Design

### Colors (matching empats-web-gui)
- Primary: `#FF7344` (coral/orange)
- Secondary: `#36405D` (dark blue)
- Text: `#374355` (primary), `#69727F` (secondary)
- Background: Gradient from slate-50 to slate-100

### Typography
- Font: Open Sans
- Bold, uppercase labels
- Consistent spacing and sizing

## Usage

### For Development
```typescript
// Demo credentials (pre-filled)
User ID: Abel234
Password: Test@1234
```

### For Production
Update credentials in the login form or remove pre-filled values.

## API Endpoint

```
POST https://api.empats-dev.alpha-03.trizentinc.com/empats/login

Request:
{
  "user_id": "SM1001",
  "password": "FGHj@123",
  "device_token": "",
  "device_id": "",
  "transferSession": true
}

Response:
{
  "statusCode": 200,
  "status": true,
  "message": "Login successfully",
  "x-userid": "184",
  "x-auth-token": "<JWT_TOKEN>",
  "auto_logout_minutes": "20"
}
```

## Security Notes

1. Tokens stored in localStorage (consider httpOnly cookies for production)
2. No token refresh implemented (add if needed)
3. Auto-logout timer not implemented (API returns 20 minutes)
4. HTTPS required for production

## Testing

1. Open the application
2. Login screen appears
3. Click "Sign In" (credentials pre-filled)
4. On success, redirected to inventory
5. Data loads from API
6. Click power button to logout
7. Returns to login screen

## Error Handling

- Network errors: "Unable to connect to server"
- Invalid credentials: Shows API error message
- Loading state prevents multiple submissions
- Form validation for required fields
