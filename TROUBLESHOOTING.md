# Troubleshooting Guide

## Common Issues and Solutions

### 1. Session Timeout (408 Error)

**Error Message:**
```json
{
  "statusCode": 408,
  "status": false,
  "message": "Session Timeout"
}
```

**Cause:** You're not logged in or your session has expired.

**Solution:**
1. Go to API Debug Console
2. Click "Test Login" button
3. Wait for success message
4. Check Auth Info panel shows tokens
5. Try your request again

---

### 2. Unauthorized (401 Error)

**Error Message:**
```json
{
  "statusCode": 401,
  "status": false,
  "message": "Unauthorized"
}
```

**Cause:** Invalid or missing authentication tokens.

**Solution:**
1. Clear localStorage
2. Logout and login again
3. Verify tokens in Debug Console
4. Check x-auth-token and x-userid are set

---

### 3. Network Error / Unable to Connect

**Error Message:**
```
Unable to connect to server
```

**Cause:** API server is unreachable or CORS issue.

**Solution:**
1. Check internet connection
2. Verify API base URL: `https://api.empats-dev.alpha-03.trizentinc.com`
3. Check browser console for CORS errors
4. Try accessing API URL directly in browser
5. Contact backend team if server is down

---

### 4. Data Not Loading in Inventory

**Symptoms:** Empty table, no statistics showing

**Cause:** API call failed or returned empty data.

**Solution:**
1. Open Debug Console
2. Test Statistics endpoint
3. Test Powder List endpoint
4. Check response data structure
5. Verify API is returning data
6. Check browser console for errors

---

### 5. Auto-Logout Not Working

**Symptoms:** Session doesn't expire after 20 minutes

**Cause:** Timer not set or page was refreshed.

**Solution:**
1. Check localStorage for `auto_logout_minutes`
2. Check `login_time` timestamp
3. Logout and login again
4. Timer resets on page refresh

---

### 6. User Name Not Showing in Header

**Symptoms:** Header shows "User" instead of actual username

**Cause:** User ID not stored during login.

**Solution:**
1. Check Debug Console Auth Info
2. Verify `user_id` in localStorage
3. Logout and login again
4. Check login API response

---

### 7. Session Timer Shows Wrong Time

**Symptoms:** Countdown doesn't match expected time

**Cause:** Login time not stored or incorrect calculation.

**Solution:**
1. Check `login_time` in localStorage
2. Check `auto_logout_minutes` value
3. Logout and login again
4. Verify timer updates every second

---

## Debug Console Workflow

### Step-by-Step Debugging

1. **Open Debug Console**
   - Click "API Debug" in sidebar
   - Check Auth Info panel

2. **Test Login**
   - Click "Test Login" (uses Abel234 / Test@1234)
   - Wait for success alert
   - Verify tokens appear in Auth Info

3. **Test Statistics**
   - Click "Test Statistics"
   - Check response in log
   - Verify data structure

4. **Test Powder List**
   - Click "Test Powder List"
   - Check response data
   - Verify items array exists

5. **Review Errors**
   - Click failed log entries
   - Read error messages
   - Check status codes

---

## API Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Data received successfully |
| 401 | Unauthorized | Login required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Endpoint doesn't exist |
| 408 | Timeout | Session expired, login again |
| 422 | Validation Error | Check request parameters |
| 500 | Server Error | Contact backend team |

---

## Checking Authentication

### In Debug Console

1. Look at Auth Info panel
2. Check all fields have values (not "Not set")
3. Verify token format (should be long string)
4. Check user_id matches login

### In Browser DevTools

1. Open DevTools (F12)
2. Go to Application tab
3. Click Local Storage
4. Check for these keys:
   - x-auth-token
   - x-userid
   - user_id
   - login_time
   - auto_logout_minutes

---

## Testing API Manually

### Using Browser DevTools Console

```javascript
// Check stored tokens
console.log('Token:', localStorage.getItem('x-auth-token'));
console.log('User ID:', localStorage.getItem('x-userid'));

// Test API call
fetch('https://api.empats-dev.alpha-03.trizentinc.com/media_powder/statistics', {
  headers: {
    'x-auth-token': localStorage.getItem('x-auth-token'),
    'x-userid': localStorage.getItem('x-userid')
  }
})
.then(r => r.json())
.then(console.log);
```

---

## Common Mistakes

### 1. Testing Without Login
❌ **Wrong:** Click "Test Statistics" first
✅ **Right:** Click "Test Login" first, then test other endpoints

### 2. Ignoring Error Messages
❌ **Wrong:** Keep clicking test buttons when getting errors
✅ **Right:** Read error messages and fix authentication first

### 3. Not Checking Auth Info
❌ **Wrong:** Assume you're logged in
✅ **Right:** Always check Auth Info panel shows tokens

### 4. Testing After Session Expires
❌ **Wrong:** Continue testing after 20 minutes
✅ **Right:** Login again when session expires

---

## Getting Help

### Information to Provide

When reporting issues, include:

1. **Error Message:** Full error from Debug Console
2. **Request Details:** Endpoint, method, parameters
3. **Response:** Full JSON response
4. **Auth Status:** Screenshot of Auth Info panel
5. **Browser Console:** Any errors in DevTools
6. **Steps to Reproduce:** What you did before error

### Where to Look

1. **Debug Console:** API request/response details
2. **Browser Console:** JavaScript errors
3. **Network Tab:** HTTP request details
4. **Application Tab:** localStorage values

---

## Quick Fixes

### Reset Everything
```javascript
// Clear all stored data
localStorage.clear();
// Refresh page
location.reload();
// Login again
```

### Force Re-login
1. Click logout button (power icon)
2. Login with credentials
3. Test endpoints again

### Clear Specific Token
```javascript
// Remove just the auth token
localStorage.removeItem('x-auth-token');
localStorage.removeItem('x-userid');
// Login again
```

---

## Prevention Tips

1. **Always login first** before testing endpoints
2. **Check Auth Info** before each test
3. **Monitor session timer** in header
4. **Use Debug Console** to verify responses
5. **Read error messages** carefully
6. **Test one endpoint** at a time
7. **Clear logs** between test sessions
8. **Logout properly** when done testing

---

## Still Having Issues?

1. Check this guide again
2. Use Debug Console to test
3. Review browser console errors
4. Check API documentation
5. Contact development team
6. Provide debug logs and screenshots
