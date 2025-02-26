# API Requirements for Online Raithu Bazaar

This document outlines the API requirements necessary to implement the next development phases of the Online Raithu Bazaar application. The APIs are categorized based on the feature sets required.

## Authentication APIs

> **Note**: Basic authentication APIs are already implemented:
> - Login: `https://api.letsfindaway.online/auth/log-in`
> - Signup: `https://api.letsfindaway.online/auth/sign-up`

### Enhanced Authentication

#### Login (Updated)
- **Endpoint**: `/auth/log-in`
- **Method**: POST
- **Input**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string",
    "expiresIn": "number",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string", // "farmer" or "consumer"
      "profileCompleted": "boolean"
    }
  }
  ```

#### Signup (Updated)
- **Endpoint**: `/auth/sign-up`
- **Method**: POST
- **Input**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "role": "string" // "farmer" or "consumer"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string",
    "expiresIn": "number",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string", // "farmer" or "consumer"
      "profileCompleted": "boolean"
    }
  }
  ```

#### Logout
- **Endpoint**: `/auth/logout`
- **Method**: POST
- **Input**: None required
- **Response**:
  ```json
  {
    "success": true,
    "message": "Successfully logged out"
  }
  ```

#### Get Current User
- **Endpoint**: `/users/me`
- **Method**: GET
- **Response**:
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string", // "farmer" or "consumer"
    "profileCompleted": "boolean",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

#### Update User Role
- **Endpoint**: `/users/me/role`
- **Method**: PUT
- **Input**:
  ```json
  {
    "role": "string" // "farmer" or "consumer"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "updatedAt": "timestamp"
  }
  ```

## Farmer Profile APIs

### Create/Update Farmer Profile
- **Endpoint**: `/farmers/profile`
- **Method**: POST/PUT
- **Input**:
  ```json
  {
    "farmerName": "string",
    "farmName": "string",
    "location": {
      "village": "string",
      "district": "string",
      "state": "string",
      "pincode": "string"
    },
    "contactNumber": "string",
    "profilePicture": "file/base64string",
    "description": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "farmerName": "string",
    "farmName": "string",
    "location": {
      "village": "string",
      "district": "string",
      "state": "string",
      "pincode": "string"
    },
    "contactNumber": "string",
    "profilePictureUrl": "string",
    "description": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Get Farmer Profile
- **Endpoint**: `/farmers/profile/:id`
- **Method**: GET
- **Response**:
  ```json
  {
    "id": "string",
    "farmerName": "string",
    "farmName": "string",
    "location": {
      "village": "string",
      "district": "string", 
      "state": "string",
      "pincode": "string"
    },
    "contactNumber": "string",
    "profilePictureUrl": "string",
    "description": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",
    "products": [
      {
        "id": "string",
        "name": "string",
        "thumbnail": "string",
        "price": "number"
      }
    ]
  }
  ```

### Get Current Farmer Profile
- **Endpoint**: `/farmers/profile/me`
- **Method**: GET
- **Response**: Same as Get Farmer Profile

## Product Management APIs

### Create Product
- **Endpoint**: `/products`
- **Method**: POST
- **Input**:
  ```json
  {
    "name": {
      "english": "string",
      "telugu": "string"
    },
    "description": {
      "english": "string",
      "telugu": "string"
    },
    "category": "string",
    "price": "number",
    "unit": "string",
    "quantity": "number",
    "images": ["file/base64string"],
    "harvestedDate": "date",
    "availableFrom": "date",
    "availableTo": "date"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "farmerId": "string",
    "name": {
      "english": "string",
      "telugu": "string"
    },
    "description": {
      "english": "string",
      "telugu": "string"
    },
    "category": "string",
    "price": "number",
    "unit": "string",
    "quantity": "number",
    "imageUrls": ["string"],
    "harvestedDate": "date",
    "availableFrom": "date",
    "availableTo": "date",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Update Product
- **Endpoint**: `/products/:id`
- **Method**: PUT
- **Input**: Same as Create Product
- **Response**: Same as Create Product response

### Delete Product
- **Endpoint**: `/products/:id`
- **Method**: DELETE
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully"
  }
  ```

### Get Product
- **Endpoint**: `/products/:id`
- **Method**: GET
- **Response**:
  ```json
  {
    "id": "string",
    "name": {
      "english": "string",
      "telugu": "string"
    },
    "description": {
      "english": "string",
      "telugu": "string"
    },
    "category": "string",
    "price": "number",
    "unit": "string",
    "quantity": "number",
    "imageUrls": ["string"],
    "harvestedDate": "date",
    "availableFrom": "date",
    "availableTo": "date",
    "farmer": {
      "id": "string",
      "farmerName": "string",
      "farmName": "string",
      "location": {
        "village": "string",
        "district": "string"
      },
      "profilePictureUrl": "string"
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### List Farmer Products
- **Endpoint**: `/farmers/:id/products`
- **Method**: GET
- **Query Parameters**:
  - `page`: number
  - `limit`: number
  - `sortBy`: string (price, date, etc.)
  - `order`: string (asc, desc)
- **Response**:
  ```json
  {
    "products": [
      {
        "id": "string",
        "name": {
          "english": "string",
          "telugu": "string"
        },
        "price": "number",
        "unit": "string",
        "quantity": "number",
        "thumbnailUrl": "string",
        "availableFrom": "date",
        "availableTo": "date"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
  ```

### List My Products
- **Endpoint**: `/farmers/me/products`
- **Method**: GET
- **Query Parameters**: Same as List Farmer Products
- **Response**: Same as List Farmer Products

## Consumer Interface APIs

### List Products
- **Endpoint**: `/products`
- **Method**: GET
- **Query Parameters**:
  - `page`: number
  - `limit`: number
  - `category`: string
  - `minPrice`: number
  - `maxPrice`: number
  - `sortBy`: string (price, date)
  - `order`: string (asc, desc)
  - `farmerLocation`: string (village, district)
- **Response**:
  ```json
  {
    "products": [
      {
        "id": "string",
        "name": {
          "english": "string",
          "telugu": "string"
        },
        "price": "number",
        "unit": "string",
        "thumbnailUrl": "string",
        "farmer": {
          "id": "string",
          "farmerName": "string",
          "farmName": "string", 
          "location": {
            "village": "string"
          }
        }
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
  ```

### Search Products
- **Endpoint**: `/products/search`
- **Method**: GET
- **Query Parameters**:
  - `query`: string
  - `page`: number
  - `limit`: number
  - `filter`: string (farmer, location, product)
  - `language`: string (english, telugu, both)
- **Response**: Same as List Products

### Get Categories
- **Endpoint**: `/categories`
- **Method**: GET
- **Response**:
  ```json
  {
    "categories": [
      {
        "id": "string",
        "name": {
          "english": "string",
          "telugu": "string"
        },
        "imageUrl": "string"
      }
    ]
  }
  ```

## Order Management APIs

### Create Order
- **Endpoint**: `/orders`
- **Method**: POST
- **Input**:
  ```json
  {
    "items": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "deliveryAddress": {
      "addressLine1": "string",
      "addressLine2": "string",
      "village": "string",
      "district": "string",
      "state": "string",
      "pincode": "string"
    },
    "contactNumber": "string",
    "paymentMethod": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "orderNumber": "string",
    "items": [
      {
        "productId": "string",
        "productName": {
          "english": "string",
          "telugu": "string"
        },
        "quantity": "number",
        "unitPrice": "number",
        "totalPrice": "number"
      }
    ],
    "subtotal": "number",
    "deliveryFee": "number",
    "totalAmount": "number",
    "status": "string",
    "deliveryAddress": {
      "addressLine1": "string",
      "addressLine2": "string",
      "village": "string",
      "district": "string",
      "state": "string",
      "pincode": "string"
    },
    "contactNumber": "string",
    "paymentMethod": "string",
    "paymentStatus": "string",
    "createdAt": "timestamp"
  }
  ```

### Get Order
- **Endpoint**: `/orders/:id`
- **Method**: GET
- **Response**: Same as Create Order response

### List My Orders (Consumer)
- **Endpoint**: `/orders/my-orders`
- **Method**: GET
- **Query Parameters**:
  - `page`: number
  - `limit`: number
  - `status`: string
- **Response**:
  ```json
  {
    "orders": [
      {
        "id": "string",
        "orderNumber": "string",
        "totalAmount": "number",
        "status": "string",
        "items": [
          {
            "productName": {
              "english": "string",
              "telugu": "string"
            },
            "quantity": "number"
          }
        ],
        "createdAt": "timestamp"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
  ```

### List Farmer Orders
- **Endpoint**: `/farmers/me/orders`
- **Method**: GET
- **Query Parameters**: Same as List My Orders
- **Response**:
  ```json
  {
    "orders": [
      {
        "id": "string",
        "orderNumber": "string",
        "buyerName": "string",
        "totalAmount": "number",
        "status": "string",
        "items": [
          {
            "productId": "string",
            "productName": {
              "english": "string", 
              "telugu": "string"
            },
            "quantity": "number",
            "unitPrice": "number",
            "totalPrice": "number"
          }
        ],
        "createdAt": "timestamp"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
  ```

### Update Order Status (Farmer)
- **Endpoint**: `/orders/:id/status`
- **Method**: PUT
- **Input**:
  ```json
  {
    "status": "string" 
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "status": "string",
    "updatedAt": "timestamp"
  }
  ```

## Analytics APIs (Farmer Dashboard)

### Get Sales Overview
- **Endpoint**: `/farmers/me/analytics/sales`
- **Method**: GET
- **Query Parameters**:
  - `period`: string (daily, weekly, monthly, yearly)
  - `startDate`: date
  - `endDate`: date
- **Response**:
  ```json
  {
    "totalSales": "number",
    "totalOrders": "number",
    "averageOrderValue": "number",
    "salesByPeriod": [
      {
        "period": "string",
        "sales": "number",
        "orders": "number"
      }
    ],
    "topSellingProducts": [
      {
        "id": "string",
        "name": {
          "english": "string",
          "telugu": "string"
        },
        "quantity": "number",
        "totalSales": "number"
      }
    ]
  }
  ```

## Multilingual Support APIs

### Get Translations
- **Endpoint**: `/translations`
- **Method**: GET
- **Query Parameters**:
  - `language`: string (english, telugu)
  - `section`: string (optional, to get specific section)
- **Response**:
  ```json
  {
    "translations": {
      "common": {
        "search": "string",
        "filter": "string"
      },
      "product": {
        "price": "string",
        "quantity": "string"
      }
    }
  }
  ```

## User Preference APIs

### Set Language Preference
- **Endpoint**: `/users/me/preferences/language`
- **Method**: PUT
- **Input**:
  ```json
  {
    "language": "string", // "english", "telugu", "both"
    "productNamesDisplay": "string" // "telugu_only", "english_only", "both"
  }
  ```
- **Response**:
  ```json
  {
    "preferences": {
      "language": "string",
      "productNamesDisplay": "string"
    }
  }
  ```

### Get User Preferences
- **Endpoint**: `/users/me/preferences`
- **Method**: GET
- **Response**:
  ```json
  {
    "preferences": {
      "language": "string",
      "productNamesDisplay": "string",
      "notifications": {
        "orderUpdates": "boolean",
        "newProducts": "boolean"
      }
    }
  }
  ```

## Error Handling

All API responses should include appropriate HTTP status codes and error messages:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Authentication Requirements

All APIs except public endpoints should require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Role-Based Access Control

The application implements role-based access control with the following permissions:

1. **Farmer Role**:
   - Full access to their own farmer profile
   - Full access to create, update, and delete their own products
   - Access to view their orders and update order status
   - Access to their sales analytics

2. **Consumer Role**:
   - Access to browse all products
   - Access to search for products and farmers
   - Access to place orders
   - Access to view their own order history

3. **Public (Unauthenticated)**:
   - Access to browse products
   - Access to search for products and farmers
   - Access to view product details
   - Access to authentication endpoints

Each API endpoint should validate the user's role before processing the request, returning a 403 Forbidden error if the user doesn't have the required permissions.

## API Versioning

All endpoints should be prefixed with API version:

```
/api/v1/products
```

## Offline Support Requirements

For offline support, the API should implement:

1. **ETags** for efficient caching
2. **Last-Modified** headers for data synchronization
3. **Batch processing** endpoints for syncing multiple records at once after reconnection:

### Sync Data
- **Endpoint**: `/sync`
- **Method**: POST
- **Input**:
  ```json
  {
    "lastSyncTimestamp": "timestamp",
    "entities": ["products", "orders"],
    "offlineActions": [
      {
        "entity": "string",
        "action": "string",
        "data": "object",
        "timestamp": "timestamp"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "syncTimestamp": "timestamp",
    "updatedEntities": {
      "products": ["object"],
      "orders": ["object"]
    },
    "conflicts": [
      {
        "entity": "string",
        "id": "string",
        "serverData": "object",
        "clientData": "object"
      }
    ]
  }
  ``` 