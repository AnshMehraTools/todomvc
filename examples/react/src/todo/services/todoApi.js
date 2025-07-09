const API_BASE = 'https://jsonplaceholder.typicode.com';
const USER_ID = 1;

export class TodoApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'TodoApiError';
        this.status = status;
    }
}

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new TodoApiError(`API Error: ${response.statusText}`, response.status);
    }
    return response.json();
};

export const todoApi = {
    async fetchTodos() {
        const response = await fetch(`${API_BASE}/todos?userId=${USER_ID}`);
        return handleResponse(response);
    },

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

    async updateTodo(id, updates) {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return handleResponse(response);
    },

    async deleteTodo(id) {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'DELETE'
        });
        return handleResponse(response);
    },

    async toggleTodo(id, completed) {
        return this.updateTodo(id, { completed });
    }
};
