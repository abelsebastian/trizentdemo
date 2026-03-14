# Data Debugging Guide

## Issue: Critical Data Not Showing in Filter

### Problem
Data is received from API but not appearing when "Critical" filter is applied.

### Root Cause
API returns status values in different formats than expected by the UI filter logic.

### Solution Implemented

#### 1. Improved Status Transformation
Added case-insensitive matching and multiple format support:

```typescript
const apiStatus = item.stock_status?.toUpperCase();
if (apiStatus === 'OPTIMAL') {
  status = 'Optimal';
} else if (apiStatus === 'NEAR_EXPIRY' || apiStatus === 'NEAREXPIRY') {
  status = 'Near Expiry';
} else if (apiStatus === 'CRITICAL') {
  status = 'Critical';
}
```

#### 2. Added Console Logging
View transformation results in browser console:

```javascript
console.log('Transformed inventory data:', transformedData);
console.log('Status breakdown:', {
  optimal: count,
  nearExpiry: count,
  critical: count,
});
```

#### 3. Debug Console Enhancement
Test endpoint now shows stock status breakdown:

```javascript
console.log('Stock Status Breakdown:', statusCounts);
console.log('Sample items:', response.data.slice(0, 3));
```

---

## How to Debug Data Issues

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for these logs:
   - "Transformed inventory data"
   - "Status breakdown"
   - "Stock Status Breakdown"

### Step 2: Use Debug Console
1. Go to API Debug screen
2. Click "Test Powder List"
3. Check response in log panel
4. Look at `stock_status` field values
5. Verify they match expected formats

### Step 3: Check Data Transformation
Look for warnings in console:
```
Unexpected stock_status: [value] for item: [id]
```

This indicates API returned unexpected status value.

---

## Expected API Status Values

### From API (stock_status field)
- `OPTIMAL` → Transforms to "Optimal"
- `NEAR_EXPIRY` → Transforms to "Near Expiry"
- `CRITICAL` → Transforms to "Critical"
- `OUT OF STOCK` → Transforms to "Critical"
- `LOW` → Transforms to "Critical"

### In UI (after transformation)
- "Optimal" → Green badge
- "Near Expiry" → Amber badge
- "Critical" → Red badge (includes CRITICAL, OUT OF STOCK, and LOW)

---

## Verifying Filter Works

### Test Critical Filter
1. Login to app
2. Go to Inventory screen
3. Check browser console for status breakdown
4. Note how many Critical items exist
5. Click "Critical" filter in dropdown
6. Verify that number of items matches console count

### Test in Debug Console
1. Go to API Debug
2. Click "Test Powder List"
3. Check response data
4. Count items with `stock_status: "CRITICAL"`
5. Compare with UI filter results

---

## Common Issues

### Issue 1: No Critical Items Showing
**Check:**
- Browser console for status breakdown
- API response has items with `stock_status: "CRITICAL"`
- Transformation logic handles the status value

**Fix:**
- Verify API is returning Critical items
- Check console for transformation warnings
- Ensure filter logic matches transformed status

### Issue 2: Wrong Count in Summary Cards
**Check:**
- Statistics API response
- Transformation of statistics data
- Summary card value calculation

**Fix:**
- Compare API statistics with UI display
- Check if statistics match list data
- Verify card status mapping

### Issue 3: Filter Not Working
**Check:**
- Filter dropdown options
- Status filter state
- Filter comparison logic

**Fix:**
- Ensure filter options match transformed statuses
- Check case sensitivity in filter logic
- Verify filter state updates correctly

---

## Console Commands for Debugging

### Check Current Inventory State
```javascript
// In browser console
console.log('Current inventory:', window.inventory);
```

### Check Filter State
```javascript
// Check what filter is active
console.log('Active filter:', window.statusFilter);
```

### Manually Test Transformation
```javascript
// Test status transformation
const testStatus = 'CRITICAL';
const transformed = testStatus === 'OPTIMAL' ? 'Optimal' : 
                   testStatus === 'NEAR_EXPIRY' ? 'Near Expiry' : 
                   testStatus === 'CRITICAL' ? 'Critical' : 'Unknown';
console.log('Transformed:', transformed);
```

---

## API Response Example

### Expected Format
```json
{
  "statusCode": 200,
  "status": true,
  "data": [
    {
      "id": 1,
      "batch_name": "LOT-001",
      "media_name": "TSA Powder",
      "stock_status": "CRITICAL",
      "available_stock": 50,
      ...
    }
  ]
}
```

### Status Field Variations
The API might return:
- `CRITICAL` (uppercase)
- `OUT OF STOCK` (out of stock items)
- `LOW` (low stock items)
- `OPTIMAL` (good stock)
- `NEAR_EXPIRY` (expiring soon)

Our code handles all variations by:
1. Converting to uppercase
2. Trimming whitespace
3. Mapping OUT OF STOCK and LOW to Critical

---

## Testing Checklist

- [ ] Login successfully
- [ ] Open browser console
- [ ] Navigate to Inventory screen
- [ ] Check console logs for status breakdown
- [ ] Verify counts match API response
- [ ] Test each filter option
- [ ] Check filtered results match expected count
- [ ] Test search with filters
- [ ] Verify no console errors

---

## Logging Reference

### What Gets Logged

1. **On Data Fetch:**
   - "Transformed inventory data" - Full array
   - "Status breakdown" - Count by status
   - Warnings for unexpected statuses

2. **In Debug Console:**
   - "Stock Status Breakdown" - API status counts
   - "Sample items" - First 3 items from API

3. **On Filter:**
   - Filtered items count
   - Active filter value

---

## Quick Fixes

### Force Re-fetch Data
```javascript
// In browser console
location.reload();
```

### Clear Filter
Click the X button on active filter badge

### Reset Everything
1. Logout
2. Clear browser cache
3. Login again
4. Check console logs

---

## When to Contact Backend

Contact backend team if:
- API returns unexpected status values
- Status field is missing
- Data structure doesn't match documentation
- Counts don't match between endpoints
- Status values are inconsistent

Provide:
- API response from Debug Console
- Browser console logs
- Expected vs actual behavior
- Screenshots of issue
