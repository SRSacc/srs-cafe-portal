# Viewing the Admin Dashboard Without Backend

This document explains how to view and work with the `/admin1/dashboard` page without a backend connection.

## How It Works

The application now includes mock data functionality that allows you to view and interact with the admin dashboard without connecting to the backend API.

### Automatic Mock Mode

When running in **development mode** (via `npm run dev`) and navigating to `/admin1/dashboard` without a valid authentication token, the application automatically:

1. Sets a `mock-token` in localStorage (development only)
2. Returns mock user data (`demo-admin` with role `Admin1`)
3. Returns mock subscriber data (12 sample subscribers with various statuses)

**Security Note**: Mock mode only activates in development mode. In production builds, the app will always require real authentication.

### Mock Data Includes

- **12 Mock Subscribers** with realistic data:
  - 7 Active subscribers
  - 3 Expiring subscribers
  - 2 Expired subscribers
  - Mix of SRS Workers and Regular subscribers
  - Various subscription types (Daily, Weekly, Monthly, etc.)

- **Mock User**: `demo-admin (Admin1)`

### Features Available in Mock Mode

✅ View dashboard with subscriber cards
✅ See statistics (Active, Expiring, Expired, New)
✅ Filter by status (All, Active, Expiring, Expired)
✅ Search subscribers by name
✅ Filter by subscription type
✅ View subscriber details (click on card)
✅ Edit subscriber information (simulated - changes won't persist)
✅ Delete subscribers (simulated - changes won't persist)

## Usage

### Development Server

Simply start the development server and navigate to the dashboard:

```bash
npm run dev
```

Then open: `http://localhost:5173/admin1/dashboard`

The page will automatically load with mock data.

### Switching Between Mock and Real Backend

To use the real backend:
1. Log in through the normal authentication flow
2. The app will replace the `mock-token` with a real token
3. All subsequent API calls will use the real backend

To return to mock mode:
1. Clear localStorage (or just remove the token)
2. Refresh the page
3. The app will automatically enter mock mode

## Files Modified

- `src/api/auth.js` - Uses shared utility for mock data support
- `src/api/subscriber.js` - Uses shared utility for mock data support
- `src/layouts/Admin1Layout.jsx` - Uses shared utility to set mock token in dev mode
- `src/mocks/subscriberData.js` - Contains all mock data
- `src/utils/mockMode.js` - **NEW** Shared utility for mock mode detection with security checks

## Notes

- Mock mode **only works in development** (`npm run dev`). Production builds will never use mock data.
- Mock data operations (edit, delete) will appear to succeed but won't actually modify the data
- Refreshing the page will reset all changes
- This is intended for development and UI testing only
