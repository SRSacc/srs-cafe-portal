# SRS App API Documentation

## Version: 1.0.0
**OAS 3.0**

API documentation for the Subscriber Registration System (SRS)

### **Servers**
- **Local Development Server**: `http://localhost:5000/api`

---

## **Auth - Authentication**

### **POST /auth/login**
- **Description**: Login as any user (manager, receptionist, subscriber)
- **Request**: 
  - **Body**: User credentials (username, password)
- **Response**: 
  - `200`: Successful login
  - `401`: Unauthorized

### **POST /users/change-password**
- **Description**: Change password (Authenticated users only)
- **Request**: 
  - **Body**: Current password, new password
- **Response**: 
  - `200`: Password changed successfully
  - `401`: Unauthorized

---

## **Subscribers - Subscriber Management**

### **POST /users/subscribers**
- **Description**: Create a new subscriber
- **Request**: 
  - **Body**:
    - `name`: Subscriber's name
    - `phone_number`: Subscriber's phone number
    - `referral`: Referral details (optional)
    - `subscription_type`: Subscription type (half-day, full-day, weekly, etc.)
    - `payment_mode`: Payment mode (self or company)
    - **Optional**: Image of the subscriber (multipart/form-data)
- **Response**:
  - `200`: Subscriber created successfully
  - `400`: Validation error (e.g., missing fields)
  - `401`: Unauthorized

### **GET /users/subscribers**
- **Description**: Get all subscribers
- **Request**: 
  - **No parameters**
- **Response**:
  - `200`: List of subscribers
  - `401`: Unauthorized

### **PUT /users/subscribers/{id}**
- **Description**: Update subscriber information
- **Request**:
  - **Body**: Subscriber details (any field to update)
  - **URL Parameter**: `id` (Subscriber ID)
- **Response**:
  - `200`: Subscriber updated successfully
  - `400`: Validation error
  - `401`: Unauthorized

### **DELETE /users/subscribers/{id}**
- **Description**: Delete a subscriber
- **Request**:
  - **URL Parameter**: `id` (Subscriber ID)
- **Response**:
  - `200`: Subscriber deleted successfully
  - `401`: Unauthorized

### **PUT /users/subscribers/{id}/image**
- **Description**: Update subscriber image
- **Request**:
  - **Body**: Image (multipart/form-data)
  - **URL Parameter**: `id` (Subscriber ID)
- **Response**:
  - `200`: Image updated successfully
  - `401`: Unauthorized
  - `400`: Invalid image format

---

## **Receptionists - Receptionist Management**

### **POST /users/receptionists**
- **Description**: Create a new receptionist (Manager only)
- **Request**:
  - **Body**: Receptionist details (name, role, etc.)
- **Response**:
  - `200`: Receptionist created successfully
  - `401`: Unauthorized

### **GET /users/receptionists**
- **Description**: Get all receptionists (Manager only)
- **Request**:
  - **No parameters**
- **Response**:
  - `200`: List of receptionists
  - `401`: Unauthorized

---

## **Response Codes**
- `200`: Success
- `400`: Bad Request (usually due to missing or invalid parameters)
- `401`: Unauthorized (authentication failure)
- `404`: Not Found
- `500`: Internal Server Error

---

## **Authorization**
You can authorize by clicking the "Authorize" button and providing the required credentials (if needed).

---

### Example of `POST /users/subscribers` request:
```json
{
  "name": "John Doe",
  "phone_number": "123-456-7890",
  "referral": "Friend",
  "subscription_type": "full-day",
  "payment_mode": "self"
}
