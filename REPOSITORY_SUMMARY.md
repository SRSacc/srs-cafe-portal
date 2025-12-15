# SRS Café Portal - Repository Summary

## 📋 Project Overview

**SRS Café Portal** is a React-based web application for managing a café workspace/coworking space subscription system. It provides functionality for managing subscribers, subscriptions, work hours, and notifications.

## 🏗️ Technical Stack

- **Framework**: React 19.0.0
- **Build Tool**: Vite 6.3.5
- **Styling**: TailwindCSS 3.4.17
- **Routing**: React Router DOM 7.6.0
- **Forms**: React Hook Form 7.55.0 + Yup 1.6.1
- **HTTP Client**: Axios 1.8.4
- **Date Handling**: Day.js 1.11.13
- **Icons**: Lucide React 0.485.0, React Icons 5.5.0
- **Image Processing**: Browser Image Compression 2.0.2

## 📁 Project Structure

```
/home/runner/work/srs-cafe-portal/srs-cafe-portal/
├── public/                    # Static assets
│   ├── SRSLogoWhite.svg      # Main logo
│   └── vite.svg              
├── src/
│   ├── api/                   # API integration layer
│   │   ├── API.md            # API documentation
│   │   ├── auth.js           # Authentication APIs
│   │   ├── notification.js   # Notification APIs
│   │   └── subscriber.js     # Subscriber management APIs
│   ├── assets/               # Images and media
│   │   ├── Ambassador.png
│   │   ├── SRSLogoWhite.svg
│   │   └── avatar.png
│   ├── components/           # Reusable components
│   │   ├── SubscriptionStatus.jsx
│   │   ├── auth/            # Auth-related components
│   │   └── common/          # Common UI components
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── NotificationContext.jsx  # Notifications state
│   ├── layouts/             # Layout components
│   │   ├── Admin1Layout.jsx # Receptionist layout
│   │   ├── Admin2Layout.jsx # Manager layout
│   │   └── WorkerLayout.jsx # Worker layout
│   ├── pages/               # Page components
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AuthPage.jsx     # Login page
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx  # Public landing page
│   │   ├── Notifications.jsx
│   │   ├── Pricing.jsx
│   │   ├── RegisterSubscriber.jsx
│   │   ├── Subscribers.jsx  # Subscriber management
│   │   ├── Subscription.jsx
│   │   ├── WorkHours.jsx
│   │   └── WorkersDashboard.jsx
│   ├── utils/               # Utility functions
│   │   ├── imageCompression.js
│   │   └── subscriptionUtils.js  # Subscription logic
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── .gitignore
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies
├── postcss.config.js        # PostCSS config
├── tailwind.config.js       # Tailwind config
└── vite.config.js           # Vite config
```

## 🎯 Key Features

### 1. **User Roles & Authentication**
- Three user roles:
  - **Admin1 (Receptionist)**: Register subscribers, view dashboard, manage notifications
  - **Admin2 (Manager)**: System management, database, users, notifications
  - **Worker (SRS Worker)**: View work hours, manage subscription, notifications

### 2. **Subscription Management**
- Multiple subscription types:
  - Half-day (morning): Ends at 18:00 same day
  - Half-day (night): Ends at 06:30 next day
  - Full day: Ends at 06:30 next day
  - Weekly plans (day-only/full-access): 7 days
  - Bi-weekly plans: 14 days
  - Monthly plans: 1 month - 1 day
  
- Subscription statuses:
  - **Pending**: Current time before start time
  - **Active**: Between start and expiration
  - **Expiring**: Within 60 minutes of expiration
  - **Expired**: After expiration date

### 3. **Subscriber Types**
- Regular Subscriber
- SRS Worker (with payment mode options)

### 4. **Time-Based Validation**
- Morning shift subscriptions cannot be registered after 18:00
- Night shift subscriptions must start after 18:00
- Automatic calculation of end times and expiration dates

### 5. **Image Handling**
- Image compression for subscriber photos
- Preview functionality before upload

### 6. **Public Pages**
- Landing page with animations
- About page
- Contact page
- Pricing page

## 🔌 API Integration

**Base API URL**: `https://srsapp-api.onrender.com/api`

### Authentication
- `POST /auth/login` - User login
- `GET /users/me` - Get current user data

### Subscribers
- `GET /users/subscribers?page={page}&limit={limit}` - Get all subscribers (paginated)
- `POST /users/subscribers` - Register new subscriber
- `PUT /users/subscribers/{id}` - Update subscriber
- `DELETE /users/subscribers/{id}` - Delete subscriber

## 🎨 UI/UX Features

- **Dark Theme**: Black background with glassmorphism effects
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Animations**: 
  - Fade-in-up animations
  - Float animations
  - Pulse effects
  - Glass morphism effects
- **Toast Notifications**: For user feedback
- **Loading States**: Spinner components for async operations
- **Modal Dialogs**: For edit, delete, and detail views

## 🔍 Current Status

### ✅ Working
- Build process: **Successfully builds** (410.73 kB JS bundle)
- Dependencies: **All installed** (274 packages)
- Application structure: **Well organized**
- API integration: **Configured**

### ⚠️ Issues Found (Linting)

**Total: 12 problems (9 errors, 3 warnings)**

1. **AuthContext.jsx** (Line 18)
   - Unused variable: `error`
   - Warning: Fast refresh export issue

2. **NotificationContext.jsx**
   - Warning: Fast refresh export issue

3. **Admin1Layout.jsx** (Line 24)
   - Unused variable: `isLoading`

4. **AuthPage.jsx** (Line 15)
   - Unused variable: `userRole`

5. **Contact.jsx** (Line 2)
   - Unused import: `useNavigate`

6. **Dashboard.jsx** (Lines 1, 6)
   - Unused import: `useEffect`
   - Unused variable: `setStats`

7. **Notifications.jsx** (Line 21)
   - Missing dependency in useEffect: `markAllAsRead`

8. **Pricing.jsx** (Line 169)
   - Unused variable: `idx`

9. **Subscribers.jsx** (Line 31)
   - Unused variable: `error`

10. **subscriptionUtils.js** (Line 155)
    - Unused variable: `error`

## 🔒 Security Considerations

- Token-based authentication (JWT)
- Tokens stored in localStorage
- Authorization headers on API requests
- Protected routes based on user roles

## 📊 Performance Metrics

- **Bundle Size**: 410.73 kB (gzipped: 124.40 kB)
- **CSS Size**: 44.35 kB (gzipped: 7.18 kB)
- **Build Time**: ~3.75 seconds
- **Dependencies**: 274 packages

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server with host access
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 📝 Configuration Files

- **ESLint**: Configured for React with hooks and refresh plugins
- **Tailwind**: Custom configuration with animations
- **Vite**: React SWC plugin for fast refresh
- **PostCSS**: Tailwind and autoprefixer

## 🔄 State Management

- **Context API** for global state:
  - AuthContext: User authentication state
  - NotificationContext: Notifications state
- **Local State**: Component-level state with useState
- **LocalStorage**: Token and user data persistence

## 📱 Responsive Breakpoints

Following Tailwind's default breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Next Steps Recommendations

1. **Fix Linting Issues**: Address all 12 linting problems
2. **Add Tests**: No test infrastructure currently exists
3. **Security Audit**: Run npm audit (8 vulnerabilities detected)
4. **Update Browserslist**: Data is 10 months old
5. **Add Error Boundaries**: For better error handling
6. **Add Loading Skeletons**: Improve perceived performance
7. **Optimize Images**: Implement lazy loading
8. **Add Service Worker**: For offline capabilities

## 📄 License

Internal use only - Confidential and proprietary
Copyright © SRS. All Rights Reserved.
