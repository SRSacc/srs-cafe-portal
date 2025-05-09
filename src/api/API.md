# Subscription API Documentation
## Subscriber Object Structure
```javascript
{
  "subscriberDetails": {
    "name": "string",
    "phoneNumber": "string",
    "referral": "string",
    "subscriptionType": "string",
    "subscriberType": "string", // "Regular Subscriber" or "SRS Worker"
    "paymentMode": "string",
    "status": "string", // "active", "expired", "expiring", "pending"
    
    // New Required Fields
    "startDateTime": "YYYY-MM-DDTHH:mm:ss.SSSZ", // ISO 8601 format
    "endDateTime": "YYYY-MM-DDTHH:mm:ss.SSSZ",   // Daily access end time
    "expirationDate": "YYYY-MM-DDTHH:mm:ss.SSSZ" // Subscription expiry
  }
}
 ```

## Subscription Types

```
```javascript
{
  "HALF_DAY_MORNING": "Half-day (morning)",
  "HALF_DAY_NIGHT": "Half-day (night)",
  "FULL_DAY": "Full day",
  "WEEKLY_DAY": "Weekly (day-only)",
  "WEEKLY_FULL": "Weekly (full-access)",
  "BIWEEKLY_DAY": "Bi-weekly (day-only)",
  "BIWEEKLY_FULL": "Bi-weekly (full-access)",
  "MONTHLY_DAY": "Monthly (day-only)",
  "MONTHLY_FULL": "Monthly (full-access)"
}
```
## Time Configuration
``` javascript 
{
  "DAY_END": "18:00",     // 6:00 PM
  "NIGHT_END": "06:30",   // 6:30 AM next day
  "NOTIFICATION_BEFORE": 60 // minutes before expiry
}
```
## Date Calculation Rules
### Daily End Time Calculation
- Day-only access types (including morning): Ends at 18:00 (6:00 PM) same day
- Night/Full access types: Ends at 06:30 (6:30 AM) next day
### Expiration Date Calculation
1. Half-day Morning: Same day at 18:00
2. Half-day Night/Full Day: Next day at 06:30
3. Weekly Plans: Start date + 7 days
4. Bi-weekly Plans: Start date + 14 days
5. Monthly Plans: Start date + 1 month - 1 day
### Subscription Status Rules
- Pending : Current time is before start time
- Active : Current time is between start and expiration
- Expiring : Within 60 minutes of expiration
- Expired : Current time is after expiration
### Validation Rules
1. Morning shift subscriptions cannot be registered after 18:00
2. Night shift subscriptions must start after 18:00

# API Endpoints Documentation
## 1. Register Subscriber
## 1. Register Subscriber
```plaintext
POST /api/users/subscribers
 ```

### Request Body
```javascript
{
  "name": "string",
  "phoneNumber": "string",
  "referral": "string",
  "subscriptionType": "Half-day (morning)", // Must match SUBSCRIPTION_TYPES
  "subscriberType": "Regular Subscriber",
  "paymentMode": "Self",
  "dateOfSubscription": "2024-01-20T14:30:00.000Z"
}
```

### Backend Processing
``` javascript

const processSubscription = (subscriptionData) => {
    const startDateTime = dayjs(subscriptionData.    dateOfSubscription);        
    // Calculate end and expiration times    
    const endDateTime = calculateEndTime    (startDateTime, subscriptionData.subscriptionType);
    const expirationDate =     calculateExpirationDate    (startDateTime,subscriptionData.subscriptionType);

    return {
        ...subscriptionData,
        startDateTime:         startDateTime.toISOString(),
        endDateTime: dayjs(endDateTime).toISOString(),
        expirationDate: expirationDate.toISOString(),
        status: 'active'    
    };
};
```

### Response
```javascript
{
    "success": true,
    "data": {
        "subscriberDetails": {
            "name": "string",
            "phoneNumber": "string",
            "referral": "string",
            "subscriptionType": "Half-day (morning)",
            "subscriberType": "Regular Subscriber",
            "paymentMode": "Self",
            "startDateTime": "2024-01-20T14:30:00.000Z",
            "endDateTime": "2024-01-20T18:00:00.000Z",
            "expirationDate": "2024-02-20T18:00:00.000Z",
            "status": "active"
        }
    }
}
 ```

## 2. Update Subscriber
```plaintext
PUT /api/users/subscribers/:id
```
### Request Body
```javascript
{
    "subscriptionType": "Weekly (full-access)",
    "dateOfSubscription": "2024-01-20T14:30:00.000Z"
    // other fields...
}
 ```

### Backend Validation
```javascript
const validateSubscription = (subscriptionData) => {
    const { isValid, message } = validateSubscriptionTiming(
        subscriptionData.subscriptionType,
        dayjs(subscriptionData.dateOfSubscription)
    );

    if (!isValid) {
        throw new Error(message);
    }
};
 ```

## 3. Get Subscriber Status
```plaintext
GET /api/users/subscribers/:id/status
 ```

### Response
```javascript
{
    "success": true,
    "data": {
        "status": "active" | "expired" | "expiring" | "pending",
        "message": "string",
        "endTime": "2024-01-20T18:00:00.000Z", // Only for active status
        "urgent": boolean // Only for expiring status within 15 minutes
    }
}
 ```
