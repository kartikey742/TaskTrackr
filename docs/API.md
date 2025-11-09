# API Reference — TaskTrackr

Base URL (local): `http://localhost:5000`

## Authentication

### Register
- Method: POST
- Endpoint: `/api/auth/register`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- Success response: 201 Created
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Login
- Method: POST
- Endpoint: `/api/auth/login`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Success response: 200 OK
```json
{
  "success": true,
  "token": "<jwt-token>",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

> Note: Save the value of `token` and set the Authorization header for protected requests: `Authorization: Bearer <token>`

---

## Tasks
All task endpoints require `Authorization: Bearer <token>` header.

### Get All Tasks
- Method: GET
- Endpoint: `/api/tasks/get-all`
- Response: 200 OK
```json
{
  "success": true,
  "tasks": [
    { "_id": "...", "title": "...", "description": "...", "status": false, "userId": "..." }
  ]
}
```

### Create Task
- Method: POST
- Endpoint: `/api/tasks/create`
- Headers: `Content-Type: application/json`, `Authorization`
- Body:
```json
{
  "title": "Finish assignment",
  "description": "Complete the frontend task"
}
```
- Success response: 201 Created
```json
{ "success": true, "task": { ... } }
```

### Update Task
- Method: PUT
- Endpoint: `/api/tasks/update/:id`
- Headers: `Content-Type: application/json`, `Authorization`
- Body: (any updatable fields)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```
- Success response: 200 OK
```json
{ "success": true, "task": { ... } }
```

### Update Task Status (toggle)
- Method: PUT
- Endpoint: `/api/tasks/statusUpdate/:id`
- Headers: `Authorization`
- Body: none
- Success response: 200 OK
```json
{ "success": true, "task": { "_id": "...", "status": true } }
```

### Delete Task
- Method: DELETE
- Endpoint: `/api/tasks/delete/:id`
- Headers: `Authorization`
- Success response: 200 OK
```json
{ "success": true, "message": "Task deleted" }
```

---

## Error Responses
Common error format used by the API:
```json
{ "success": false, "message": "Detailed error message" }
```

- 400 Bad Request: Validation failed (missing fields, invalid data)
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: When trying to modify another user's resource
- 404 Not Found: Resource not found
- 500 Internal Server Error: Unexpected server error

---

## Postman Collection
A Postman collection is included at `backend/postman_collection.json`.

### Quick Postman tips
1. Import the collection file into Postman.
2. Set the collection variable `baseUrl` to `http://localhost:5000`.
3. Use the `Login` request to obtain the JWT token; copy it into the collection variable `token` (or set it in the environment) as `Bearer <token>` (the collection uses `Bearer {{token}}`).

---

## Notes
- Replace `:id` in path examples with the actual task ID returned from `create` or `get-all`.
- Ensure `Authorization` header is present for all task endpoints.
