# Express Layered Cache API

A production-style REST API built with **Node.js and Express.js** demonstrating layered backend architecture, CRUD operations, TTL-based caching, cache invalidation, and centralized error handling.

---

## 🚀 Features

* RESTful CRUD API
* Layered architecture
* Controller → Service → Database separation
* Custom Express middleware
* In-memory caching using `Map`
* TTL-based cache expiration
* Cache HIT/MISS headers
* Automatic cache refresh after expiration
* Cache invalidation after data mutations
* Async file-based database operations
* Centralized error handling
* Async error handling
* Automatic product ID generation
* PUT and PATCH support

---

## 🏗️ Architecture

```text
Client
  │
  ▼
Route
  │
  ▼
Middleware
  │
  ├── Cache Middleware
  └── Async Handler
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Database
  │
  ▼
db.json
```

### Request Flow

```text
GET /products
      │
      ▼
Cache Middleware
      │
      ├── Cache HIT ───────► Return cached data
      │
      └── Cache MISS
              │
              ▼
          Controller
              │
              ▼
           Service
              │
              ▼
          Database
              │
              ▼
        Fresh Response
              │
              ▼
        Store in Cache
```

---

## 📁 Project Structure

```text
express-layered-cache-api/
│
├── controllers/
│   └── productController.js
│
├── database/
│   ├── db.json
│   └── productDatabase.js
│
├── middleware/
│   ├── asyncHandler.js
│   ├── cacheMiddleware.js
│   └── errorMiddleware.js
│
├── routes/
│   └── productRoutes.js
│
├── services/
│   └── productService.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/products`     | Get all products           |
| GET    | `/products/:id` | Get product by ID          |
| POST   | `/products`     | Create a product           |
| PUT    | `/products/:id` | Replace a product          |
| PATCH  | `/products/:id` | Partially update a product |
| DELETE | `/products/:id` | Delete a product           |

---

## ⚡ Caching

The application uses an in-memory `Map` for caching GET responses.

### Cache TTL

```text
TTL = 60 seconds
```

Every cache entry stores:

```js
{
    data,
    createdAt
}
```

When a request arrives:

```text
Cache exists?
      │
      ├── YES
      │    │
      │    ├── Age < 60 sec → HIT
      │    │
      │    └── Age >= 60 sec → Expired → MISS
      │
      └── NO → MISS
```

---

## 📊 Cache Headers

Every cached GET request returns:

```http
X-Cache: HIT
```

or:

```http
X-Cache: MISS
```

### Example

First request:

```http
GET /products
X-Cache: MISS
```

The data is fetched from the database and stored in cache.

Second request within 60 seconds:

```http
GET /products
X-Cache: HIT
```

After the TTL expires:

```http
GET /products
X-Cache: MISS
```

Fresh data is fetched and the cache is refreshed.

---

## 🔄 Cache Invalidation

Any successful data mutation invalidates the cache:

```text
POST
  │
  ▼
Database updated
  │
  ▼
Cache invalidated
```

The same applies to:

```text
PUT
PATCH
DELETE
```

This prevents stale data from being served after database changes.

---

## 🛡️ Error Handling

Errors are handled centrally using:

```text
Controller
    │
    ▼
asyncHandler
    │
    ▼
next(error)
    │
    ▼
errorMiddleware
    │
    ▼
500 Internal Server Error
```

This avoids repeating `try/catch` blocks in every controller.

---

## 🧠 PUT vs PATCH

### PUT

Replaces the complete resource.

```http
PUT /products/2
```

### PATCH

Updates only the provided fields.

```http
PATCH /products/2
```

For example:

```json
{
    "price": 130000
}
```

Only the price is modified.

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Enter the project

```bash
cd express-layered-cache-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

The server will run on:

```text
http://localhost:3000
```

---

## 🧪 Example Requests

### Get all products

```bash
curl -i http://localhost:3000/products
```

### Get product by ID

```bash
curl -i http://localhost:3000/products/2
```

### Create product

```bash
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name":"Mouse","price":2000}'
```

### Update product

```bash
curl -X PUT http://localhost:3000/products/2 \
-H "Content-Type: application/json" \
-d '{"name":"MacBook Pro","price":130000}'
```

### Partially update product

```bash
curl -X PATCH http://localhost:3000/products/2 \
-H "Content-Type: application/json" \
-d '{"price":120000}'
```

### Delete product

```bash
curl -X DELETE http://localhost:3000/products/2
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* JavaScript
* REST API
* File System (`fs/promises`)
* In-memory caching with `Map`

---

## 🎯 Key Concepts Demonstrated

* Separation of Concerns
* Layered Architecture
* REST API Design
* Express Middleware
* HTTP Methods
* TTL Caching
* Cache Invalidation
* Async/Await
* Promise Error Handling
* File-based Persistence
* PUT vs PATCH
* CRUD Operations

---

## 📚 What I Learned

Building this project helped me understand how a backend request travels through different layers:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Database
```

The project also demonstrates an important backend caching principle:

> Cached data must have an expiration strategy and must be invalidated when the underlying data changes.

---

## 👨‍💻 Author

**Ravi Yadav**

Built as part of backend/Express.js learning and hands-on system design practice.
