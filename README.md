# api-test-starwest

## Description

A REST API for a simple e-commerce checkout flow, built with Node.js and
Express. Consumers can register, login to receive a JWT token, and use that
token to perform a checkout. All data (users, products) lives in memory —
there is no database, so data resets whenever the server restarts.

## Installation

Requirements: Node.js 18+ and npm.

```bash
npm install
```

## How to Run

```bash
npm start
```

The API starts on `http://localhost:3000` by default. You can override the
port with the `PORT` environment variable, and the JWT signing secret with
`JWT_SECRET`.

Interactive API documentation (Swagger UI) is available at:

```
http://localhost:3000/api-docs
```

The raw OpenAPI spec is at [swagger.yaml](swagger.yaml) in the repository
root.

## Rules

- Checkout accepts only two payment methods: `cash` or `credit_card`.
- Paying with `cash` applies a 10% discount to the order subtotal.
- Only authenticated users (holding a valid JWT) can perform a checkout.

## Existing Data

### Users

All seeded users share the password `password123`.

| id | name        | email                      |
|----|-------------|-----------------------------|
| 1  | John Doe    | john.doe@example.com        |
| 2  | Jane Smith  | jane.smith@example.com      |
| 3  | Bob Wilson  | bob.wilson@example.com      |

### Products

| id | name                | price   |
|----|---------------------|---------|
| 1  | Laptop              | 999.99  |
| 2  | Wireless Mouse      | 29.99   |
| 3  | Mechanical Keyboard | 89.99   |

## How to Use the REST API

### Endpoints

| Method | Path                 | Auth required | Description                     |
|--------|----------------------|----------------|----------------------------------|
| GET    | `/api/health`        | No             | Healthcheck                     |
| POST   | `/api/auth/register` | No             | Create a new user                |
| POST   | `/api/auth/login`    | No             | Login and receive a JWT token    |
| POST   | `/api/checkout`      | Yes (Bearer)   | Perform a checkout               |

### 1. Healthcheck

```bash
curl http://localhost:3000/api/health
```

### 2. Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice.johnson@example.com","password":"strongPassword123"}'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"password123"}'
```

Response includes a `token` field — use it as a Bearer token for checkout.

### 4. Checkout

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token from login>" \
  -d '{
        "items": [
          { "productId": 1, "quantity": 1 },
          { "productId": 2, "quantity": 2 }
        ],
        "paymentMethod": "cash"
      }'
```

The response includes the order breakdown (`subtotal`, `discount`, `total`)
based on the chosen payment method.

## Project Structure

```
src/
  config/       # environment/config values
  models/       # in-memory data (users, products)
  services/     # business logic (auth, checkout)
  controllers/  # request/response handling
  middleware/   # JWT auth, error handling
  routes/       # Express route definitions
  app.js        # Express app setup
  server.js     # entry point
swagger.yaml    # OpenAPI spec, served at /api-docs
```
