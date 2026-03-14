# API Debug Console

## Overview

A developer tool for testing and debugging API endpoints in real-time. Monitor requests, responses, and authentication status.

## Features

### 1. Authentication Info Panel
Displays current authentication state:
- `x-auth-token`: JWT token
- `x-userid`: User ID from API
- `user_id`: Login username
- `login_time`: Login timestamp
- `auto_logout_minutes`: Session duration

### 2. Test Endpoints
Quick test buttons for all API endpoints:
- **Test Login** - POST /empats/login
- **Test Statistics** - GET /media_powder/statistics
- **Test Powder List** - GET /media_powder/list
- **Test Lot Details** - GET /media_powder/list_powder_batch_lot_details
- **Test Products** - GET /media/list_media_product_definitions

### 3. Request Log
- Shows all API requests in chronological order
- Color-coded status (success/error)
- Displays method, endpoint, timestamp, and duration
- Click to view full details

### 4. Request Details
When you select a log entry, view:
- **Request**: Method, endpoint, and request body
- **Response**: Full JSON response
- **Metadata**: Status, duration, timestamp

## Usage

### Access the Debug Console
1. Login to the application
2. Click "API Debug" in the sidebar (bottom)
3. Blue "Dev" badge indicates it's a development tool

### Test an Endpoint
1. Click any "Test" button
2. Request is sent to the API
3. Log entry appears in the left panel
4. Details shown in the right panel

### View Request Details
1. Click any log entry in the left panel
2. Full request/response shown on the right
3. JSON is formatted for readability

### Clear Logs
Click "Clear Logs" button to reset the console

## Use Cases

### 1. Verify Authentication
Check if tokens are properly stored:
```
Auth Info Panel shows:
- x-auth-token: eyJhbGc...
- x-userid: 184
- user_id: SM1001
```

### 2. Test API Connectivity
Click "Test Login" to verify:
- API is reachable
- Credentials are correct
- Response format is valid

### 3. Debug Data Issues
Test "Powder List" to check:
- Data structure matches expectations
- All required fields are present
- Values are in correct format

### 4. Monitor Response Times
Each log shows duration in milliseconds:
- Identify slow endpoints
- Compare performance
- Debug timeout issues

### 5. Troubleshoot Errors
When an API call fails:
- View exact error message
- Check request parameters
- Verify authentication headers

## Response Status

### Success (Green)
- API returned `status: true`
- Data received successfully
- No errors

### Error (Red)
- API returned `status: false`
- Network error occurred
- Authentication failed

## Example Workflow

### Testing New Feature
1. Login to get fresh tokens
2. Open Debug Console
3. Test Statistics endpoint
4. Verify response structure
5. Test Powder List endpoint
6. Check data transformation
7. Review any errors

### Debugging Login Issues
1. Open Debug Console
2. Click "Test Login"
3. Check request body
4. Verify response
5. Confirm tokens are stored
6. Check Auth Info panel

### Monitoring API Changes
1. Test all endpoints
2. Save response structures
3. Compare with documentation
4. Identify any breaking changes

## Tips

- **Use before implementing**: Test endpoints before writing code
- **Debug in isolation**: Test one endpoint at a time
- **Check auth first**: Verify tokens before testing protected endpoints
- **Monitor timing**: Watch for slow responses
- **Save logs**: Take screenshots of errors for debugging

## Security Note

This is a **development tool only**. Do not expose in production:
- Shows sensitive authentication tokens
- Displays full API responses
- May contain user data
- Could reveal API structure

## Keyboard Shortcuts

- Click log entry: View details
- Clear Logs: Reset console
- Test buttons: Send requests

## Color Coding

- **Orange**: Selected log entry
- **Green**: Successful request
- **Red**: Failed request
- **Blue**: Development feature badge

## JSON Formatting

All JSON is automatically formatted with:
- 2-space indentation
- Syntax highlighting
- Scrollable containers
- Monospace font

## Future Enhancements

Potential additions:
- Export logs to file
- Filter by status/endpoint
- Search in responses
- Request history persistence
- Custom request builder
- Response comparison tool
