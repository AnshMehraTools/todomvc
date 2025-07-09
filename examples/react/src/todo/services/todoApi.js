const API_BASE = 'https://jsonplaceholder.typicode.com';
const USER_ID = 1;

/**
 * Custom error class for Todo API operations
 * 
 * @class TodoApiError
 * @extends {Error}
 */
export class TodoApiError extends Error {
    /**
     * Creates an instance of TodoApiError
     * 
     * @param {string} message - Error message
     * @param {number} status - HTTP status code
     */
    constructor(message, status) {
        super(message);
        this.name = 'TodoApiError';
        this.status = status;
    }
}

/**
 * Handles API response and throws TodoApiError for failed requests
 * 
 * @param {Response} response - Fetch API response object
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {TodoApiError} When response is not ok
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        throw new TodoApiError(`API Error: ${response.statusText}`, response.status);
    }
    return response.json();
};

/**
 * Todo API service for JSONPlaceholder integration
 * 
 * Provides CRUD operations for todos using the JSONPlaceholder API.
 * All methods include proper error handling and return promises.
 * 
 * @namespace todoApi
 */
export const todoApi = {
    /**
     * Fetches all todos for the current user from JSONPlaceholder API
     * 
     * @async
     * @function fetchTodos
     * @returns {Promise<Array<Object>>} Array of todo objects
     * @throws {TodoApiError} When API request fails
     * 
     * @example
     * const todos = await todoApi.fetchTodos();
     * console.log(todos); // [{ id: 1, title: 'Todo 1', completed: false, userId: 1 }]
     */
    async fetchTodos() {
        const response = await fetch(`${API_BASE}/todos?userId=${USER_ID}`);
        return handleResponse(response);
    },

    /**
     * Creates a new todo item via JSONPlaceholder API
     * 
     * @async
     * @function createTodo
     * @param {string} title - The title of the new todo
     * @returns {Promise<Object>} Created todo object
     * @throws {TodoApiError} When API request fails
     * 
     * @example
     * const newTodo = await todoApi.createTodo('Buy groceries');
     * console.log(newTodo); // { id: 201, title: 'Buy groceries', completed: false, userId: 1 }
     */
    async createTodo(title) {
        const response = await fetch(`${API_BASE}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                completed: false,
                userId: USER_ID
            })
        });
        return handleResponse(response);
    },

    /**
     * Updates an existing todo item via JSONPlaceholder API
     * 
     * @async
     * @function updateTodo
     * @param {number} id - The ID of the todo to update
     * @param {Object} updates - Object containing fields to update
     * @param {string} [updates.title] - New title for the todo
     * @param {boolean} [updates.completed] - New completion status
     * @returns {Promise<Object>} Updated todo object
     * @throws {TodoApiError} When API request fails
     * 
     * @example
     * const updated = await todoApi.updateTodo(1, { title: 'Updated title', completed: true });
     */
    async updateTodo(id, updates) {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return handleResponse(response);
    },

    /**
     * Deletes a todo item via JSONPlaceholder API
     * 
     * @async
     * @function deleteTodo
     * @param {number} id - The ID of the todo to delete
     * @returns {Promise<Object>} Empty response object
     * @throws {TodoApiError} When API request fails
     * 
     * @example
     * await todoApi.deleteTodo(1);
     */
    async deleteTodo(id) {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    },

    /**
     * Toggles the completion status of a todo item
     * 
     * @async
     * @function toggleTodo
     * @param {number} id - The ID of the todo to toggle
     * @param {boolean} completed - New completion status
     * @returns {Promise<Object>} Updated todo object
     * @throws {TodoApiError} When API request fails
     * 
     * @example
     * const toggled = await todoApi.toggleTodo(1, true);
     */
    async toggleTodo(id, completed) {
        return this.updateTodo(id, { completed });
    }
};
