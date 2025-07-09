# JSONPlaceholder API Integration

This document provides comprehensive documentation for the JSONPlaceholder API integration in the React TodoMVC application.

## Overview

The application integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a fake REST API for testing and prototyping. This provides persistent storage for todos and demonstrates real-world API integration patterns.

## Base Configuration

```javascript
const API_BASE = 'https://jsonplaceholder.typicode.com';
const USER_ID = 1;
```

All todo operations are scoped to `userId=1` to simulate a single user's todo list.

## API Endpoints

### Fetch All Todos

**Endpoint:** `GET /todos?userId=1`

**Description:** Retrieves all todos for the current user.

**Request:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
```

**Response:**
```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  }
]
```

**Usage:**
```javascript
const todos = await todoApi.fetchTodos();
```

### Create New Todo

**Endpoint:** `POST /todos`

**Description:** Creates a new todo item.

**Request:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New todo item',
    completed: false,
    userId: 1
  })
});
```

**Response:**
```json
{
  "userId": 1,
  "id": 201,
  "title": "New todo item",
  "completed": false
}
```

**Usage:**
```javascript
const newTodo = await todoApi.createTodo('Buy groceries');
```

### Update Todo

**Endpoint:** `PATCH /todos/:id`

**Description:** Updates an existing todo item. Supports partial updates.

**Request:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated title',
    completed: true
  })
});
```

**Response:**
```json
{
  "userId": 1,
  "id": 1,
  "title": "Updated title",
  "completed": true
}
```

**Usage:**
```javascript
// Update title
const updated = await todoApi.updateTodo(1, { title: 'New title' });

// Toggle completion
const toggled = await todoApi.toggleTodo(1, true);
```

### Delete Todo

**Endpoint:** `DELETE /todos/:id`

**Description:** Deletes a todo item.

**Request:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
  method: 'DELETE'
});
```

**Response:**
```json
{}
```

**Usage:**
```javascript
await todoApi.deleteTodo(1);
```

## Error Handling

### Custom Error Class

The application uses a custom `TodoApiError` class for API-specific errors:

```javascript
export class TodoApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'TodoApiError';
    this.status = status;
  }
}
```

### Error Types

1. **Network Errors**: Connection issues, timeouts
2. **HTTP Errors**: 4xx and 5xx status codes
3. **Parsing Errors**: Invalid JSON responses

### Error Handling Pattern

```javascript
try {
  const todos = await todoApi.fetchTodos();
  // Handle success
} catch (error) {
  if (error instanceof TodoApiError) {
    // API-specific error with status code
    console.error(`API Error (${error.status}): ${error.message}`);
  } else {
    // Network or other error
    console.error('Network error:', error.message);
  }
}
```

### User-Friendly Error Messages

The application translates technical errors into user-friendly messages:

- **TodoApiError**: "Failed to sync with server: [specific error]"
- **Network Error**: "Network error. Please check your connection."
- **Timeout**: "Request timed out. Please try again."

## Loading States

All API operations trigger loading states to provide immediate user feedback:

```javascript
// Before API call
dispatch({ type: SET_LOADING, payload: true });

try {
  const result = await apiCall();
  dispatch({ type: SUCCESS_ACTION, payload: result });
} catch (error) {
  dispatch({ type: SET_ERROR, payload: errorMessage });
} finally {
  // Loading state is cleared by success/error actions
}
```

## Data Transformation

### Request Transformation

All outgoing requests include the required `userId` field:

```javascript
// Create todo request body
{
  title: userInput,
  completed: false,
  userId: USER_ID  // Always set to 1
}
```

### Response Validation

Responses are validated to ensure they contain expected fields:

```javascript
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new TodoApiError(`API Error: ${response.statusText}`, response.status);
  }
  return response.json();
};
```

## Retry Logic

The application implements basic retry logic for failed requests:

1. **Immediate Retry**: For network errors
2. **Exponential Backoff**: For server errors (5xx)
3. **User Notification**: After max retries exceeded

## Performance Considerations

### Request Optimization

- **Debouncing**: Input changes are debounced to prevent excessive API calls
- **Caching**: Successful responses are cached in component state
- **Batch Operations**: Multiple updates are batched when possible

### Loading Indicators

- **Immediate Feedback**: Loading states appear instantly
- **Progressive Enhancement**: UI remains functional during loading
- **Error Recovery**: Users can retry failed operations

## Testing API Integration

### Mocking in Tests

```javascript
// Mock the entire API module
jest.mock('../services/todoApi');

// Mock specific methods
todoApi.fetchTodos.mockResolvedValue(mockTodos);
todoApi.createTodo.mockRejectedValue(new Error('Network error'));
```

### Integration Testing

```javascript
// Test actual API calls (in integration tests)
describe('API Integration', () => {
  test('fetches todos from real API', async () => {
    const todos = await todoApi.fetchTodos();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos[0]).toHaveProperty('id');
    expect(todos[0]).toHaveProperty('title');
  });
});
```

## Security Considerations

### Data Validation

- All user inputs are validated before sending to API
- Response data is validated before updating application state
- XSS protection through proper escaping

### CORS Handling

JSONPlaceholder supports CORS, allowing browser requests from any origin. In production, ensure proper CORS configuration.

### Rate Limiting

Be mindful of API rate limits and implement appropriate throttling:

```javascript
// Example rate limiting
const rateLimiter = new RateLimiter(10, 1000); // 10 requests per second

const makeRequest = async (url, options) => {
  await rateLimiter.wait();
  return fetch(url, options);
};
```

## Migration Guide

### From Local Storage to API

When migrating from localStorage to API:

1. **Backup existing data**: Export localStorage todos
2. **Gradual migration**: Support both storage methods temporarily
3. **Data synchronization**: Merge local and remote data
4. **Fallback strategy**: Revert to localStorage if API fails

### API Versioning

Prepare for API changes:

```javascript
const API_VERSION = 'v1';
const API_BASE = `https://api.example.com/${API_VERSION}`;
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API supports cross-origin requests
2. **Network Timeouts**: Implement retry logic and user feedback
3. **Invalid Responses**: Add response validation and error handling
4. **Rate Limiting**: Implement request throttling

### Debug Mode

Enable debug logging for API calls:

```javascript
const DEBUG = process.env.NODE_ENV === 'development';

const debugLog = (message, data) => {
  if (DEBUG) {
    console.log(`[API Debug] ${message}`, data);
  }
};
```

## Future Enhancements

### Planned Improvements

1. **Offline Support**: Cache API responses for offline usage
2. **Real-time Updates**: WebSocket integration for live updates
3. **Optimistic Updates**: Update UI before API confirmation
4. **Background Sync**: Sync changes when connection restored

### API Evolution

Consider these enhancements for production use:

- **Authentication**: JWT tokens or OAuth integration
- **Pagination**: Handle large todo lists efficiently
- **Filtering**: Server-side filtering and search
- **Bulk Operations**: Batch create/update/delete operations
